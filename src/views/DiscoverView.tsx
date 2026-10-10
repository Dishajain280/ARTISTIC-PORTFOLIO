import React, { useState, useMemo } from 'react';
import { ARTWORKS } from '../data/mockData';
import { Artwork, Currency, ViewMode } from '../types';
import { formatPrice } from '../utils/formatters';

interface DiscoverViewProps {
  onSelectArtwork: (artworkId: string) => void;
  onSelectArtist: (artistId: string) => void;
  onNavigate: (view: ViewMode) => void;
  currency: Currency;
  onQuickInquire: (artwork: Artwork) => void;
}

type LayoutMode = 'editorial' | 'dense' | 'ledger';

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  onSelectArtwork,
  onSelectArtist,
  currency,
  onQuickInquire,
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'reserved'>('all');
  const [priceTier, setPriceTier] = useState<'all' | 'under1000' | '1000to2500' | 'over2500'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'priceAsc' | 'priceDesc' | 'title'>('recent');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('editorial');
  const [searchFilter, setSearchFilter] = useState('');

  const disciplines = [
    'All',
    'Ceramics & Stoneware',
    'Paintings',
    'Sculptures',
    'Crafts & Textiles',
    'Digital Art',
  ];

  const filteredArtworks = useMemo(() => {
    return ARTWORKS.filter((art) => {
      // Discipline
      if (
        selectedDiscipline !== 'All' &&
        art.mediumCategory.toLowerCase() !== selectedDiscipline.toLowerCase() &&
        !art.medium.toLowerCase().includes(selectedDiscipline.toLowerCase())
      ) {
        return false;
      }

      // Availability
      if (availabilityFilter === 'available' && art.status !== 'available') {
        return false;
      }
      if (availabilityFilter === 'reserved' && art.status === 'available') {
        return false;
      }

      // Price Tier
      if (priceTier === 'under1000' && art.price >= 1000) return false;
      if (priceTier === '1000to2500' && (art.price < 1000 || art.price > 2500)) return false;
      if (priceTier === 'over2500' && art.price <= 2500) return false;

      // Search Query
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.artistName.toLowerCase().includes(q) ||
          art.medium.toLowerCase().includes(q)
        );
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return b.year - a.year; // 'recent'
    });
  }, [selectedDiscipline, availabilityFilter, priceTier, sortBy, searchFilter]);

  const resetFilters = () => {
    setSelectedDiscipline('All');
    setAvailabilityFilter('all');
    setPriceTier('all');
    setSortBy('recent');
    setSearchFilter('');
  };

  // Slice works for Salon pacing
  const premierArtwork = filteredArtworks[0];
  const pairedStudyOne = filteredArtworks[1];
  const pairedStudyTwo = filteredArtworks[2];
  const readingPlate = filteredArtworks[3];
  const ledgerArtworks = filteredArtworks.slice(4);

  return (
    <div className="min-h-screen bg-[#121312] text-[#fbf9f6] pt-28 pb-20 selection:bg-[#c2623a] selection:text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Curatorial Header Title */}
        <div className="border-b border-white/[0.08] pb-8 mb-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#a6a49f] mb-3">
              Curated Monograph Index
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#fbf9f6] tracking-tight">
              Discover Masterworks
            </h1>
            <p className="text-sm sm:text-base text-[#a6a49f] mt-3 font-sans max-w-2xl leading-relaxed">
              Authentic artworks direct from studios worldwide. Handcrafted ceramics, mineral oil paintings, sculptural joinery, and architectural fiber with verified provenance.
            </p>
          </div>
        </div>

        {/* Filter & Controls Bar */}
        <div className="bg-[#171817] border border-white/[0.08] p-4 sm:p-6 mb-8 space-y-4 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search within index */}
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#73716b] text-lg">
                search
              </span>
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter by title, medium, or artist..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#121312] border border-white/[0.08] text-xs text-[#fbf9f6] placeholder-[#73716b] focus:outline-none focus:border-white/40 font-sans"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#73716b] hover:text-white"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>

            {/* Layout Mode & Counter */}
            <div className="flex items-center gap-4 justify-between lg:justify-end">
              <span className="text-xs font-mono text-[#a6a49f]">
                Showing <strong className="text-white">{filteredArtworks.length}</strong> of {ARTWORKS.length} works
              </span>

              <div className="flex items-center border border-white/[0.08] bg-[#121312] p-0.5">
                <button
                  onClick={() => setLayoutMode('editorial')}
                  className={`px-2.5 py-1.5 text-xs font-mono transition-colors flex items-center gap-1.5 ${
                    layoutMode === 'editorial' ? 'bg-white/15 text-white font-medium' : 'text-[#73716b] hover:text-white'
                  }`}
                  title="Exhibition Salon Pacing"
                >
                  <span className="material-symbols-outlined text-sm">view_quilt</span>
                  <span className="hidden sm:inline">Salon</span>
                </button>
                <button
                  onClick={() => setLayoutMode('dense')}
                  className={`px-2.5 py-1.5 text-xs font-mono transition-colors flex items-center gap-1.5 ${
                    layoutMode === 'dense' ? 'bg-white/15 text-white font-medium' : 'text-[#73716b] hover:text-white'
                  }`}
                  title="Dense Specimen Grid"
                >
                  <span className="material-symbols-outlined text-sm">apps</span>
                  <span className="hidden sm:inline">Index</span>
                </button>
                <button
                  onClick={() => setLayoutMode('ledger')}
                  className={`px-2.5 py-1.5 text-xs font-mono transition-colors flex items-center gap-1.5 ${
                    layoutMode === 'ledger' ? 'bg-white/15 text-white font-medium' : 'text-[#73716b] hover:text-white'
                  }`}
                  title="Accession Ledger Table"
                >
                  <span className="material-symbols-outlined text-sm">view_list</span>
                  <span className="hidden sm:inline">Ledger</span>
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Filters row */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            {/* Discipline tags - Zero Pill Discipline */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {disciplines.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDiscipline(d)}
                  className={`px-3 py-1.5 text-xs font-mono transition-colors whitespace-nowrap border ${
                    selectedDiscipline === d
                      ? 'bg-white text-[#121312] border-white font-medium'
                      : 'bg-[#121312] text-[#a6a49f] border-white/[0.08] hover:border-white/30 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Availability */}
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value as any)}
                className="px-3 py-1.5 bg-[#121312] border border-white/[0.08] text-xs font-mono text-[#fbf9f6] focus:outline-none focus:border-white/40"
              >
                <option value="all">All Statuses</option>
                <option value="available">Available Pieces Only</option>
                <option value="reserved">Reserved / Loans</option>
              </select>

              {/* Price Tier */}
              <select
                value={priceTier}
                onChange={(e) => setPriceTier(e.target.value as any)}
                className="px-3 py-1.5 bg-[#121312] border border-white/[0.08] text-xs font-mono text-[#fbf9f6] focus:outline-none focus:border-white/40"
              >
                <option value="all">Any Price</option>
                <option value="under1000">Under $1,000</option>
                <option value="1000to2500">$1,000 – $2,500</option>
                <option value="over2500">Over $2,500</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 bg-[#121312] border border-white/[0.08] text-xs font-mono text-[#fbf9f6] focus:outline-none focus:border-white/40"
              >
                <option value="recent">Sort: Chronological</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="title">Title: Alphabetical</option>
              </select>

              {(selectedDiscipline !== 'All' ||
                availabilityFilter !== 'all' ||
                priceTier !== 'all' ||
                searchFilter) && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-mono text-white/80 hover:text-white underline transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Render */}
        {filteredArtworks.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-white/[0.08] bg-[#171817] p-8">
            <span className="material-symbols-outlined text-4xl text-[#73716b] mb-3">
              filter_none
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#fbf9f6]">No works match your filter</h3>
            <p className="text-xs text-[#a6a49f] mt-1 max-w-sm mx-auto font-sans">
              Try adjusting your medium discipline, availability, or clearing your keyword query.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 bg-white text-[#121312] text-xs font-mono uppercase tracking-wider hover:bg-[#eae8e4] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : layoutMode === 'ledger' ? (
          /* Ledger / List Mode */
          <div className="bg-[#171817] border border-white/[0.08] divide-y divide-white/[0.08] overflow-hidden shadow-xl">
            <div className="p-4 grid grid-cols-12 text-[11px] font-mono uppercase tracking-wider text-[#a6a49f] bg-[#121312]">
              <div className="col-span-1">Ref</div>
              <div className="col-span-5">Artwork & Medium</div>
              <div className="col-span-3">Artist / Atelier</div>
              <div className="col-span-1">Year</div>
              <div className="col-span-2 text-right">Price / Action</div>
            </div>
            {filteredArtworks.map((art) => (
              <div
                key={art.id}
                className="p-4 grid grid-cols-12 items-center hover:bg-white/[0.03] transition-colors group cursor-pointer"
                onClick={() => onSelectArtwork(art.id)}
              >
                <div className="col-span-1 font-mono text-xs text-[#73716b]">
                  {art.catalogNumber?.slice(-3) || '001'}
                </div>
                <div className="col-span-5 flex items-center gap-4">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-12 h-12 object-cover flex-shrink-0 border border-white/[0.08] bg-[#121312]"
                  />
                  <div>
                    <h4 className="font-serif text-base font-medium text-[#fbf9f6] group-hover:underline">
                      {art.title}
                    </h4>
                    <p className="text-xs text-[#a6a49f] truncate">{art.medium}</p>
                  </div>
                </div>
                <div className="col-span-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectArtist(art.artistId);
                    }}
                    className="text-xs font-mono text-[#fbf9f6] hover:underline block"
                  >
                    {art.artistName}
                  </button>
                  <span className="text-[11px] text-[#73716b]">{art.artistLocation}</span>
                </div>
                <div className="col-span-1 text-xs font-mono text-[#a6a49f]">{art.year}</div>
                <div className="col-span-2 text-right flex items-center justify-end gap-3">
                  <span className="font-mono text-xs font-semibold text-[#fbf9f6]">
                    {formatPrice(art.price, currency)}
                  </span>
                  {art.status === 'available' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickInquire(art);
                      }}
                      className="px-3 py-1 bg-[#c2623a] text-white text-[10px] font-mono uppercase tracking-wider hover:bg-[#d67248] transition-colors"
                    >
                      Inquire
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono text-[#a6a49f] uppercase bg-white/5 px-2 py-0.5 border border-white/[0.08]">Reserved</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : layoutMode === 'dense' ? (
          /* Dense Index Grid Mode */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredArtworks.map((art) => (
              <div
                key={art.id}
                className="group bg-[#171817] border border-white/[0.08] flex flex-col justify-between transition-all duration-300 hover:border-white/30 hover:shadow-xl"
              >
                <div
                  className="relative aspect-[4/5] bg-[#121312] overflow-hidden cursor-pointer"
                  onClick={() => onSelectArtwork(art.id)}
                >
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#121312]/90 backdrop-blur-md px-2 py-0.5 border border-white/[0.08] text-[10px] font-mono uppercase tracking-wider text-white">
                    {art.status === 'available' ? 'Available' : 'Reserved'}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#73716b]">
                      <button
                        onClick={() => onSelectArtist(art.artistId)}
                        className="text-[#a6a49f] hover:text-white truncate max-w-[120px] transition-colors"
                      >
                        {art.artistName}
                      </button>
                      <span>{art.year}</span>
                    </div>

                    <h3
                      onClick={() => onSelectArtwork(art.id)}
                      className="font-serif text-base font-normal text-[#fbf9f6] mt-1 hover:underline cursor-pointer truncate"
                    >
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#73716b] truncate font-sans">{art.medium}</p>
                  </div>

                  <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#fbf9f6] font-semibold">
                      {formatPrice(art.price, currency)}
                    </span>
                    <button
                      onClick={() => onSelectArtwork(art.id)}
                      className="text-[#a6a49f] hover:text-white"
                    >
                      Inspect →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* =====================================================================
             SALON & MONOGRAPH PACING (Breaking E-Commerce Grid Monotony)
             Alternating Visual Weights:
             1. Monumental masterwork horizontal plate
             2. Asymmetric paired studies (diptych split)
             3. Asymmetric reading column with margin notes
             4. Accession inventory ledger
             ===================================================================== */
          <div className="space-y-16">
            {/* 1. Monumental Masterwork Plate */}
            {premierArtwork && (
              <div className="border border-white/[0.08] bg-[#171817] p-6 sm:p-10 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div
                    className="lg:col-span-8 aspect-[16/10] bg-[#121312] overflow-hidden relative cursor-pointer border border-white/[0.08] group"
                    onClick={() => onSelectArtwork(premierArtwork.id)}
                  >
                    <img
                      src={premierArtwork.imageUrl}
                      alt={premierArtwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.88] contrast-[1.08]"
                    />
                    <div className="absolute top-4 left-4 bg-[#121312]/90 backdrop-blur-md px-3 py-1 text-xs font-mono text-white border border-white/[0.08]">
                      Plate 01 · Monumental Masterwork
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                    <div className="text-xs font-mono text-[#a6a49f] uppercase tracking-widest">
                      Featured Specimen · Direct Studio Monograph
                    </div>

                    <div>
                      <h3
                        onClick={() => onSelectArtwork(premierArtwork.id)}
                        className="font-serif text-3xl sm:text-4xl font-normal text-white hover:underline cursor-pointer"
                      >
                        {premierArtwork.title}
                      </h3>
                      <button
                        onClick={() => onSelectArtist(premierArtwork.artistId)}
                        className="text-xs font-mono text-[#a6a49f] hover:text-white block mt-1"
                      >
                        By {premierArtwork.artistName} ({premierArtwork.artistLocation})
                      </button>
                    </div>

                    <p className="text-sm text-[#a6a49f] font-sans leading-relaxed">
                      {premierArtwork.curatorialStatement || premierArtwork.bodyDescription || 'Crafted with unhurried reverence for physical materiality and natural elemental firing.'}
                    </p>

                    <div className="p-4 bg-[#121312] border border-white/[0.08] space-y-2 text-xs font-mono text-[#c8c5be]">
                      <div className="flex justify-between">
                        <span className="text-[#73716b]">Medium:</span>
                        <span className="text-white">{premierArtwork.medium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#73716b]">Dimensions:</span>
                        <span className="text-white">{premierArtwork.dimensions || 'Dimensions on archival certificate'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#73716b]">Provenance:</span>
                        <span className="text-white">Studio Direct · Verified Archive</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-white/[0.08] text-sm font-semibold">
                        <span className="text-white">Valuation:</span>
                        <span className="text-[#fbf9f6]">{formatPrice(premierArtwork.price, currency)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      {premierArtwork.status === 'available' ? (
                        <button
                          onClick={() => onQuickInquire(premierArtwork)}
                          className="px-6 py-3 border border-[#c2623a] bg-[#c2623a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#d67248] transition-colors"
                        >
                          Acquisition Dossier
                        </button>
                      ) : (
                        <span className="px-4 py-2 border border-white/[0.08] text-xs font-mono text-[#73716b] uppercase">
                          Acquired · In Private Collection
                        </span>
                      )}
                      <button
                        onClick={() => onSelectArtwork(premierArtwork.id)}
                        className="px-6 py-3 border border-white/20 text-white text-xs font-mono uppercase tracking-widest hover:border-white transition-colors"
                      >
                        Inspect Plate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Asymmetric Paired Studies (Diptych 60/40 Split) */}
            {pairedStudyOne && pairedStudyTwo && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Study One: 7 cols */}
                <div
                  className="lg:col-span-7 bg-[#171817] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-xl cursor-pointer group"
                  onClick={() => onSelectArtwork(pairedStudyOne.id)}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#a6a49f]">
                      <span>Study II · {pairedStudyOne.mediumCategory}</span>
                      <span>{pairedStudyOne.dimensions || 'Custom format'}</span>
                    </div>
                    <div className="aspect-[16/10] bg-[#121312] overflow-hidden relative border border-white/[0.08] mb-6">
                      <img
                        src={pairedStudyOne.imageUrl}
                        alt={pairedStudyOne.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.88]"
                      />
                    </div>
                    <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white group-hover:underline">
                      {pairedStudyOne.title}
                    </h4>
                    <p className="text-xs font-mono text-[#a6a49f] mt-1">{pairedStudyOne.artistName} · {pairedStudyOne.artistLocation}</p>
                    <p className="text-xs text-[#a6a49f] font-sans mt-2 line-clamp-2">
                      {pairedStudyOne.curatorialStatement || pairedStudyOne.bodyDescription}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-semibold">
                      {formatPrice(pairedStudyOne.price, currency)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickInquire(pairedStudyOne);
                      }}
                      className="text-white/80 hover:text-white underline"
                    >
                      Acquisition Inquiry →
                    </button>
                  </div>
                </div>

                {/* Study Two: 5 cols */}
                <div
                  className="lg:col-span-5 bg-[#171817] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-xl cursor-pointer group"
                  onClick={() => onSelectArtwork(pairedStudyTwo.id)}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#a6a49f]">
                      <span>Study III · {pairedStudyTwo.mediumCategory}</span>
                      <span>{pairedStudyTwo.dimensions || 'Sculptural Specimen'}</span>
                    </div>
                    <div className="aspect-square bg-[#121312] overflow-hidden relative border border-white/[0.08] mb-6">
                      <img
                        src={pairedStudyTwo.imageUrl}
                        alt={pairedStudyTwo.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.88]"
                      />
                    </div>
                    <h4 className="font-serif text-2xl font-normal text-white group-hover:underline">
                      {pairedStudyTwo.title}
                    </h4>
                    <p className="text-xs font-mono text-[#a6a49f] mt-1">{pairedStudyTwo.artistName} · {pairedStudyTwo.artistLocation}</p>
                    <p className="text-xs text-[#a6a49f] font-sans mt-2 line-clamp-2">
                      {pairedStudyTwo.curatorialStatement || pairedStudyTwo.bodyDescription}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-semibold">
                      {formatPrice(pairedStudyTwo.price, currency)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickInquire(pairedStudyTwo);
                      }}
                      className="text-white/80 hover:text-white underline"
                    >
                      Acquisition Inquiry →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Asymmetric Reading Column with Margin Notes */}
            {readingPlate && (
              <div className="bg-[#171817] border border-white/[0.08] p-6 sm:p-10 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div
                    className="lg:col-span-5 space-y-4 cursor-pointer"
                    onClick={() => onSelectArtwork(readingPlate.id)}
                  >
                    <span className="text-xs font-mono uppercase tracking-widest text-[#a6a49f] block">
                      Plate 04 · Materiality Study
                    </span>
                    <h3 className="font-serif text-3xl font-normal text-white hover:underline">
                      {readingPlate.title}
                    </h3>
                    <p className="text-xs font-mono text-[#a6a49f]">
                      {readingPlate.artistName} ({readingPlate.artistLocation}) · {readingPlate.year}
                    </p>
                    <p className="text-xs text-[#a6a49f] font-sans leading-relaxed">
                      {readingPlate.curatorialStatement || readingPlate.bodyDescription || 'Rooted in timeless slow craft, this piece investigates the natural tension between raw earth, physical pressure, and atmospheric reduction.'}
                    </p>
                    <div className="pt-2 flex items-center gap-4 text-xs font-mono">
                      <span className="font-semibold text-white">{formatPrice(readingPlate.price, currency)}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectArtwork(readingPlate.id);
                        }}
                        className="text-white hover:underline"
                      >
                        Inspect Dimensions & Angles →
                      </button>
                    </div>
                  </div>

                  <div
                    className="lg:col-span-7 aspect-[16/9] bg-[#121312] overflow-hidden border border-white/[0.08] cursor-pointer group"
                    onClick={() => onSelectArtwork(readingPlate.id)}
                  >
                    <img
                      src={readingPlate.imageUrl}
                      alt={readingPlate.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. Accession Ledger Table for Further Works */}
            {ledgerArtworks.length > 0 && (
              <div className="bg-[#171817] border border-white/[0.08] overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-white">
                    Accession Ledger · Additional Monograph Specimens
                  </span>
                  <span className="text-xs font-mono text-[#73716b]">
                    {ledgerArtworks.length} Specimens Catalogued
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#121312] text-[#73716b] border-b border-white/[0.08] uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3 px-4">Ref</th>
                        <th className="py-3 px-4">Specimen Plate</th>
                        <th className="py-3 px-4">Artist / Location</th>
                        <th className="py-3 px-4 hidden md:table-cell">Dimensions</th>
                        <th className="py-3 px-4">Valuation</th>
                        <th className="py-3 px-4 text-right">Inquiry</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                      {ledgerArtworks.map((art) => (
                        <tr
                          key={art.id}
                          onClick={() => onSelectArtwork(art.id)}
                          className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                        >
                          <td className="py-3.5 px-4 text-[#73716b]">
                            {art.catalogNumber?.slice(-3) || '001'}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={art.imageUrl}
                                alt={art.title}
                                className="w-10 h-10 object-cover border border-white/[0.08] bg-[#121312]"
                              />
                              <div>
                                <span className="font-serif text-sm text-white group-hover:underline block font-normal">
                                  {art.title}
                                </span>
                                <span className="text-[11px] text-[#73716b]">{art.medium}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-[#a6a49f]">
                            {art.artistName} · {art.artistLocation}
                          </td>
                          <td className="py-3.5 px-4 text-[#73716b] hidden md:table-cell">
                            {art.dimensions || 'Specifications on dossier'}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-white">
                            {formatPrice(art.price, currency)}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {art.status === 'available' ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onQuickInquire(art);
                                }}
                                className="text-[#c2623a] hover:underline"
                              >
                                Inquire →
                              </button>
                            ) : (
                              <span className="text-[#73716b]">Reserved</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
