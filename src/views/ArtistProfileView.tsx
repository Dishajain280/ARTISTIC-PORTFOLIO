import React, { useState } from 'react';
import { ARTISTS, ARTWORKS } from '../data/mockData';
import { Artist, Artwork, Currency, ViewMode } from '../types';
import { formatPrice } from '../utils/formatters';

interface ArtistProfileViewProps {
  artistId?: string;
  onSelectArtist: (id: string) => void;
  onSelectArtwork: (id: string) => void;
  onNavigate: (view: ViewMode) => void;
  currency: Currency;
  onQuickInquire: (artwork: Artwork) => void;
}

type TabType = 'works' | 'process' | 'exhibitions' | 'biography';

export const ArtistProfileView: React.FC<ArtistProfileViewProps> = ({
  artistId,
  onSelectArtist,
  onSelectArtwork,
  onNavigate,
  currency,
  onQuickInquire,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('works');
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'available'>('all');

  // If no artistId provided or artist not found, default to Elena Rostova
  const artist = ARTISTS.find((a) => a.id === artistId) || ARTISTS[0];

  const artistWorks = ARTWORKS.filter((a) => a.artistId === artist.id);
  const displayedWorks =
    filterAvailability === 'available'
      ? artistWorks.filter((a) => a.status === 'available')
      : artistWorks;

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-24">
      {/* Top Artist Selector Switcher */}
      <div className="bg-[#f4f2ee] border-b border-[#e4e2df] py-3">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between gap-4 overflow-x-auto">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#72787e] whitespace-nowrap">
            Monograph Index:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {ARTISTS.map((a) => (
              <button
                key={a.id}
                onClick={() => onSelectArtist(a.id)}
                className={`px-3 py-1 text-xs font-mono tracking-wider whitespace-nowrap transition-colors border ${
                  a.id === artist.id
                    ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
                    : 'bg-white text-[#575953] border-[#e4e2df] hover:border-[#1b1c1a]'
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Monograph Header */}
      <section className="border-b border-[#e4e2df] bg-[#f7f5f1] py-16 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Portrait / Atelier Image */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] bg-[#ebe7e0] overflow-hidden border border-[#e4e2df] shadow-md">
                <img
                  src={artist.heroImageUrl || artist.avatarUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white border border-[#e4e2df] p-3 shadow-sm hidden sm:block">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#72787e]">
                  Active Atelier
                </p>
                <p className="font-serif text-sm font-medium text-[#1b1c1a]">
                  {artist.location}
                </p>
              </div>
            </div>

            {/* Monograph Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#e4e2df] text-[10px] font-mono uppercase tracking-widest text-[#575953]">
                <span>Monograph Dossier #{artist.id.toUpperCase()}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1b1c1a]">
                {artist.name}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-[#575953]">
                <span>
                  <strong>Medium:</strong> {artist.medium}
                </span>
                <span>
                  <strong>Studio:</strong> {artist.location}
                </span>
                <span>
                  <strong>Gallery:</strong> {artist.galleryRepresentation}
                </span>
              </div>

              <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#2a2c29] leading-snug border-l-2 border-[#1b1c1a] pl-6 py-1">
                "{artist.quote}"
              </blockquote>

              <p className="text-sm sm:text-base text-[#575953] leading-relaxed max-w-2xl font-sans">
                {artist.bio}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#e4e2df] max-w-lg">
                <div>
                  <span className="text-2xl font-serif text-[#1b1c1a] block">
                    {artist.artworksCount}
                  </span>
                  <span className="text-[11px] font-mono text-[#72787e] uppercase">
                    Catalogued Works
                  </span>
                </div>
                <div>
                  <span className="text-2xl font-serif text-[#1b1c1a] block">
                    {artist.availablePiecesCount}
                  </span>
                  <span className="text-[11px] font-mono text-[#72787e] uppercase">
                    Available Pieces
                  </span>
                </div>
                <div>
                  <span className="text-2xl font-serif text-[#1b1c1a] block">
                    {artist.exhibitions.length}
                  </span>
                  <span className="text-[11px] font-mono text-[#72787e] uppercase">
                    Biennale / Solos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="border-b border-[#e4e2df] sticky top-20 z-30 bg-[#fbf9f6]/95 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('works')}
              className={`py-4 text-xs font-mono uppercase tracking-widest transition-colors border-b-2 ${
                activeTab === 'works'
                  ? 'border-[#1b1c1a] text-[#1b1c1a] font-medium'
                  : 'border-transparent text-[#72787e] hover:text-[#1b1c1a]'
              }`}
            >
              Selected Works ({artistWorks.length})
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`py-4 text-xs font-mono uppercase tracking-widest transition-colors border-b-2 ${
                activeTab === 'process'
                  ? 'border-[#1b1c1a] text-[#1b1c1a] font-medium'
                  : 'border-transparent text-[#72787e] hover:text-[#1b1c1a]'
              }`}
            >
              Studio Practice & Materials
            </button>
            <button
              onClick={() => setActiveTab('exhibitions')}
              className={`py-4 text-xs font-mono uppercase tracking-widest transition-colors border-b-2 ${
                activeTab === 'exhibitions'
                  ? 'border-[#1b1c1a] text-[#1b1c1a] font-medium'
                  : 'border-transparent text-[#72787e] hover:text-[#1b1c1a]'
              }`}
            >
              Exhibitions & Pedigree
            </button>
          </div>

          {activeTab === 'works' && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setFilterAvailability('all')}
                className={`px-3 py-1 text-xs font-mono ${
                  filterAvailability === 'all'
                    ? 'bg-[#1b1c1a] text-white'
                    : 'bg-white border border-[#e4e2df] text-[#575953]'
                }`}
              >
                All Works
              </button>
              <button
                onClick={() => setFilterAvailability('available')}
                className={`px-3 py-1 text-xs font-mono ${
                  filterAvailability === 'available'
                    ? 'bg-[#1b1c1a] text-white'
                    : 'bg-white border border-[#e4e2df] text-[#575953]'
                }`}
              >
                Available Only
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 pt-12">
        {/* WORKS TAB */}
        {activeTab === 'works' && (
          <div>
            {displayedWorks.length === 0 ? (
              <div className="py-20 text-center text-[#72787e]">
                <p className="font-serif text-xl">All pieces in this series are currently acquired or on museum loan.</p>
                <button
                  onClick={() => setFilterAvailability('all')}
                  className="mt-4 px-6 py-2 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-wider"
                >
                  View Archive
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {displayedWorks.map((art) => (
                  <div
                    key={art.id}
                    className="group bg-white border border-[#e4e2df] flex flex-col justify-between transition-all hover:shadow-lg hover:border-[#c8c5be]"
                  >
                    <div
                      className="relative aspect-[4/5] bg-[#ebe7e0] overflow-hidden cursor-pointer"
                      onClick={() => onSelectArtwork(art.id)}
                    >
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                            art.status === 'available'
                              ? 'bg-white/95 text-[#1b1c1a] shadow-sm'
                              : 'bg-[#3b352b]/90 text-white'
                          }`}
                        >
                          {art.status === 'available' ? 'Available' : 'Reserved'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-[#72787e]">
                          <span>{art.year}</span>
                          <span>{art.dimensions}</span>
                        </div>
                        <h3
                          onClick={() => onSelectArtwork(art.id)}
                          className="font-serif text-lg font-medium text-[#1b1c1a] mt-1 hover:underline cursor-pointer"
                        >
                          {art.title}
                        </h3>
                        <p className="text-xs text-[#72787e] line-clamp-1 mt-0.5">{art.medium}</p>
                      </div>

                      <div className="pt-3 border-t border-[#f0ede8] flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-[#1b1c1a]">
                          {formatPrice(art.price, currency)}
                        </span>
                        {art.status === 'available' ? (
                          <button
                            onClick={() => onQuickInquire(art)}
                            className="text-xs font-mono text-[#1b1c1a] hover:underline flex items-center gap-1"
                          >
                            <span>Inquire</span>
                            <span className="material-symbols-outlined text-xs">arrow_outward</span>
                          </button>
                        ) : (
                          <span className="text-xs font-mono text-[#72787e] italic">Reserved</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROCESS TAB */}
        {activeTab === 'process' && (
          <div className="max-w-4xl space-y-12">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
                Materiality & Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a]">
                A Commitment to Slow, Ancestral Craft
              </h2>
              <p className="text-base text-[#575953] font-sans leading-relaxed">
                Rather than adhering to mass production schedules, work in this atelier is governed by the drying seasons, weather humidity, and long wood firings that take place only three times per calendar year.
              </p>
            </div>

            {/* Photo & Technical notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white border border-[#e4e2df] p-6 sm:p-8">
              <div className="aspect-[4/3] bg-[#ebe7e0] overflow-hidden border border-[#e4e2df]">
                <img
                  src={artist.selectedMasterworkImage || artist.heroImageUrl}
                  alt="Process"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4 text-xs font-mono text-[#575953]">
                <h4 className="font-serif text-xl font-medium text-[#1b1c1a]">
                  Kiln Atmosphere & Raw Materials
                </h4>
                <p className="leading-relaxed">
                  Clay is hand-mined from mountain veins in Shiga Prefecture, aged underground for three years to cultivate microbial plasticity.
                </p>
                <div className="space-y-2 pt-2 border-t border-[#eceae6]">
                  <div>• Firing Duration: 72 continuous hours</div>
                  <div>• Fuel: Japanese red pine cordwood</div>
                  <div>• Glaze Chemistry: Unrefined natural wood ash and feldspar</div>
                  <div>• Peak Temperature: 1,300°C reduction</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#f7f5f1] border border-[#e4e2df] text-center space-y-3">
              <h3 className="font-serif text-2xl font-normal text-[#1b1c1a]">
                Interested in a Custom Commission?
              </h3>
              <p className="text-sm text-[#575953] max-w-lg mx-auto">
                {artist.name} accepts a limited allotment of bespoke commissions each season for private architectural residences and museum permanent collections.
              </p>
              <button
                onClick={() => onQuickInquire(displayedWorks[0] || ARTWORKS[0])}
                className="mt-4 px-8 py-3 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734]"
              >
                Contact Studio for Commission
              </button>
            </div>
          </div>
        )}

        {/* EXHIBITIONS TAB */}
        {activeTab === 'exhibitions' && (
          <div className="max-w-4xl space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
                Institutional Provenance
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a] mt-1">
                Exhibitions & Museum Collections
              </h2>
            </div>

            <div className="bg-white border border-[#e4e2df] divide-y divide-[#eceae6]">
              {artist.exhibitions.map((ex, idx) => (
                <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="sm:w-24 flex-shrink-0 font-serif text-2xl text-[#1b1c1a]">
                    {ex.year}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-lg font-medium text-[#1b1c1a]">
                      {ex.title}
                    </h4>
                    <p className="text-xs text-[#72787e] font-sans mt-0.5">{ex.venue}</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#72787e] bg-[#f4f2ee] px-2.5 py-1 self-start sm:self-center">
                    Verified Record
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
