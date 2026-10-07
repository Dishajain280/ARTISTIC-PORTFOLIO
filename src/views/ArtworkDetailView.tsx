import React, { useState } from 'react';
import { ARTWORKS, ARTISTS } from '../data/mockData';
import { Artwork, Currency, ViewMode } from '../types';
import { formatPrice } from '../utils/formatters';

interface ArtworkDetailViewProps {
  artworkId: string;
  onSelectArtwork: (id: string) => void;
  onSelectArtist: (id: string) => void;
  onNavigate: (view: ViewMode) => void;
  currency: Currency;
  onOpenInquiry: (artwork: Artwork) => void;
  onOpenLightbox: (artwork: Artwork, index: number) => void;
}

export const ArtworkDetailView: React.FC<ArtworkDetailViewProps> = ({
  artworkId,
  onSelectArtwork,
  onSelectArtist,
  onNavigate,
  currency,
  onOpenInquiry,
  onOpenLightbox,
}) => {
  const artwork = ARTWORKS.find((a) => a.id === artworkId) || ARTWORKS[0];
  const artist = ARTISTS.find((a) => a.id === artwork.artistId) || ARTISTS[0];

  const [activeAngleIndex, setActiveAngleIndex] = useState(0);

  const images = [
    { label: 'Primary View', url: artwork.imageUrl, description: artwork.title },
    ...(artwork.alternateAngles || []).map((a) => ({
      label: a.label,
      url: a.imageUrl,
      description: a.description,
    })),
  ];

  const currentDisplayImage = images[activeAngleIndex] || images[0];

  // Related works
  const relatedWorks = ARTWORKS.filter(
    (a) => a.id !== artwork.id && (a.artistId === artwork.artistId || a.mediumCategory === artwork.mediumCategory)
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#72787e] py-6 border-b border-[#e4e2df] mb-8 overflow-x-auto whitespace-nowrap">
          <button onClick={() => onNavigate('home')} className="hover:text-[#1b1c1a]">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('discover')} className="hover:text-[#1b1c1a]">
            {artwork.mediumCategory || 'Monographs'}
          </button>
          <span>/</span>
          <button onClick={() => onSelectArtist(artist.id)} className="hover:text-[#1b1c1a]">
            {artist.name}
          </button>
          <span>/</span>
          <span className="text-[#1b1c1a] font-medium">{artwork.title}</span>
        </nav>

        {/* Main Artwork Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: Visual Gallery & Alternate Angles (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div
              className="relative aspect-[4/5] sm:aspect-square bg-[#f0ece5] border border-[#e4e2df] overflow-hidden group cursor-zoom-in"
              onClick={() => onOpenLightbox(artwork, activeAngleIndex)}
            >
              <img
                src={currentDisplayImage.url}
                alt={currentDisplayImage.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-mono tracking-wider text-[#1b1c1a]">
                {currentDisplayImage.label}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLightbox(artwork, activeAngleIndex);
                }}
                className="absolute bottom-4 right-4 bg-[#1b1c1a]/85 hover:bg-[#1b1c1a] text-white px-3 py-1.5 text-xs font-mono flex items-center gap-1.5 shadow-md transition-colors"
              >
                <span className="material-symbols-outlined text-sm">fullscreen</span>
                <span>Inspect in Fullscreen</span>
              </button>
            </div>

            {/* Thumbnail Carousel / Angle Selector */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveAngleIndex(idx)}
                    className={`flex items-center gap-2.5 p-1.5 border text-left transition-all ${
                      activeAngleIndex === idx
                        ? 'border-[#1b1c1a] bg-white ring-1 ring-[#1b1c1a]'
                        : 'border-[#e4e2df] bg-[#f4f2ee] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-14 h-14 object-cover flex-shrink-0"
                    />
                    <div className="pr-2 hidden sm:block">
                      <span className="text-[11px] font-mono uppercase tracking-wider block text-[#1b1c1a]">
                        {img.label}
                      </span>
                      <span className="text-[10px] text-[#72787e] block max-w-[120px] truncate">
                        {img.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Curatorial and Technical Statement */}
            <div className="bg-white border border-[#e4e2df] p-6 sm:p-8 space-y-6 mt-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
                  Curatorial Dossier
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#1b1c1a] mt-1">
                  Artist & Material Notes
                </h3>
              </div>

              <div className="text-sm text-[#444748] font-sans leading-relaxed space-y-3">
                <p>
                  {artwork.curatorialStatement ||
                    'Every curve and tactile facet of this work was shaped by hand, respecting the natural unpredictability of organic materials.'}
                </p>
                {artwork.bodyDescription && (
                  <p>
                    <strong className="text-[#1b1c1a] font-medium">Clay Body & Earth: </strong>
                    {artwork.bodyDescription}
                  </p>
                )}
                {artwork.glazeDescription && (
                  <p>
                    <strong className="text-[#1b1c1a] font-medium">Glaze Formulation: </strong>
                    {artwork.glazeDescription}
                  </p>
                )}
                {artwork.kilnDescription && (
                  <p>
                    <strong className="text-[#1b1c1a] font-medium">Atmosphere & Firing: </strong>
                    {artwork.kilnDescription}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Title, Specifications & Inquiry (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 text-xs font-mono uppercase tracking-wider ${
                    artwork.status === 'available'
                      ? 'bg-[#e7f1e9] text-[#1e582d]'
                      : 'bg-[#f4f2ee] text-[#575953]'
                  }`}
                >
                  {artwork.status === 'available'
                    ? 'Available — 1 of 1 unique piece'
                    : artwork.status === 'reserved'
                    ? 'Reserved for Patron'
                    : 'Exhibition Loan'}
                </span>

                <span className="text-xs font-mono text-[#72787e]">
                  Year {artwork.year}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1b1c1a] leading-tight">
                {artwork.title}
              </h1>

              {/* Artist Row */}
              <div
                onClick={() => onSelectArtist(artist.id)}
                className="flex items-center gap-3.5 p-3 bg-white border border-[#e4e2df] hover:border-[#1b1c1a] transition-colors cursor-pointer group"
              >
                <img
                  src={artist.avatarUrl}
                  alt={artist.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-lg font-medium text-[#1b1c1a] group-hover:underline">
                    {artist.name}
                  </p>
                  <p className="text-xs text-[#72787e] font-sans">
                    {artist.medium} • {artist.location}
                  </p>
                </div>
                <span className="material-symbols-outlined text-sm text-[#72787e] group-hover:text-[#1b1c1a]">
                  arrow_forward
                </span>
              </div>

              {/* Price & Primary Acquisition CTA */}
              <div className="p-6 bg-white border border-[#e4e2df] space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#72787e]">
                    Direct Acquisition Price
                  </span>
                  <span className="font-mono text-2xl sm:text-3xl font-semibold text-[#1b1c1a]">
                    {formatPrice(artwork.price, currency)}
                  </span>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => onOpenInquiry(artwork)}
                    className="w-full py-4 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Inquire with Studio</span>
                    <span className="material-symbols-outlined text-sm">mail</span>
                  </button>

                  <button
                    onClick={() => onSelectArtist(artist.id)}
                    className="w-full py-3 bg-[#f4f2ee] border border-[#e4e2df] text-[#1b1c1a] text-xs font-mono uppercase tracking-widest hover:bg-[#eae8e3] transition-colors"
                  >
                    View Artist Monograph ({artist.artworksCount} Works)
                  </button>
                </div>

                <div className="text-[11px] text-[#72787e] font-mono text-center pt-2">
                  ✓ 100% Artist Direct Payout • No 50% Gallery Surcharge
                </div>
              </div>

              {/* Physical Specifications Ledger */}
              <div className="bg-white border border-[#e4e2df] divide-y divide-[#eceae6]">
                <div className="p-4 bg-[#f4f2ee] text-xs font-mono uppercase tracking-wider text-[#72787e] font-medium">
                  Physical Specifications & Provenance
                </div>

                <div className="p-3.5 flex justify-between text-xs">
                  <span className="font-mono text-[#72787e]">Medium & Discipline</span>
                  <span className="font-mono text-[#1b1c1a] text-right">{artwork.medium}</span>
                </div>

                <div className="p-3.5 flex justify-between text-xs">
                  <span className="font-mono text-[#72787e]">Dimensions</span>
                  <span className="font-mono text-[#1b1c1a]">{artwork.dimensions}</span>
                </div>

                {artwork.mass && (
                  <div className="p-3.5 flex justify-between text-xs">
                    <span className="font-mono text-[#72787e]">Mass / Weight</span>
                    <span className="font-mono text-[#1b1c1a]">{artwork.mass}</span>
                  </div>
                )}

                {artwork.footRing && (
                  <div className="p-3.5 flex justify-between text-xs">
                    <span className="font-mono text-[#72787e]">Foot Ring / Stamp</span>
                    <span className="font-mono text-[#1b1c1a]">{artwork.footRing}</span>
                  </div>
                )}

                <div className="p-3.5 flex justify-between text-xs">
                  <span className="font-mono text-[#72787e]">Edition</span>
                  <span className="font-mono text-[#1b1c1a]">Unique (1 of 1)</span>
                </div>

                <div className="p-3.5 flex justify-between text-xs">
                  <span className="font-mono text-[#72787e]">Provenance Ledger Code</span>
                  <span className="font-mono text-[#1b1c1a]">
                    {artwork.provenanceCode || `ATL-${artwork.id.toUpperCase()}-2024`}
                  </span>
                </div>
              </div>

              {/* Custodial Integrity Guarantees */}
              <div className="p-5 bg-[#f7f5f1] border border-[#e4e2df] space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#1b1c1a] font-medium">
                  Atelier Custodial Guarantees
                </h4>
                <ul className="text-xs text-[#575953] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#1b1c1a] text-base mt-0.5">
                      verified
                    </span>
                    <span>
                      <strong>Certificate of Authenticity:</strong> Hand-signed and embossed by the artist's studio.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#1b1c1a] text-base mt-0.5">
                      local_shipping
                    </span>
                    <span>
                      <strong>White-Glove Art Transport:</strong> Custom timber crating and climate-monitored transit.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#1b1c1a] text-base mt-0.5">
                      account_balance
                    </span>
                    <span>
                      <strong>Direct Escrow:</strong> Funds held safely in custodial escrow until collector inspection is certified.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Works from Series / Same Medium */}
        {relatedWorks.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#e4e2df]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
                  From The Monograph
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1b1c1a] mt-1">
                  Further Works by {artist.name} & Series
                </h3>
              </div>
              <button
                onClick={() => onSelectArtist(artist.id)}
                className="text-xs font-mono uppercase tracking-widest text-[#1b1c1a] hover:underline"
              >
                View Complete Series →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedWorks.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArtwork(art.id)}
                  className="group bg-white border border-[#e4e2df] cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="aspect-[4/5] bg-[#ebe7e0] overflow-hidden relative">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 text-[10px] font-mono">
                      {art.year}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-serif text-base font-medium text-[#1b1c1a] group-hover:underline truncate">
                      {art.title}
                    </h4>
                    <p className="text-xs text-[#72787e] truncate mt-0.5">{art.medium}</p>
                    <p className="font-mono text-xs font-semibold text-[#1b1c1a] mt-2">
                      {formatPrice(art.price, currency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
