import React, { useState, useEffect } from 'react';
import { ViewMode, Currency, Artwork, Artist } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { LightboxModal } from './components/LightboxModal';
import { InquiryModal } from './components/InquiryModal';
import { PortfolioBuilderModal } from './components/PortfolioBuilderModal';
import { HomeView } from './views/HomeView';
import { DiscoverView } from './views/DiscoverView';
import { ArtworkDetailView } from './views/ArtworkDetailView';
import { ArtistProfileView } from './views/ArtistProfileView';
import { JournalView } from './views/JournalView';
import { JournalEssayView } from './views/JournalEssayView';
import { PricingView } from './views/PricingView';
import { ARTWORKS, ARTISTS } from './data/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedArtworkId, setSelectedArtworkId] = useState<string>('vessel-14');
  const [selectedArtistId, setSelectedArtistId] = useState<string>('elena-rostova');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('ash-glazes-chemistry');
  const [currency, setCurrency] = useState<Currency>('USD');

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPortfolioBuilderOpen, setIsPortfolioBuilderOpen] = useState(false);
  const [inquiryArtwork, setInquiryArtwork] = useState<Artwork | null>(null);
  const [lightboxState, setLightboxState] = useState<{
    artwork: Artwork | null;
    angleIndex: number;
  }>({ artwork: null, angleIndex: 0 });

  // Scroll to top on navigation
  const navigateTo = (view: ViewMode | any) => {
    if (typeof view === 'string') {
      setCurrentView(view as ViewMode);
    } else if (view && typeof view === 'object') {
      if (view.type === 'profile' && view.handle) {
        const found = ARTISTS.find((a) => a.handle === view.handle || a.id === view.handle || a.id.includes(view.handle));
        if (found) setSelectedArtistId(found.id);
        setCurrentView('artist');
      } else if (view.type === 'dashboard') {
        setCurrentView('pricing');
      } else if (view.type && ['home', 'discover', 'artwork', 'artist', 'journal', 'pricing', 'journal-essay'].includes(view.type)) {
        setCurrentView(view.type as ViewMode);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArtwork = (artworkId: string) => {
    setSelectedArtworkId(artworkId);
    setCurrentView('artwork');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArtist = (artistId: string) => {
    setSelectedArtistId(artistId);
    setCurrentView('artist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectJournal = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentView('journal-essay');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickInquire = (artwork: Artwork) => {
    setInquiryArtwork(artwork);
  };

  const handleOpenLightbox = (artwork: Artwork, index: number = 0) => {
    setLightboxState({ artwork, angleIndex: index });
  };

  const handleArtistCreated = (newArtist: Artist, firstArtwork?: Artwork) => {
    if (newArtist) {
      ARTISTS.unshift(newArtist);
      if (firstArtwork) {
        ARTWORKS.unshift(firstArtwork);
        setSelectedArtworkId(firstArtwork.id);
      }
      setSelectedArtistId(newArtist.id);
      setCurrentView('artist');
    }
  };

  // Keyboard shortcut for ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#121312] text-[#fbf9f6] flex flex-col font-sans selection:bg-[#c2623a] selection:text-white">
      {/* Universal Header */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPortfolioBuilder={() => setIsPortfolioBuilderOpen(true)}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onSelectArtwork={handleSelectArtwork}
            onSelectArtist={handleSelectArtist}
            onSelectJournal={handleSelectJournal}
            onNavigate={navigateTo}
            onOpenPortfolioBuilder={() => setIsPortfolioBuilderOpen(true)}
            currency={currency}
            onQuickInquire={handleQuickInquire}
          />
        )}

        {currentView === 'discover' && (
          <DiscoverView
            onSelectArtwork={handleSelectArtwork}
            onSelectArtist={handleSelectArtist}
            onNavigate={navigateTo}
            currency={currency}
            onQuickInquire={handleQuickInquire}
          />
        )}

        {currentView === 'artwork' && (
          <ArtworkDetailView
            artworkId={selectedArtworkId}
            onSelectArtwork={handleSelectArtwork}
            onSelectArtist={handleSelectArtist}
            onNavigate={navigateTo}
            currency={currency}
            onOpenInquiry={handleQuickInquire}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {currentView === 'artist' && (
          <ArtistProfileView
            artistId={selectedArtistId}
            onSelectArtist={handleSelectArtist}
            onSelectArtwork={handleSelectArtwork}
            onNavigate={navigateTo}
            currency={currency}
            onQuickInquire={handleQuickInquire}
          />
        )}

        {currentView === 'journal' && (
          <JournalView
            onSelectJournal={handleSelectJournal}
            onNavigate={navigateTo}
          />
        )}

        {currentView === 'journal-essay' && (
          <JournalEssayView
            articleId={selectedArticleId}
            onNavigate={navigateTo}
            onSelectJournal={handleSelectJournal}
          />
        )}

        {currentView === 'pricing' && (
          <PricingView
            onNavigate={navigateTo}
            onOpenPortfolioBuilder={() => setIsPortfolioBuilderOpen(true)}
            currency={currency}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        currentView={currentView}
        onNavigate={navigateTo}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenPortfolioBuilder={() => setIsPortfolioBuilderOpen(true)}
      />

      {/* Modals & Portals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArtwork={handleSelectArtwork}
        onSelectArtist={handleSelectArtist}
        onSelectJournal={handleSelectJournal}
        onNavigate={navigateTo}
        currency={currency}
      />

      <LightboxModal
        isOpen={!!lightboxState.artwork}
        artwork={lightboxState.artwork}
        activeAngleIndex={lightboxState.angleIndex}
        onClose={() => setLightboxState({ artwork: null, angleIndex: 0 })}
      />

      <InquiryModal
        isOpen={!!inquiryArtwork}
        artwork={inquiryArtwork}
        onClose={() => setInquiryArtwork(null)}
        currency={currency}
      />

      <PortfolioBuilderModal
        isOpen={isPortfolioBuilderOpen}
        onClose={() => setIsPortfolioBuilderOpen(false)}
        onArtistCreated={handleArtistCreated}
      />
    </div>
  );
}
