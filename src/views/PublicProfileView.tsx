import React, { useState } from 'react';
import { Creator, Artwork, Collection, CommissionService, CommissionRequest } from '../types';
import { PublicProfileHeader } from '../components/profile/PublicProfileHeader';
import { FeaturedArtworkHero } from '../components/profile/FeaturedArtworkHero';
import { ArtworkGalleryGrid } from '../components/profile/ArtworkGalleryGrid';
import { CommissionServicesList } from '../components/profile/CommissionServicesList';
import { CommissionRequestModal } from '../components/commissions/CommissionRequestModal';
import { ArtworkInspectModal } from '../components/artwork/ArtworkInspectModal';

interface PublicProfileViewProps {
  creator: Creator;
  artworks: Artwork[];
  collections: Collection[];
  services: CommissionService[];
  onCreateCommissionRequest: (request: CommissionRequest) => void;
}

export const PublicProfileView: React.FC<PublicProfileViewProps> = ({
  creator,
  artworks,
  collections,
  services,
  onCreateCommissionRequest,
}) => {
  const [selectedServiceForRequest, setSelectedServiceForRequest] = useState<CommissionService | null>(
    null
  );
  const [inspectArtwork, setInspectArtwork] = useState<Artwork | null>(null);

  const featuredWork = artworks.find((a) => a.featured) || artworks[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCommission = () => {
    // Pick the first active service or default to first
    const targetService = services.find((s) => s.active) || services[0];
    if (targetService) {
      setSelectedServiceForRequest(targetService);
    } else {
      scrollToSection('services-section');
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pb-24">
      {/* 1. Artist Monograph Header */}
      <PublicProfileHeader
        creator={creator}
        onOpenCommission={handleOpenCommission}
        onScrollToGallery={() => scrollToSection('gallery-section')}
        onScrollToServices={() => scrollToSection('services-section')}
      />

      {/* 2. Flagship Featured Artwork Hero */}
      {featuredWork && (
        <FeaturedArtworkHero
          artwork={featuredWork}
          creator={creator}
          onInspect={(art) => setInspectArtwork(art)}
          onOpenCommission={handleOpenCommission}
        />
      )}

      {/* 3. Artwork Gallery & Collections */}
      <ArtworkGalleryGrid
        artworks={artworks}
        collections={collections}
        onInspect={(art) => setInspectArtwork(art)}
      />

      {/* 4. Commission Services & Structured Intake */}
      <CommissionServicesList
        services={services}
        creator={creator}
        onSelectServiceForRequest={(srv) => setSelectedServiceForRequest(srv)}
      />

      {/* Modals */}
      {selectedServiceForRequest && (
        <CommissionRequestModal
          isOpen={!!selectedServiceForRequest}
          onClose={() => setSelectedServiceForRequest(null)}
          service={selectedServiceForRequest}
          creator={creator}
          onSubmitSuccess={(req) => {
            onCreateCommissionRequest(req);
          }}
        />
      )}

      {inspectArtwork && (
        <ArtworkInspectModal
          artwork={inspectArtwork}
          creator={creator}
          onClose={() => setInspectArtwork(null)}
          onOpenCommission={handleOpenCommission}
        />
      )}
    </div>
  );
};
