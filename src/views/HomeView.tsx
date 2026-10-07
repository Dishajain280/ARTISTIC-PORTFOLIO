import React, { useState } from 'react';
import { ARTWORKS, ARTISTS, JOURNAL_ARTICLES, THEMATIC_COLLECTIONS } from '../data/mockData';
import { Artwork, Currency, ViewMode } from '../types';
import { formatPrice } from '../utils/formatters';

interface HomeViewProps {
  onSelectArtwork: (artworkId: string) => void;
  onSelectArtist: (artistId: string) => void;
  onSelectJournal: (articleId: string) => void;
  onNavigate: (view: ViewMode) => void;
  onOpenPortfolioBuilder: () => void;
  currency: Currency;
  onQuickInquire: (artwork: Artwork) => void;
}

const DISCIPLINES = [
  'All Disciplines',
  'Ceramics & Stoneware',
  'Paintings',
  'Sculptures',
  'Crafts & Textiles',
  'Printmaking',
  'Digital Art',
];

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectArtwork,
  onSelectArtist,
  onSelectJournal,
  onNavigate,
  onOpenPortfolioBuilder,
  currency,
  onQuickInquire,
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState('All Disciplines');

  const filteredArtworks =
    selectedDiscipline === 'All Disciplines'
      ? ARTWORKS
      : ARTWORKS.filter(
          (art) =>
            art.mediumCategory.toLowerCase() === selectedDiscipline.toLowerCase() ||
            art.medium.toLowerCase().includes(selectedDiscipline.toLowerCase())
        );

  const featuredArtist = ARTISTS[0]; // Elena Rostova
  const featuredArtwork = ARTWORKS.find((a) => a.id === 'vessel-14') || ARTWORKS[0];

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[#e4e2df] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f4f2ee] border border-[#e4e2df] text-[11px] font-mono uppercase tracking-[0.2em] text-[#575953]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b1c1a]"></span>
              A Curated Digital Monograph & Atelier Platform
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#1b1c1a] leading-[1.05]">
              A quiet home for artists and their work.
            </h1>

            <p className="text-lg sm:text-xl text-[#575953] font-sans max-w-2xl leading-relaxed">
              Purpose-built for visual artists, sculptors, and independent makers to present museum-grade exhibitions, document physical process, and sell directly to patrons with 0% commission.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('discover')}
                className="px-8 py-4 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-all shadow-sm flex items-center gap-2"
              >
                <span>Explore Catalog</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <button
                onClick={onOpenPortfolioBuilder}
                className="px-8 py-4 bg-transparent border border-[#1b1c1a] text-[#1b1c1a] text-xs font-mono uppercase tracking-widest hover:bg-[#f4f2ee] transition-all"
              >
                Create Your Monograph
              </button>

              <div className="flex items-center gap-6 ml-0 sm:ml-4 text-xs font-mono text-[#72787e]">
                <span>• 0% Commission</span>
                <span>• Archival Preservation</span>
                <span>• Direct Studio Dialogue</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Monograph Spotlight: Elena Rostova */}
      <section className="py-20 md:py-28 border-b border-[#e4e2df] bg-[#f7f5f1]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
                Featured Monograph Spotlight
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a] mt-1">
                Artist of the Season
              </h2>
            </div>
            <button
              onClick={() => onSelectArtist(featuredArtist.id)}
              className="text-xs font-mono uppercase tracking-widest text-[#1b1c1a] hover:underline flex items-center gap-1"
            >
              <span>View Full Monograph</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Artwork Hero Presentation */}
            <div className="lg:col-span-7 relative group cursor-pointer" onClick={() => onSelectArtwork(featuredArtwork.id)}>
              <div className="aspect-[4/3] bg-[#ebe7e0] overflow-hidden relative">
                <img
                  src={featuredArtwork.imageUrl}
                  alt={featuredArtwork.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#1b1c1a]">
                  Catalog Ref: {featuredArtwork.catalogNumber || 'ROST-2024-V14'}
                </div>
                <div className="absolute bottom-4 right-4 bg-[#1b1c1a]/90 text-white px-3 py-1 text-xs font-mono">
                  {formatPrice(featuredArtwork.price, currency)}
                </div>
              </div>
            </div>

            {/* Monograph Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src={featuredArtist.avatarUrl}
                  alt={featuredArtist.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#d2cfc9]"
                />
                <div>
                  <h3 className="font-serif text-2xl font-medium text-[#1b1c1a]">
                    {featuredArtist.name}
                  </h3>
                  <p className="text-xs text-[#72787e] font-sans">
                    {featuredArtist.medium} • {featuredArtist.location}
                  </p>
                </div>
              </div>

              <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#2a2c29] leading-snug">
                "{featuredArtist.quote}"
              </blockquote>

              <p className="text-sm text-[#575953] leading-relaxed">
                {featuredArtist.bio}
              </p>

              <div className="p-4 bg-white border border-[#e4e2df] space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#72787e]">Primary Masterwork:</span>
                  <span className="text-[#1b1c1a] font-medium">{featuredArtwork.title}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#72787e]">Materiality:</span>
                  <span className="text-[#1b1c1a]">{featuredArtwork.medium}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#72787e]">Dimensions:</span>
                  <span className="text-[#1b1c1a]">{featuredArtwork.dimensions}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#72787e]">Status:</span>
                  <span className="text-[#255e37] font-medium">Available — 1 of 1 unique piece</span>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => onSelectArtwork(featuredArtwork.id)}
                  className="px-6 py-3 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-colors"
                >
                  Inspect Artwork
                </button>
                <button
                  onClick={() => onQuickInquire(featuredArtwork)}
                  className="px-6 py-3 border border-[#1b1c1a] text-[#1b1c1a] text-xs font-mono uppercase tracking-widest hover:bg-[#f4f2ee] transition-colors"
                >
                  Direct Studio Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discipline Filters & Catalog Grid */}
      <section className="py-20 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
              Selected Index
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a] mt-1">
              Recent Works from the Ateliers
            </h2>
          </div>

          {/* Discipline Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {DISCIPLINES.map((discipline) => (
              <button
                key={discipline}
                onClick={() => setSelectedDiscipline(discipline)}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-colors whitespace-nowrap border ${
                  selectedDiscipline === discipline
                    ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
                    : 'bg-white text-[#575953] border-[#e4e2df] hover:border-[#1b1c1a] hover:text-[#1b1c1a]'
                }`}
              >
                {discipline}
              </button>
            ))}
          </div>
        </div>

        {/* Artwork Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredArtworks.slice(0, 8).map((art) => (
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
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider ${
                      art.status === 'available'
                        ? 'bg-white/95 text-[#1b1c1a] shadow-sm'
                        : art.status === 'reserved'
                        ? 'bg-[#3b352b]/90 text-white'
                        : 'bg-[#575953]/90 text-white'
                    }`}
                  >
                    {art.status === 'available'
                      ? 'Available'
                      : art.status === 'reserved'
                      ? 'Reserved'
                      : 'Exhibition Loan'}
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
                    View Details
                  </button>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
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
                    className="font-serif text-lg font-medium text-[#1b1c1a] mt-1 hover:underline cursor-pointer"
                  >
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#72787e] mt-1 line-clamp-1">{art.medium}</p>
                </div>

                <div className="pt-3 border-t border-[#f0ede8] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#72787e] uppercase block">
                      Direct Acquisition
                    </span>
                    <span className="font-mono text-sm font-semibold text-[#1b1c1a]">
                      {formatPrice(art.price, currency)}
                    </span>
                  </div>

                  {art.status === 'available' ? (
                    <button
                      onClick={() => onQuickInquire(art)}
                      className="text-xs font-mono text-[#1b1c1a] hover:underline flex items-center gap-1"
                    >
                      <span>Inquire</span>
                      <span className="material-symbols-outlined text-xs">arrow_outward</span>
                    </button>
                  ) : (
                    <span className="text-xs font-mono text-[#72787e] italic">In Private Collection</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('discover')}
            className="px-8 py-3.5 bg-white border border-[#1b1c1a] text-[#1b1c1a] text-xs font-mono uppercase tracking-widest hover:bg-[#1b1c1a] hover:text-white transition-colors"
          >
            Browse All {ARTWORKS.length} Masterworks
          </button>
        </div>
      </section>

      {/* Curated Thematic Collections */}
      <section className="py-20 border-t border-b border-[#e4e2df] bg-[#f7f5f1]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
                Curated Series
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a] mt-1">
                Thematic Anthologies
              </h2>
            </div>
            <span className="text-xs font-mono text-[#72787e] hidden sm:block">
              Organized by material lineage & form
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {THEMATIC_COLLECTIONS.map((col) => (
              <div
                key={col.id}
                onClick={() => onNavigate('discover')}
                className="group relative aspect-[3/4] bg-[#ebe7e0] overflow-hidden cursor-pointer border border-[#e4e2df]"
              >
                <img
                  src={col.imageUrl}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] font-mono tracking-widest uppercase opacity-80 block mb-1">
                    {col.worksCount} Works Catalogued
                  </span>
                  <h3 className="font-serif text-xl font-normal leading-snug group-hover:underline">
                    {col.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dispatches from the Atelier (Journal) */}
      <section className="py-20 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
              The Atelier Journal
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a] mt-1">
              Dispatches on Materiality & Slow Craft
            </h2>
          </div>
          <button
            onClick={() => onNavigate('journal')}
            className="text-xs font-mono uppercase tracking-widest text-[#1b1c1a] hover:underline flex items-center gap-1"
          >
            <span>All Dispatches</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.slice(0, 3).map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectJournal(article.id)}
              className="group cursor-pointer flex flex-col justify-between border-b border-[#e4e2df] pb-6"
            >
              <div>
                <div className="aspect-[16/10] bg-[#ebe7e0] overflow-hidden mb-4 border border-[#e4e2df]">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#72787e] mb-2">
                  <span>{article.dispatchNumber}</span>
                  <span>•</span>
                  <span>{article.category}</span>
                </div>
                <h3 className="font-serif text-xl font-normal text-[#1b1c1a] group-hover:underline leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-[#575953] mt-2 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs font-mono text-[#72787e]">
                <span>By {article.author}</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creator Manifesto / Callout */}
      <section className="py-20 bg-[#1b1c1a] text-[#fbf9f6] border-t border-[#343734]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#a0a39f]">
              For Independent Artists & Foundries
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-tight">
              The digital space your craft has always deserved.
            </h2>
            <p className="text-base sm:text-lg text-[#c8c5be] font-sans leading-relaxed">
              Galleries take 50%. Social algorithms bury subtle nuance in 15-second reels. Atelier offers uncompressed image resolution, scholarly essays, and direct custodial acquisitions where 100% of proceeds go to the hands that shaped the work.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onOpenPortfolioBuilder}
                className="px-8 py-4 bg-[#fbf9f6] text-[#1b1c1a] text-xs font-mono uppercase tracking-widest hover:bg-white transition-colors"
              >
                Open Your Atelier Monograph
              </button>
              <button
                onClick={() => onNavigate('pricing')}
                className="px-8 py-4 border border-[#575953] text-[#fbf9f6] text-xs font-mono uppercase tracking-widest hover:border-white transition-colors"
              >
                View Patronage & Plans
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
