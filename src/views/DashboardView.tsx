import React, { useState } from 'react';
import { Creator, Artwork, Collection, CommissionService, CommissionRequest, CommissionStatus } from '../types';
import { CommissionInboxView } from '../components/dashboard/CommissionInboxView';
import { ArtworkManager } from '../components/dashboard/ArtworkManager';
import { ServiceManager } from '../components/dashboard/ServiceManager';
import { ProfileSettings } from '../components/dashboard/ProfileSettings';

interface DashboardViewProps {
  creator: Creator;
  artworks: Artwork[];
  collections: Collection[];
  services: CommissionService[];
  commissions: CommissionRequest[];
  initialTab?: 'inbox' | 'artworks' | 'services' | 'profile';
  onNavigateToPublic: () => void;
  onUpdateCommissionStatus: (id: string, status: CommissionStatus, notes?: string) => void;
  onDeleteCommissionRequest: (id: string) => void;
  onCreateArtwork: (artwork: Artwork) => void;
  onUpdateArtwork: (id: string, updates: Partial<Artwork>) => void;
  onDeleteArtwork: (id: string) => void;
  onSetFeaturedArtwork: (id: string) => void;
  onCreateService: (service: CommissionService) => void;
  onUpdateService: (id: string, updates: Partial<CommissionService>) => void;
  onDeleteService: (id: string) => void;
  onUpdateCreator: (updates: Partial<Creator>) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  creator,
  artworks,
  collections,
  services,
  commissions,
  initialTab = 'inbox',
  onNavigateToPublic,
  onUpdateCommissionStatus,
  onDeleteCommissionRequest,
  onCreateArtwork,
  onUpdateArtwork,
  onDeleteArtwork,
  onSetFeaturedArtwork,
  onCreateService,
  onUpdateService,
  onDeleteService,
  onUpdateCreator,
}) => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'artworks' | 'services' | 'profile'>(
    initialTab
  );

  const pendingCount = commissions.filter((c) => c.status === 'RECEIVED' || c.status === 'IN_REVIEW').length;

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-28">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e4e2df] pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2e7d32]"></span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
                Studio Workspace • Authenticated as @{creator.handle}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a] mt-1">
              {creator.name} Atelier Desk
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToPublic}
              className="px-5 py-2.5 bg-white border border-[#1b1c1a] text-[#1b1c1a] text-xs font-mono uppercase tracking-widest hover:bg-[#f4f2ee] transition-colors flex items-center gap-1.5"
            >
              <span>View Public Link</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#e4e2df] mb-10 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`py-3.5 px-4 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'inbox'
                ? 'border-[#1b1c1a] text-[#1b1c1a] font-semibold'
                : 'border-transparent text-[#72787e] hover:text-[#1b1c1a]'
            }`}
          >
            <span>Commission Inbox</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.5 bg-[#1b1c1a] text-white text-[10px] rounded-full">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('artworks')}
            className={`py-3.5 px-4 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'artworks'
                ? 'border-[#1b1c1a] text-[#1b1c1a] font-semibold'
                : 'border-transparent text-[#72787e] hover:text-[#1b1c1a]'
            }`}
          >
            <span>Artworks & Collections ({artworks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`py-3.5 px-4 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'services'
                ? 'border-[#1b1c1a] text-[#1b1c1a] font-semibold'
                : 'border-transparent text-[#72787e] hover:text-[#1b1c1a]'
            }`}
          >
            <span>Commission Services ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 px-4 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-[#1b1c1a] text-[#1b1c1a] font-semibold'
                : 'border-transparent text-[#72787e] hover:text-[#1b1c1a]'
            }`}
          >
            <span>Identity & AI Bio</span>
          </button>
        </div>

        {/* Tab Views */}
        <div>
          {activeTab === 'inbox' && (
            <CommissionInboxView
              commissions={commissions}
              creator={creator}
              onUpdateStatus={onUpdateCommissionStatus}
              onDeleteRequest={onDeleteCommissionRequest}
            />
          )}

          {activeTab === 'artworks' && (
            <ArtworkManager
              artworks={artworks}
              collections={collections}
              creator={creator}
              onCreateArtwork={onCreateArtwork}
              onUpdateArtwork={onUpdateArtwork}
              onDeleteArtwork={onDeleteArtwork}
              onSetFeatured={onSetFeaturedArtwork}
            />
          )}

          {activeTab === 'services' && (
            <ServiceManager
              services={services}
              creator={creator}
              onCreateService={onCreateService}
              onUpdateService={onUpdateService}
              onDeleteService={onDeleteService}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileSettings
              creator={creator}
              onUpdateCreator={onUpdateCreator}
            />
          )}
        </div>
      </div>
    </div>
  );
};
