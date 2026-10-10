import React, { useState, useEffect } from 'react';
import { ViewRoute, Creator } from './types';
import { useAtelierStore } from './services/store';
import { Navbar } from './components/layout/Navbar';
import { DemoToolbar } from './components/layout/DemoToolbar';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { LandingView } from './views/LandingView';
import { PublicProfileView } from './views/PublicProfileView';
import { DashboardView } from './views/DashboardView';

export default function App() {
  const {
    state,
    currentCreator,
    setCurrentHandle,
    resetToDemo,
    getCreatorByHandle,
    updateCreator,
    createCreator,
    getArtworksByCreator,
    createArtwork,
    updateArtwork,
    deleteArtwork,
    setFeaturedArtwork,
    getCollectionsByCreator,
    getServicesByCreator,
    createService,
    updateService,
    deleteService,
    getCommissionsByCreator,
    createCommissionRequest,
    updateCommissionStatus,
    deleteCommissionRequest,
  } = useAtelierStore();

  const [currentRoute, setCurrentRoute] = useState<ViewRoute>({
    type: 'profile',
    handle: 'maya',
  });
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Initialize route from window.location if path is /@handle
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/@')) {
      const handleFromUrl = path.slice(2).split('/')[0];
      if (handleFromUrl) {
        setCurrentRoute({ type: 'profile', handle: handleFromUrl });
        setCurrentHandle(handleFromUrl);
      }
    } else if (path === '/dashboard') {
      setCurrentRoute({ type: 'dashboard', tab: 'inbox' });
    }
  }, []);

  const handleNavigate = (route: ViewRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Sync browser URL if practical
    if (route.type === 'profile') {
      window.history.pushState({}, '', `/@${route.handle}`);
    } else if (route.type === 'dashboard') {
      window.history.pushState({}, '', `/dashboard`);
    } else if (route.type === 'landing') {
      window.history.pushState({}, '', `/`);
    }
  };

  // Determine active displayed creator based on route
  const activeCreator: Creator =
    currentRoute.type === 'profile'
      ? getCreatorByHandle(currentRoute.handle) || currentCreator
      : currentCreator;

  const currentArtworks = getArtworksByCreator(activeCreator.id);
  const currentCollections = getCollectionsByCreator(activeCreator.id);
  const currentServices = getServicesByCreator(activeCreator.id);
  const currentCommissions = getCommissionsByCreator(activeCreator.id);

  const existingHandles = state.creators.map((c) => c.handle.toLowerCase());

  const handleCreatorClaimed = (newCreator: Creator) => {
    createCreator(newCreator);
    setCurrentRoute({ type: 'profile', handle: newCreator.handle });
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] flex flex-col font-sans selection:bg-[#1b1c1a] selection:text-white">
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        creator={activeCreator}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* 2. Main View Router */}
      <main className="flex-1">
        {currentRoute.type === 'landing' && (
          <LandingView
            onNavigate={handleNavigate}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            featuredCreators={state.creators}
          />
        )}

        {currentRoute.type === 'profile' && (
          <PublicProfileView
            creator={activeCreator}
            artworks={currentArtworks}
            collections={currentCollections}
            services={currentServices}
            onCreateCommissionRequest={(req) => {
              createCommissionRequest(req);
            }}
          />
        )}

        {currentRoute.type === 'dashboard' && (
          <DashboardView
            creator={currentCreator}
            artworks={getArtworksByCreator(currentCreator.id)}
            collections={getCollectionsByCreator(currentCreator.id)}
            services={getServicesByCreator(currentCreator.id)}
            commissions={getCommissionsByCreator(currentCreator.id)}
            initialTab={currentRoute.tab || 'inbox'}
            onNavigateToPublic={() =>
              handleNavigate({ type: 'profile', handle: currentCreator.handle })
            }
            onUpdateCommissionStatus={updateCommissionStatus}
            onDeleteCommissionRequest={deleteCommissionRequest}
            onCreateArtwork={createArtwork}
            onUpdateArtwork={updateArtwork}
            onDeleteArtwork={deleteArtwork}
            onSetFeaturedArtwork={(artId) => setFeaturedArtwork(currentCreator.id, artId)}
            onCreateService={createService}
            onUpdateService={updateService}
            onDeleteService={deleteService}
            onUpdateCreator={(updates) => updateCreator(currentCreator.handle, updates)}
          />
        )}
      </main>

      {/* 3. Onboarding Handle Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onCreatorClaimed={handleCreatorClaimed}
        existingHandles={existingHandles}
      />

      {/* 4. Hackathon Presenter Floating Toolbar */}
      <DemoToolbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        currentCreator={currentCreator}
        allCreators={state.creators}
        onSelectCreator={(handle) => {
          setCurrentHandle(handle);
          if (currentRoute.type === 'profile') {
            handleNavigate({ type: 'profile', handle });
          }
        }}
        onResetDemo={() => {
          resetToDemo();
          handleNavigate({ type: 'profile', handle: 'maya' });
        }}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />
    </div>
  );
}
