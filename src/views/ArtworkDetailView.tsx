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
    <div className="min-h-screen bg-[#121312] text-[#fbf9f6] pt-24 pb-24 selection:bg-[#c2623a] selection:text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#73716b] py-6 border-b border-white/[0.08] mb-8 overflow-x-auto whitespace-nowrap">
          <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('discover')} className="hover:text-white transition-colors">
            {artwork.mediumCategory || 'Monographs'}
          </button>
          <span>/</span>
          <button onClick={() => onSelectArtist(artist.id)} className="hover:text-white transition-colors">
            {artist.name}
          </button>
          <span>/</span>
          <span className="text-[#fbf9f6] font-medium">{artwork.title}</span>
        </nav>

        {/* Main Artwork Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: Visual Gallery & Alternate Angles (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div
              className="relative aspect-[4/5] sm:aspect-square bg-[#121312] border border-white/[0.08] overflow-hidden group cursor-zoom-in shadow-2xl"
              onClick={() => onOpenLightbox(artwork, activeAngleIndex)}
            >
              <img
                src={currentDisplayImage.url}
                alt={currentDisplayImage.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />

              <div className="absolute top-4 left-4 bg-[#121312]/90 backdrop-blur-md border border-white/[0.08] px-3 py-1 text-[11px] font-mono tracking-wider text-[#fbf9f6]">
                {currentDisplayImage.label}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLightbox(artwork, activeAngleIndex);
                }}
                className="absolute bottom-4 right-4 bg-[#121312]/90 hover:bg-white hover:text-[#121312] text-white px-3.5 py-2 text-xs font-mono flex items-center gap-1.5 shadow-xl border border-white/[0.08] transition-colors"
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
                        ? 'border-white/40 bg-[#171817]'
                        : 'border-white/[0.08] bg-[#171817] opacity-60 hover:opacity-100 hover:border-white/25'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-14 h-14 object-cover flex-shrink-0 bg-[#121312]"
                    />
                    <div className="pr-2 hidden sm:block">
                      <span className="text-[11px] font-mono uppercase tracking-wider block text-[#fbf9f6]">
                        {img.label}
                      </span>
                      <span className="text-[10px] text-[#a6a49f] block max-w-[120px] truncate">
                        {img.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Curatorial and Technical Statement */}
            <div className="bg-[#171817] border border-white/[0.08] p-6 sm:p-8 space-y-6 mt-8 shadow-xl">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c2623a]">
                  Curatorial Dossier
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#fbf9f6] mt-1">
                  Artist & Material Notes
                </h3>
              </div>

              <div className="text-sm text-[#a6a49f] font-sans leading-relaxed space-y-3">
                <p className="italic text-[#e4e2df] text-base font-serif">
                  "{artwork.curatorialStatement ||
                    'Every curve and tactile facet of this work was shaped by hand, respecting the natural unpredictability of organic materials.'}"
                </p>
                {artwork.bodyDescription && (
                  <p>
                    <strong className="text-[#fbf9f6] font-medium font-mono text-xs uppercase tracking-wider block mb-0.5">Clay Body & Earth</strong>
                    {artwork.bodyDescription}
                  </p>
                )}
                {artwork.glazeDescription && (
                  <p>
                    <strong className="text-[#fbf9f6] font-medium font-mono text-xs uppercase tracking-wider block mb-0.5">Glaze Formulation</strong>
                    {artwork.glazeDescription}
                  </p>
                )}
                {artwork.kilnDescription && (
                  <p>
                    <strong className="text-[#fbf9f6] font-medium font-mono text-xs uppercase tracking-wider block mb-0.5">Atmosphere & Firing</strong>
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
                  className={`px-3 py-1 text-xs font-mono uppercase tracking-wider border ${
                    artwork.status === 'available'
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                      : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                  }`}
                >
                  {artwork.status === 'available'
                    ? 'Available — 1 of 1 unique piece'
                    : artwork.status === 'reserved'
                    ? 'Reserved for Patron'
                    : 'Exhibition Loan'}
                </span>

                <span className="text-xs font-mono text-[#73716b]">
                  Year {artwork.year}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#fbf9f6] leading-tight">
                {artwork.title}
              </h1>

              {/* Artist Row */}
              <div
                onClick={() => onSelectArtist(artist.id)}
                className="flex items-center gap-3.5 p-3.5 bg-[#171817] border border-white/[0.08] hover:border-white/30 transition-colors cursor-pointer group"
              >
                <img
                  src={artist.avatarUrl}
                  alt={artist.name}
                  className="w-12 h-12 object-cover border border-white/20 group-hover:border-white/50"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-lg font-medium text-[#fbf9f6] group-hover:underline">
                    {artist.name}
                  </p>
                  <p className="text-xs text-[#a6a49f] font-sans">
                    {artist.medium} · {artist.location}
                  </p>
                </div>
                <span className="material-symbols-outlined text-sm text-[#73716b] group-hover:text-[#c2623a] transition-colors">
                  arrow_forward
                </span>
              </div>

              {/* Price & Primary Acquisition CTA */}
              <div className="p-6 bg-[#171817] border border-white/[0.08] space-y-4 shadow-xl">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#a6a49f]">
                    Direct Acquisition Price
                  </span>
                  <span className="font-mono text-2xl sm:text-3xl font-semibold text-[#fbf9f6]">
                    {formatPrice(artwork.price, currency)}
                  </span>
                </div>

                <div className="pt-2 space-y-2.5">
                  <button
                    onClick={() => onOpenInquiry(artwork)}
                    className="w-full py-4 bg-[#c2623a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#d67248] transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Inquire with Studio</span>
                    <span className="material-symbols-outlined text-sm">mail</span>
                  </button>

                  <button
                    onClick={() => onSelectArtist(artist.id)}
                    className="w-full py-3 bg-white/5 border border-white/[0.08] text-[#fbf9f6] text-xs font-mono uppercase tracking-widest hover:bg-white/10 transition-colors"
                  >
                    View Artist Monograph ({artist.artworksCount} Works)
                  </button>
                </div>

                <div className="text-[11px] text-[#73716b] font-mono text-center pt-2">
                  ✓ 100% Artist Direct Payout • 0% Intermediary Markup
                </div>
              </div>

              {/* Physical Specifications Ledger */}
              <div className="bg-[#171817] border border-white/[0.08] divide-y divide-white/[0.08]">
                <div className="p-4 bg-[#121312] text-xs font-mono uppercase tracking-wider text-[#a6a49f] font-medium">
                  Physical Specifications & Provenance
                </div>

                <div className="p-3.5 flex justify-between text-xs">
                  <span className="font-mono text-[#73716b]">Medium & Discipline</span>
                  <span className="font-mono text-[#fbf9f6] text-right">{artwork.medium}</span>
                </div>

                <div className="p-3.5 flex justify-between text-xs">
                  <span className="font-mono text-[#73716b]">Dimensions</span>
                  <span className="font-mono text-[#fbf9f6]">{artwork.dimensions}</span>
                </div>

                {artwork.mass && (
                  <div className="p-3.5 flex justify-between text-xs">
                    <span className="font-mono text-[#73716b]">Mass / Weight</span>
                    <span className="font-mono text-[#fbf9f6]">{artwork.mass}</span>
                  </div>
                )}

                {artwork.footRing && (
                  <div className="p-3.5 flex justify-between text-xs">
                    <span className="font-mono text-[#73716b]">Foot Ring / Stamp</span>
                    <span className="font-mono text-[#fbf9f6]">{artwork.footRing}</span>
                  </div>
                )}

                <div className="p-3.5 flex justify-between text-xs">
                  <span className="font-mono text-[#73716b]">Edition</span>
                  <span className="font-mono text-[#fbf9f6]">Unique (1 of 1)</span>
                </div>

                <div className="p-3.5 flex justify-between text-xs">
                  <span className="font-mono text-[#73716b]">Provenance Ledger Code</span>
                  <span className="font-mono text-white">
                    {artwork.provenanceCode || `ATL-${artwork.id.toUpperCase()}-2024`}
                  </span>
                </div>
              </div>

              {/* Custodial Integrity Guarantees */}
              <div className="p-5 bg-[#171817] border border-white/[0.08] space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#fbf9f6] font-medium">
                  Atelier Custodial Guarantees
                </h4>
                <ul className="text-xs text-[#a6a49f] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#6ee7b7] text-base mt-0.5">
                      verified
                    </span>
                    <span>
                      <strong className="text-white">Certificate of Authenticity:</strong> Hand-signed and embossed by the artist's studio.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#6ee7b7] text-base mt-0.5">
                      local_shipping
                    </span>
                    <span>
                      <strong className="text-white">White-Glove Art Transport:</strong> Custom timber crating and climate-monitored transit.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#6ee7b7] text-base mt-0.5">
                      account_balance
                    </span>
                    <span>
                      <strong className="text-white">Direct Escrow:</strong> Funds held safely in custodial escrow until collector inspection is certified.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Works from Series / Same Medium */}
        {relatedWorks.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/[0.08]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#a6a49f]">
                  From The Monograph
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#fbf9f6] mt-1">
                  Further Works by {artist.name} & Series
                </h3>
              </div>
              <button
                onClick={() => onSelectArtist(artist.id)}
                className="text-xs font-mono uppercase tracking-widest text-white hover:underline"
              >
                View Complete Series →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedWorks.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArtwork(art.id)}
                  className="group bg-[#171817] border border-white/[0.08] cursor-pointer hover:border-white/30 hover:shadow-xl transition-all"
                >
                  <div className="aspect-[4/5] bg-[#121312] overflow-hidden relative">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-[#121312]/90 px-2 py-0.5 text-[10px] font-mono text-[#a6a49f] border border-white/[0.08]">
                      {art.year}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-serif text-base font-medium text-[#fbf9f6] group-hover:underline truncate">
                      {art.title}
                    </h4>
                    <p className="text-xs text-[#a6a49f] truncate mt-0.5">{art.medium}</p>
                    <p className="font-mono text-xs font-semibold text-[#fbf9f6] mt-2">
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
