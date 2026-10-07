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

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-28 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header Title */}
        <div className="border-b border-[#e4e2df] pb-8 mb-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
              Curated Index
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#1b1c1a] mt-1">
              Discover Masterworks
            </h1>
            <p className="text-sm sm:text-base text-[#575953] mt-3 font-sans max-w-xl">
              Authentic artworks direct from studios worldwide. Handcrafted ceramics, mineral oil paintings, sculptural joinery, and architectural fiber.
            </p>
          </div>
        </div>

        {/* Filter & Controls Bar */}
        <div className="bg-white border border-[#e4e2df] p-4 sm:p-6 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search within index */}
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#72787e] text-lg">
                search
              </span>
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter by title, medium, or artist..."
                className="w-full pl-9 pr-4 py-2 bg-[#f4f2ee] border border-[#e4e2df] text-xs text-[#1b1c1a] placeholder-[#8d9196] focus:outline-none focus:border-[#1b1c1a] font-sans"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#72787e] hover:text-[#1b1c1a]"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>

            {/* Layout Mode & Counter */}
            <div className="flex items-center gap-4 justify-between lg:justify-end">
              <span className="text-xs font-mono text-[#72787e]">
                Showing {filteredArtworks.length} of {ARTWORKS.length} works
              </span>

              <div className="flex items-center border border-[#e4e2df] bg-[#f4f2ee] p-0.5">
                <button
                  onClick={() => setLayoutMode('editorial')}
                  className={`p-1.5 transition-colors ${
                    layoutMode === 'editorial' ? 'bg-white shadow-sm text-[#1b1c1a]' : 'text-[#72787e]'
                  }`}
                  title="Editorial Grid"
                >
                  <span className="material-symbols-outlined text-base">grid_view</span>
                </button>
                <button
                  onClick={() => setLayoutMode('dense')}
                  className={`p-1.5 transition-colors ${
                    layoutMode === 'dense' ? 'bg-white shadow-sm text-[#1b1c1a]' : 'text-[#72787e]'
                  }`}
                  title="Dense Grid"
                >
                  <span className="material-symbols-outlined text-base">apps</span>
                </button>
                <button
                  onClick={() => setLayoutMode('ledger')}
                  className={`p-1.5 transition-colors ${
                    layoutMode === 'ledger' ? 'bg-white shadow-sm text-[#1b1c1a]' : 'text-[#72787e]'
                  }`}
                  title="Ledger List"
                >
                  <span className="material-symbols-outlined text-base">view_list</span>
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Filters row */}
          <div className="pt-3 border-t border-[#f0ede8] flex flex-wrap items-center justify-between gap-4">
            {/* Discipline tags */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {disciplines.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDiscipline(d)}
                  className={`px-3 py-1.5 text-xs font-mono transition-colors whitespace-nowrap border ${
                    selectedDiscipline === d
                      ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
                      : 'bg-[#f4f2ee] text-[#575953] border-[#e4e2df] hover:border-[#1b1c1a]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Dropdowns */}
            <div className="flex items-center gap-3">
              {/* Availability */}
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value as any)}
                className="px-3 py-1.5 bg-[#f4f2ee] border border-[#e4e2df] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
              >
                <option value="all">All Statuses</option>
                <option value="available">Available Pieces Only</option>
                <option value="reserved">Reserved / Loans</option>
              </select>

              {/* Price Tier */}
              <select
                value={priceTier}
                onChange={(e) => setPriceTier(e.target.value as any)}
                className="px-3 py-1.5 bg-[#f4f2ee] border border-[#e4e2df] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
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
                className="px-3 py-1.5 bg-[#f4f2ee] border border-[#e4e2df] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
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
                  className="text-xs font-mono text-[#72787e] hover:text-[#1b1c1a] underline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Render */}
        {filteredArtworks.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-[#d2cfc9] bg-white p-8">
            <span className="material-symbols-outlined text-4xl text-[#72787e] mb-3">
              filter_none
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#1b1c1a]">No works match your filter</h3>
            <p className="text-xs text-[#575953] mt-1 max-w-sm mx-auto">
              Try adjusting your medium discipline, availability, or clearing your keyword query.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#343734]"
            >
              Clear All Filters
            </button>
          </div>
        ) : layoutMode === 'ledger' ? (
          /* Ledger / List Mode */
          <div className="bg-white border border-[#e4e2df] divide-y divide-[#eceae6]">
            <div className="p-4 grid grid-cols-12 text-[11px] font-mono uppercase tracking-wider text-[#72787e] bg-[#f4f2ee]">
              <div className="col-span-1">Ref</div>
              <div className="col-span-5">Artwork & Medium</div>
              <div className="col-span-3">Artist / Atelier</div>
              <div className="col-span-1">Year</div>
              <div className="col-span-2 text-right">Price / Action</div>
            </div>
            {filteredArtworks.map((art) => (
              <div
                key={art.id}
                className="p-4 grid grid-cols-12 items-center hover:bg-[#faf8f5] transition-colors group cursor-pointer"
                onClick={() => onSelectArtwork(art.id)}
              >
                <div className="col-span-1 font-mono text-xs text-[#72787e]">
                  {art.catalogNumber?.slice(-3) || '001'}
                </div>
                <div className="col-span-5 flex items-center gap-4">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-12 h-12 object-cover flex-shrink-0 border border-[#e4e2df]"
                  />
                  <div>
                    <h4 className="font-serif text-base font-medium text-[#1b1c1a] group-hover:underline">
                      {art.title}
                    </h4>
                    <p className="text-xs text-[#72787e] truncate">{art.medium}</p>
                  </div>
                </div>
                <div className="col-span-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectArtist(art.artistId);
                    }}
                    className="text-xs font-mono text-[#575953] hover:text-[#1b1c1a] hover:underline block"
                  >
                    {art.artistName}
                  </button>
                  <span className="text-[11px] text-[#72787e]">{art.artistLocation}</span>
                </div>
                <div className="col-span-1 text-xs font-mono text-[#72787e]">{art.year}</div>
                <div className="col-span-2 text-right flex items-center justify-end gap-3">
                  <span className="font-mono text-xs font-semibold text-[#1b1c1a]">
                    {formatPrice(art.price, currency)}
                  </span>
                  {art.status === 'available' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickInquire(art);
                      }}
                      className="px-3 py-1 bg-[#1b1c1a] text-white text-[10px] font-mono uppercase tracking-wider hover:bg-[#343734]"
                    >
                      Inquire
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono text-[#72787e] uppercase">Reserved</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Editorial or Dense Grid Mode */
          <div
            className={`grid gap-8 ${
              layoutMode === 'dense'
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {filteredArtworks.map((art) => (
              <div
                key={art.id}
                className="group bg-white border border-[#e4e2df] flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#c8c5be]"
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

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectArtwork(art.id);
                      }}
                      className="px-4 py-2 bg-white text-[#1b1c1a] text-xs font-mono uppercase tracking-wider shadow-md hover:bg-[#f4f2ee]"
                    >
                      Inspect
                    </button>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => onSelectArtist(art.artistId)}
                        className="text-xs font-mono text-[#72787e] hover:text-[#1b1c1a] hover:underline"
                      >
                        {art.artistName}
                      </button>
                      <span className="text-xs font-mono text-[#72787e]">{art.year}</span>
                    </div>

                    <h3
                      onClick={() => onSelectArtwork(art.id)}
                      className="font-serif text-base font-medium text-[#1b1c1a] mt-1 hover:underline cursor-pointer"
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
                      <span className="text-xs font-mono text-[#72787e] italic">Acquired</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
