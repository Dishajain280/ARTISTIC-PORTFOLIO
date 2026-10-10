import React, { useState } from 'react';
import { ARTWORKS, ARTISTS, JOURNAL_ARTICLES, THEMATIC_COLLECTIONS } from '../data/mockData';
import { Artwork, Creator, Currency, ViewMode, ViewRoute } from '../types';
import { formatPrice } from '../utils/formatters';

export interface LandingViewProps {
  onNavigate?: (route: any) => void;
  onOpenOnboarding?: () => void;
  onOpenPortfolioBuilder?: () => void;
  onSelectArtwork?: (artworkId: string) => void;
  onSelectArtist?: (artistId: string) => void;
  onSelectJournal?: (articleId: string) => void;
  currency?: Currency;
  onQuickInquire?: (artwork: Artwork) => void;
  featuredCreators?: Creator[];
}

export interface CuratedCarouselItem {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  artistHandle: string;
  artistLocation: string;
  medium: string;
  year: number;
  catalogNumber: string;
  status: 'available' | 'reserved' | 'exhibition_loan' | 'commission_sample';
  statusLabel: string;
  price: number;
  imageUrl: string;
  paletteDescription: string;
  dimensions: string;
  curatorialStatement: string;
}

// 5 Curated Masterworks for the Sanctuary Viewport
const CURATED_PLATES: CuratedCarouselItem[] = [
  {
    id: 'vessel-14',
    title: 'Vessel No. 14',
    artistId: 'elena-rostova',
    artistName: 'Elena Rostova',
    artistHandle: 'elena',
    artistLocation: 'Kyoto & London',
    medium: 'Ash Glaze Study in Coarse Shigaraki Stoneware',
    year: 2024,
    catalogNumber: 'ACC. 2024.ER014',
    status: 'available',
    statusLabel: 'Available for Acquisition',
    price: 480,
    dimensions: '38 × 24 × 24 cm',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDoZl1b3JtNa2NYTQzShBE7TpxNk8vlcxAjFOvygCBXI7gQEdWTrIH-ENm6cXuN5YD7yJ-gXtvEWD32E8Lb-46LKwrEqBigU9XuTm7Zhzlidgr45o94QUPZKhEvV7P2d2bDH5XRAbJRbRPMGE-ntDs4uxaADA9LwtiDcqb4B8GjnLjSlPu6flpRKQQTs_PfODTyTYFr3uSKqQONkBdj-w4a6RppI90v-taOd8xc-FQ5c_HoLTKd8AyO',
    paletteDescription: 'Natural Pine Ash & Reduction Basalt',
    curatorialStatement:
      'Continuous hand-coiling over three weeks, reduction fired in an anagama kiln in Kyoto for 36 hours. Spontaneous molten pine ash glaze over unrefined Shigaraki clay.',
  },
  {
    id: 'terra-incognita',
    title: 'Terra Incognita',
    artistId: 'marcus-vane',
    artistName: 'Marcus Vane',
    artistHandle: 'marcus',
    artistLocation: 'Milan, Italy',
    medium: 'Mural Study No. IV — Raw Earth Pigment on Belgian Flax',
    year: 2024,
    catalogNumber: 'ACC. 2024.MV004',
    status: 'available',
    statusLabel: 'Available for Acquisition',
    price: 4800,
    dimensions: '240 × 180 cm',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDgerzQdkyEb0gmk8gOTi3T_fLUNPj136tw0uudYdKt-q6yUSvXUWjrdEpixDlxEW2dA9o7P37wepVHDP_F9kf3oBF9IbBA5eiUPnGMPMkud1Lc5rKPyszbUU_ocOyH58z-5Fs9sVSvQqldLc-d974dy6mlWn-Y89Q6F0BnAWFmL7eUG2B2LfVw1G3HolyqEmTP_ez-TArmaQLRUnXEpVNL07M4oH5EQPaBvxoYSDbrv0VbvgcAqX28',
    paletteDescription: 'Venetian Charcoal & Raw Sienese Ochre',
    curatorialStatement:
      'A monumental investigation into the tectonic weight of raw pigments on untreated Belgian flax, illuminated by natural Milanese atelier light.',
  },
  {
    id: 'woven-memory-3',
    title: 'Woven Memory III',
    artistId: 'aoi-tanaka',
    artistName: 'Aoi Tanaka',
    artistHandle: 'aoi',
    artistLocation: 'Copenhagen, Denmark',
    medium: 'Architectural Tapestry in Raw Flax & Nordic Sheep Wool',
    year: 2024,
    catalogNumber: 'ACC. 2024.AT003',
    status: 'available',
    statusLabel: 'Direct Studio Sale',
    price: 1200,
    dimensions: '180 × 90 cm',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBqjPQFeshQM8FWyLtIlJxclwGu6ummENRehD2Q5yyuhDoQP-O1dw6KOfv44m0WFugRwu41JhY5GGtuhpD3GFQvm2E4ywBeZXI7QZEHnptzFWO94vajpmCPXysM8ABZGrIrUKEE1voPJ5RxpZNM2OKputLUz04cN_wtsc9ZaGRBSmtyBsHO_Mnj1vhFkLobRbKvM2KVZ1_C-hSpPRxF40kKilOsso4efyHZsmunJjE9dhHJ4lmBVbRd',
    paletteDescription: 'Unbleached Flax, Jute & Natural Charcoal Wool',
    curatorialStatement:
      'Hand-woven on a traditional Scandinavian loom. Bridges Japanese wabi-sabi aesthetics with Nordic textile traditions to soften monolithic architecture.',
  },
  {
    id: 'carved-walnut-basin',
    title: 'Carved Walnut Basin',
    artistId: 'soren-lind',
    artistName: 'Soren Lind',
    artistHandle: 'soren',
    artistLocation: 'Copenhagen, Denmark',
    medium: 'Solid Carved American Walnut with Organic Beeswax Finish',
    year: 2024,
    catalogNumber: 'ACC. 2024.SL012',
    status: 'commission_sample',
    statusLabel: 'Commission Prototype',
    price: 850,
    dimensions: '52 × 38 × 14 cm',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBi1KBZ4UaHVtIqOYdld16LmVi6Cr8TPuYuGQAZKsIBVLkdcEFbv7z9J5vGnpg3pVmZRF3wVrvs3vzixYCQwSgUO0TqHjq4A6PlsJizNuhfe34jLXaDmeveYqMTeUPD9rudRsfijx88PKx6pV9cLTeLnTpYQxH2R86teRlON25br01Z3ZOCkp4oJ5I5C9E3YRWhGIwcDPk9w0VmJNbeXVDUujDJ-LIaIjguYSJQ-O8dl1_vCFh56jc_',
    paletteDescription: 'Deep American Heartwood & Organic Beeswax',
    curatorialStatement:
      'Sculptural shallow centerpiece basin respecting the natural grain tension of solid walnut, hand-rubbed with organic Danish beeswax.',
  },
  {
    id: 'plinth-totem',
    title: 'Architectural Plinth & Totem',
    artistId: 'elena-rostova',
    artistName: 'Elena Rostova',
    artistHandle: 'elena',
    artistLocation: 'Kyoto & London',
    medium: 'Stacked Unglazed Clay in Coarse Refractory Stoneware',
    year: 2023,
    catalogNumber: 'ACC. 2023.ER009',
    status: 'exhibition_loan',
    statusLabel: 'Venice Biennale Loan',
    price: 3400,
    dimensions: '142 × 36 × 36 cm',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCYJbwpwV-3cgDvXdipwer65B0xikHcyR8stgkXoymzhFIbbIKNUbmlgBLUwKcRHIMRWV4VcYu_xsg1oosB3EiF5BbcK5ZLJ1y7XvD3AxRNuhiI-N2wlnV6ONPyvmxLzv3iVgTJiiv0w8QfgepPXBeBHv6IiVNNNjrOND4fjJ_2yjSow7t1CREu7Yn9DhpJPmn8Zk8RytNV6mQo3ZXyxhJXtzpieQDKf9CY-3Mm86ygt8ZAi9mDxMVZ',
    paletteDescription: 'Raw Basalt Grain & Iron Wash',
    curatorialStatement:
      'Monumental modular totem exhibited in the collateral pavilion of the 2023 Venice Biennale. Six interlocking rings of refractory coarse clay.',
  },
];

export const LandingView: React.FC<LandingViewProps> = ({
  onNavigate,
  onOpenOnboarding,
  onOpenPortfolioBuilder,
  onSelectArtwork,
  onSelectArtist,
  onSelectJournal,
  currency = 'EUR',
  onQuickInquire,
  featuredCreators,
}) => {
  // Curatorial Plate Index
  const [activePlateIndex, setActivePlateIndex] = useState(0);
  const activePlate = CURATED_PLATES[activePlateIndex];
  const totalPlates = CURATED_PLATES.length;

  // Studio Specimen Interactive Mode
  const [activeSpecimenTab, setActiveSpecimenTab] = useState<'commission' | 'provenance' | 'pipeline'>('commission');
  const [calcArtworkValue, setCalcArtworkValue] = useState<number>(6500);

  // Audio notes player state
  const [isPlayingAudioNotes, setIsPlayingAudioNotes] = useState(false);

  // Discipline Filter for Directory
  const [activeResidentMedium, setActiveResidentMedium] = useState('All Masters');

  // Handle Input for Dedicated Studio Monograph Section
  const [handleInput, setHandleInput] = useState('');
  const [handleSubmitted, setHandleSubmitted] = useState(false);

  const creatorsList: Creator[] = featuredCreators && featuredCreators.length > 0 ? featuredCreators : ARTISTS;

  const filteredResidents =
    activeResidentMedium === 'All Masters'
      ? creatorsList
      : creatorsList.filter((c) =>
          c.medium.toLowerCase().includes(activeResidentMedium.toLowerCase()) ||
          c.discipline.toLowerCase().includes(activeResidentMedium.toLowerCase())
        );

  const navigateTo = (view: ViewMode | ViewRoute) => {
    if (onNavigate) onNavigate(view);
  };

  const openPortfolioModal = () => {
    if (onOpenPortfolioBuilder) {
      onOpenPortfolioBuilder();
    } else if (onOpenOnboarding) {
      onOpenOnboarding();
    }
  };

  const handleInspectArtwork = (artworkId: string) => {
    if (onSelectArtwork) {
      onSelectArtwork(artworkId);
    } else {
      navigateTo('artwork');
    }
  };

  const handleInspectArtist = (artistId: string) => {
    if (onSelectArtist) {
      onSelectArtist(artistId);
    } else {
      navigateTo('artist');
    }
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHandleSubmitted(true);
    setTimeout(() => {
      openPortfolioModal();
      setHandleSubmitted(false);
    }, 350);
  };

  // 0% Calculator Values
  const galleryFeeCut = Math.round(calcArtworkValue * 0.5);
  const artistAtelierPayout = calcArtworkValue;
  const annualSavedWithSixPieces = galleryFeeCut * 6;

  // Selected works for salon pacing
  const monumentalArtwork = ARTWORKS.find((a) => a.id === 'terra-incognita') || ARTWORKS[1];
  const studyArtworkOne = ARTWORKS.find((a) => a.id === 'woven-memory-3') || ARTWORKS[2];
  const studyArtworkTwo = ARTWORKS.find((a) => a.id === 'carved-walnut-basin') || ARTWORKS[3];
  const ledgerArtworks = ARTWORKS.filter(
    (a) => !['terra-incognita', 'woven-memory-3', 'carved-walnut-basin'].includes(a.id)
  ).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#121312] text-[#fbf9f6] selection:bg-[#c2623a] selection:text-white">
      {/* =========================================================================
          HERO: Curatorial Viewport Sanctuary
          A single, monumental artwork hero with dramatic natural illumination,
          asymmetric title typography, clean catalog citation, and a single, dignified inquiry call-to-action.
          ========================================================================= */}
      <section className="landing-hero relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between border-b border-white/[0.08] bg-[#121312] overflow-hidden pt-24 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-16">
        {/* Monumental Artwork Photography Backdrop */}
        <div className="absolute inset-0 z-0">
          {CURATED_PLATES.map((plate, index) => {
            const isActive = index === activePlateIndex;
            return (
              <div
                key={plate.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden={!isActive}
              >
                <img
                  src={plate.imageUrl}
                  alt={plate.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.08]"
                />
                {/* Subtle natural vignetting */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121312] via-[#121312]/50 to-[#121312]/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#121312]/95 via-[#121312]/40 to-transparent" />
              </div>
            );
          })}
        </div>

        {/* Top Operational Citation Strip (Zero-Pill, Unboxed Metadata) */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#a6a49f] border-b border-white/10 pb-4 pt-4">
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">Atelier Sovereign Monograph</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>Kyoto & London Studio</span>
            <span aria-hidden="true" className="hidden sm:inline text-white/30">·</span>
            <span className="hidden sm:inline">Permanent Accession Archives</span>
          </div>
          <div className="flex items-center gap-4 text-right">
            <span>Direct Patronage</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-white">0% Platform Cut</span>
          </div>
        </div>

        {/* Hero Asymmetric Center Content Lockup */}
        <div className="relative z-10 max-w-4xl py-12 lg:py-20 space-y-8">
          {/* Accession & Material Citation */}
          <div className="text-xs font-mono tracking-widest uppercase text-[#c2623a]">
            <span>{activePlate.catalogNumber}</span>
            <span aria-hidden="true" className="mx-2 text-white/40">/</span>
            <span className="text-[#a6a49f]">{activePlate.medium}</span>
          </div>

          {/* Asymmetric Monumental Typography */}
          <h1
            className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[0.94]"
            style={{ textWrap: 'balance' }}
          >
            {activePlate.title}
            <span className="block mt-2 italic font-light text-[#dedbd4]">
              Form in Ash & Shadow.
            </span>
          </h1>

          {/* Curatorial Prose Deck */}
          <p className="text-base sm:text-lg lg:text-xl text-[#c8c5be] font-sans max-w-2xl leading-relaxed">
            {activePlate.curatorialStatement}
          </p>

          {/* Single Dignified Inquiry & Discovery Action Lockup */}
          <div className="pt-4 flex flex-wrap items-center gap-5 sm:gap-6">
            <button
              onClick={() => {
                const found = ARTWORKS.find((a) => a.id === activePlate.id);
                if (found && onQuickInquire) {
                  onQuickInquire(found);
                } else {
                  handleInspectArtwork(activePlate.id);
                }
              }}
              className="px-8 py-3.5 border border-[#c2623a] bg-[#c2623a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#d67248] transition-colors whitespace-nowrap"
            >
              Inquire on Acquisition — {formatPrice(activePlate.price, currency)}
            </button>

            <button
              onClick={() => navigateTo('discover')}
              className="px-8 py-3.5 border border-white/20 hover:border-white/60 text-white text-xs font-mono uppercase tracking-widest hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              Explore Permanent Catalog
            </button>

            <button
              onClick={openPortfolioModal}
              className="text-xs font-mono uppercase tracking-widest text-[#a6a49f] hover:text-white transition-colors underline-offset-8 hover:underline whitespace-nowrap"
            >
              Claim Studio Monograph →
            </button>
          </div>
        </div>

        {/* Bottom Curatorial Citation & Plate Switcher (Sanctuary Navigation) */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#a6a49f]">
          {/* Scholarly Citation */}
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">Plate {String(activePlateIndex + 1).padStart(2, '0')}</span>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span>{activePlate.artistName} ({activePlate.artistLocation})</span>
            <span aria-hidden="true" className="hidden sm:inline text-white/30">·</span>
            <span className="hidden sm:inline">{activePlate.dimensions}</span>
          </div>

          {/* Quiet Plate Switcher Controls */}
          <div className="flex items-center gap-4 self-end sm:self-auto">
            <span className="text-[#73716b]">
              {String(activePlateIndex + 1).padStart(2, '0')} / {String(totalPlates).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActivePlateIndex((prev) => (prev - 1 + totalPlates) % totalPlates)}
                className="w-8 h-8 border border-white/15 hover:border-white/40 text-white flex items-center justify-center transition-colors"
                aria-label="Previous curatorial plate"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
              </button>
              <button
                onClick={() => setActivePlateIndex((prev) => (prev + 1) % totalPlates)}
                className="w-8 h-8 border border-white/15 hover:border-white/40 text-white flex items-center justify-center transition-colors"
                aria-label="Next curatorial plate"
              >
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 01. ARCHITECTURAL PRINCIPLES (Interactive Specimen Deck)
          Eradicates all // PROTOCOL code comments, LEDGER_HASH and fake mechanical tags.
          Zero-Pill Discipline throughout.
          ========================================================================= */}
      <section className="py-28 bg-[#121312] border-b border-white/[0.08] text-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#c2623a] mb-2">
                01. Curatorial Framework
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight">
                The Atelier Foundation
              </h2>
            </div>
            <p className="text-sm text-[#a6a49f] font-sans max-w-md leading-relaxed">
              Every system designed to dismantle the 50% gallery intermediary tax, preserve scholarly provenance, and establish a dignified direct acquisition dialogue.
            </p>
          </div>

          {/* Interactive Dual-Column Architecture Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: 3 Architectural Pillars */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {[
                {
                  id: 'commission' as const,
                  tag: 'Direct Studio Sales',
                  icon: 'payments',
                  title: '100% Artist Direct Patronage',
                  desc: 'Retain all proceeds from every piece. Direct bank deposits, automated VAT invoicing, insured delivery logistics, and zero platform rake.',
                  metric: '€0 Platform Rake',
                },
                {
                  id: 'provenance' as const,
                  tag: 'Scholarly Archiving',
                  icon: 'verified',
                  title: 'Archival Provenance Ledger',
                  desc: 'Document firing logs, glaze chemistry mineralogy, raw material quarries, and 300dpi capture under an authenticated catalog citation.',
                  metric: 'Permanent Citation',
                },
                {
                  id: 'pipeline' as const,
                  tag: 'Private Acquisition Desk',
                  icon: 'architecture',
                  title: 'Curatorial Commission Bureau',
                  desc: 'Replace chaotic social media inquiries with a structured consultation desk: spatial dimensions, mounting requirements, and insured crating.',
                  metric: 'Direct Studio Dialogue',
                },
              ].map((pillar) => {
                const isActive = activeSpecimenTab === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActiveSpecimenTab(pillar.id)}
                    className={`text-left p-6 sm:p-7 border transition-all ${
                      isActive
                        ? 'bg-[#171817] border-white/40 shadow-xl'
                        : 'bg-[#121312] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3 text-xs font-mono">
                      <span className="uppercase tracking-widest text-[#c2623a]">
                        {pillar.tag}
                      </span>
                      <span className="text-[#a6a49f]">
                        {pillar.metric}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`material-symbols-outlined text-2xl transition-colors ${
                        isActive ? 'text-[#c2623a]' : 'text-white/60'
                      }`}>
                        {pillar.icon}
                      </span>
                      <h3 className="font-serif text-2xl font-normal text-white">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#a6a49f] font-sans leading-relaxed pl-9">
                      {pillar.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Live Interactive Specimen Display */}
            <div className="lg:col-span-7 bg-[#171817] border border-white/15 p-6 sm:p-10 flex flex-col justify-between shadow-2xl relative">
              {/* SPECIMEN 1: 0% Commerce Calculator */}
              {activeSpecimenTab === 'commission' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#a6a49f]">
                        Interactive Demonstration
                      </span>
                      <h4 className="font-serif text-2xl text-white mt-1">
                        Independent Atelier Return vs. Commercial Gallery
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-[#c2623a]">
                      100% Artist Direct
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#a6a49f] mb-2">
                      <span>Sculpture / Masterwork Valuation</span>
                      <span className="text-base text-white font-semibold">
                        {formatPrice(calcArtworkValue, currency)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={800}
                      max={24000}
                      step={200}
                      value={calcArtworkValue}
                      onChange={(e) => setCalcArtworkValue(Number(e.target.value))}
                      className="w-full accent-[#c2623a] bg-black/60 h-2 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-white/40 mt-1">
                      <span>€800</span>
                      <span>€12,000</span>
                      <span>€24,000</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-[#121312] border border-white/20 p-5 space-y-2">
                      <div className="text-xs font-mono uppercase tracking-widest text-[#c2623a]">
                        Atelier Direct Payout
                      </div>
                      <div className="text-3xl font-serif text-white">
                        {formatPrice(artistAtelierPayout, currency)}
                      </div>
                      <p className="text-xs text-[#a6a49f] font-sans">
                        You retain 100% of the sale. Zero deduction, zero consignment lockups.
                      </p>
                    </div>

                    <div className="bg-[#121312] border border-white/10 p-5 space-y-2 opacity-75">
                      <div className="text-xs font-mono uppercase tracking-widest text-red-400">
                        Traditional Gallery Cut (50%)
                      </div>
                      <div className="text-3xl font-serif text-[#a6a49f] line-through">
                        {formatPrice(galleryFeeCut, currency)} lost
                      </div>
                      <p className="text-xs text-[#a6a49f] font-sans">
                        Intermediaries deduct {formatPrice(galleryFeeCut, currency)} per piece on representation fees.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                    <div className="text-[#a6a49f]">
                      Annual artist surplus across 6 acquisitions:
                      <strong className="text-white ml-2">+{formatPrice(annualSavedWithSixPieces, currency)} retained</strong>
                    </div>
                    <button
                      onClick={openPortfolioModal}
                      className="px-5 py-2.5 border border-[#c2623a] bg-[#c2623a] text-white uppercase tracking-widest text-xs hover:bg-[#d67248] transition-colors whitespace-nowrap"
                    >
                      Establish Your Atelier →
                    </button>
                  </div>
                </div>
              )}

              {/* SPECIMEN 2: Provenance Ledger */}
              {activeSpecimenTab === 'provenance' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#a6a49f]">
                        Scholarly Documentation
                      </span>
                      <h4 className="font-serif text-2xl text-white mt-1">
                        Archival Provenance Ledger Sheet
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-white">
                      ACC. 2024.ER014
                    </span>
                  </div>

                  <div className="bg-[#121312] border border-white/15 p-6 space-y-5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-[#73716b] block">Medium</span>
                        <span className="text-white">Coarse Shigaraki</span>
                      </div>
                      <div>
                        <span className="text-[#73716b] block">Kiln Cycle</span>
                        <span className="text-white">36h Anagama / 1280°C</span>
                      </div>
                      <div>
                        <span className="text-[#73716b] block">Firing Season</span>
                        <span className="text-white">Autumn 2024</span>
                      </div>
                      <div>
                        <span className="text-[#73716b] block">Custody Status</span>
                        <span className="text-emerald-400">Verified Ledger</span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#171817] border border-white/10 text-xs font-mono text-[#c8c5be] space-y-2">
                      <div>
                        <span className="text-[#a6a49f]">Archival Accession Seal:</span>{' '}
                        <span className="text-white">ATL-2024-KYOTO-014</span>
                      </div>
                      <div>
                        <span className="text-[#a6a49f]">Maker's Colophon:</span>{' '}
                        <span className="text-white">Elena Rostova Atelier (Kyoto Studio, Shiga Prefecture)</span>
                      </div>
                      <div>
                        <span className="text-[#a6a49f]">Curatorial Commentary:</span>{' '}
                        <span className="text-white">Unrefined natural feldspar inclusions visible on northern flank.</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 text-xs font-mono text-white/70">
                      <span>Public Monograph Certificate</span>
                      <button
                        onClick={() => handleInspectArtwork('vessel-14')}
                        className="text-[#c2623a] hover:text-white underline"
                      >
                        Inspect Masterwork Record →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SPECIMEN 3: Commission Pipeline */}
              {activeSpecimenTab === 'pipeline' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#a6a49f]">
                        Patron Relationship Desk
                      </span>
                      <h4 className="font-serif text-2xl text-white mt-1">
                        Commission Bureau Workflow
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-amber-300">
                      Milestone 03: In Kiln
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { step: '01', title: 'Scope & Dimension Brief', status: 'Completed', detail: 'H 54cm × W 32cm vessel for Kensington residence', date: 'Sept 14' },
                      { step: '02', title: 'Clay Formulation & Coiling', status: 'Completed', detail: 'Shigaraki refractory clay hand-coiled across 14 days', date: 'Sept 28' },
                      { step: '03', title: 'Wood-Fire Kiln Firing', status: 'Active Stage', detail: 'Reduction atmosphere, pine wood ash accumulation', date: 'Oct 12' },
                      { step: '04', title: 'Archival Crating & Courier', status: 'Upcoming', detail: 'Custom fitted timber box with Japanese silk lining', date: 'Oct 28' },
                    ].map((st) => (
                      <div
                        key={st.step}
                        className={`p-4 border flex items-center justify-between gap-4 text-xs font-mono ${
                          st.status === 'Active Stage'
                            ? 'bg-[#121312] border-white/30 text-white'
                            : st.status === 'Completed'
                            ? 'bg-black/30 border-white/10 text-[#a6a49f]'
                            : 'bg-black/20 border-white/5 text-white/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#c2623a]">{st.step}</span>
                          <div>
                            <div className="text-white font-medium">{st.title}</div>
                            <div className="text-xs text-[#a6a49f] font-sans">{st.detail}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] uppercase tracking-wider block ${
                            st.status === 'Active Stage' ? 'text-amber-300' : 'text-white/60'
                          }`}>
                            {st.status}
                          </span>
                          <span className="text-[10px] text-white/40">{st.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specimen Footer Action */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#a6a49f]">
                <span>Tested across 14 resident ateliers worldwide</span>
                <button
                  onClick={() => navigateTo('pricing')}
                  className="text-white hover:text-[#c2623a] transition-colors underline-offset-4 underline flex items-center gap-1"
                >
                  <span>Atelier Charter & Terms</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FEATURED MONOGRAPH SPOTLIGHT (Maker of the Season)
          Editorial Garamond Elegance, Authentic Curatorial Voice, Zero Pills.
          ========================================================================= */}
      <section className="py-28 bg-[#121312] border-b border-white/[0.08] text-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c2623a]">
                Featured Monograph · Autumn Retrospective
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-white mt-2">
                Maker of the Season
              </h2>
            </div>
            <button
              onClick={() => handleInspectArtist('elena-rostova')}
              className="text-xs font-mono uppercase tracking-widest text-[#a6a49f] hover:text-white flex items-center gap-2 transition-colors"
            >
              <span>Explore Full Elena Rostova Monograph</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center bg-[#171817] border border-white/15 p-6 sm:p-12 shadow-2xl">
            {/* Masterwork Interactive Visual Anchor */}
            <div className="lg:col-span-7 space-y-4">
              <div
                className="aspect-[4/3] bg-black overflow-hidden relative border border-white/15 group cursor-pointer"
                onClick={() => handleInspectArtwork('vessel-14')}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoZl1b3JtNa2NYTQzShBE7TpxNk8vlcxAjFOvygCBXI7gQEdWTrIH-ENm6cXuN5YD7yJ-gXtvEWD32E8Lb-46LKwrEqBigU9XuTm7Zhzlidgr45o94QUPZKhEvV7P2d2bDH5XRAbJRbRPMGE-ntDs4uxaADA9LwtiDcqb4B8GjnLjSlPu6flpRKQQTs_PfODTyTYFr3uSKqQONkBdj-w4a6RppI90v-taOd8xc-FQ5c_HoLTKd8AyO"
                  alt="Vessel No. 14 by Elena Rostova"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88] contrast-[1.05]"
                />

                <div className="absolute top-4 left-4 bg-[#121312]/90 backdrop-blur-md px-3 py-1 text-xs font-mono text-white border border-white/15">
                  ACC. 2024.ER014
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-[#121312]/95 backdrop-blur-md p-4 border border-white/15 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-white font-medium block">Vessel No. 14 (Ash Glaze Study)</span>
                    <span className="text-[#a6a49f]">Coarse Shigaraki Clay · Reduction Basalt</span>
                  </div>
                  <span className="text-white font-semibold text-sm">
                    {formatPrice(480, currency)}
                  </span>
                </div>
              </div>

              {/* Detail Toggles under Artwork */}
              <div className="flex items-center justify-between text-xs font-mono text-[#a6a49f]">
                <span>Natural reduction pine ash over unglazed coarse body</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleInspectArtwork('vessel-14')}
                    className="hover:text-white underline"
                  >
                    Examine Artwork
                  </button>
                  <button
                    onClick={() => {
                      const found = ARTWORKS.find((a) => a.id === 'vessel-14');
                      if (found && onQuickInquire) onQuickInquire(found);
                    }}
                    className="text-[#c2623a] hover:underline"
                  >
                    Acquisition Inquiry
                  </button>
                </div>
              </div>
            </div>

            {/* Curatorial Dossier Column */}
            <div className="lg:col-span-5 space-y-7">
              <div className="flex items-center gap-4">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtJQN5uJT-T09aZOuD0K3MTbiYktbCLAxnkWV3w1MbqZuKiL_QqGmMQmIlfpObqppqLTOIdDVMltppi1S8RxDRN0xdKQRsEfTrzpbmpkkJLV2kcY4XYrYZZVo9r3xaFhGpJ6iENcPoVxs5VUCNi-n5J8mqtHfy77yRz0jjCSUk4CY2l2xAFJX6TtymihhkCSwvSHWY_I96coK1_67w0_3SaL7lsFblbu1dYth_OHr7AzgjcfKCbm8p"
                  alt="Elena Rostova"
                  className="w-16 h-16 object-cover border border-white/20"
                />
                <div>
                  <h3 className="font-serif text-3xl font-medium text-white">
                    Elena Rostova
                  </h3>
                  <p className="text-xs text-[#a6a49f] font-mono mt-0.5">
                    Kyoto & London · 19 Works in Monograph
                  </p>
                </div>
              </div>

              {/* Pull quote with delicate top/bottom hairline borders (No thick left accent border) */}
              <blockquote className="py-4 border-y border-white/10 font-serif italic text-2xl text-[#dedbd4] leading-snug">
                “Exploring the quiet impermanence of unglazed clay, coarse grain, and raw architectural monoliths.”
              </blockquote>

              <p className="text-sm text-[#a6a49f] leading-relaxed font-sans">
                Working between dual ateliers in Kyoto and London, Rostova examines the tension between disciplined minimalist form and elemental chaos. Utilizing unrefined stoneware mined from Shigaraki and hand-coiled firing inside reduction kilns, every vessel acts as a quiet reliquary for shadow, ash, and touch.
              </p>

              {/* Soundscape player */}
              <div className="bg-[#121312] border border-white/10 p-3.5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudioNotes(!isPlayingAudioNotes)}
                    aria-label="Toggle atelier soundscape"
                    className="w-8 h-8 border border-white/20 hover:border-white text-white flex items-center justify-center transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isPlayingAudioNotes ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <div>
                    <span className="text-white block font-medium">Studio Notes: Anagama Kiln Atmosphere</span>
                    <span className="text-[11px] text-[#73716b]">Shigaraki Forest Studio · 0:42</span>
                  </div>
                </div>
              </div>

              {/* Provenance unboxed text (Zero-pill) */}
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#73716b] block mb-1.5">
                  Exhibition Provenance:
                </span>
                <p className="text-xs font-mono text-[#a6a49f]">
                  Venice Biennale Collateral (2023) · London Craft Week (2024) · MOMAT Tokyo Archival Loan
                </p>
              </div>

              {/* Direct Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleInspectArtist('elena-rostova')}
                  className="px-6 py-3.5 border border-[#c2623a] bg-[#c2623a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#d67248] transition-colors"
                >
                  View Monograph (19 Works)
                </button>
                <button
                  onClick={() => handleInspectArtwork('vessel-14')}
                  className="px-6 py-3.5 border border-white/20 text-white text-xs font-mono uppercase tracking-widest hover:border-white transition-colors"
                >
                  Inspect Vessel No. 14
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: DIRECTORY OF RESIDENT MASTERS
          Clean directory with unboxed metadata and zero pills.
          ========================================================================= */}
      <section className="py-28 bg-[#121312] border-b border-white/[0.08] text-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c2623a]">
                Directory of Resident Masters
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-white mt-2">
                Resident Ateliers
              </h2>
            </div>

            {/* Discipline Filter (clean segmented buttons, not pills) */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                'All Masters',
                'Ceramics',
                'Paintings',
                'Textiles',
                'Woodcraft',
              ].map((med) => (
                <button
                  key={med}
                  onClick={() => setActiveResidentMedium(med)}
                  className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-colors border ${
                    activeResidentMedium === med
                      ? 'bg-white text-[#121312] border-white font-medium'
                      : 'bg-[#171817] text-[#a6a49f] border-white/10 hover:border-white/30'
                  }`}
                >
                  {med}
                </button>
              ))}
            </div>
          </div>

          {/* 1. Monumental Premier Atelier Showcase */}
          {filteredResidents[0] && (
            <div className="border border-white/[0.08] bg-[#171817] p-6 sm:p-10 shadow-2xl mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div
                  className="lg:col-span-8 aspect-[16/10] bg-[#121312] overflow-hidden relative cursor-pointer border border-white/[0.08] group"
                  onClick={() => handleInspectArtist(filteredResidents[0].id)}
                >
                  <img
                    src={filteredResidents[0].heroImageUrl || filteredResidents[0].avatarUrl}
                    alt={filteredResidents[0].name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88] contrast-[1.08]"
                  />
                  <div className="absolute top-4 left-4 bg-[#121312]/90 backdrop-blur-md px-3 py-1 text-xs font-mono text-white border border-white/[0.08]">
                    Master Monograph 01 · {filteredResidents[0].discipline}
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#a6a49f]">
                      @{filteredResidents[0].handle || filteredResidents[0].id.replace('-rostova', '').replace('-vane', '')}
                    </span>
                    <span className="text-[#73716b]">
                      {filteredResidents[0].location}
                    </span>
                  </div>

                  <div>
                    <h3
                      onClick={() => handleInspectArtist(filteredResidents[0].id)}
                      className="font-serif text-3xl sm:text-4xl font-normal text-white hover:underline cursor-pointer"
                    >
                      {filteredResidents[0].name}
                    </h3>
                    <p className="text-xs font-mono text-[#a6a49f] mt-1">{filteredResidents[0].medium}</p>
                  </div>

                  <blockquote className="font-serif italic text-base text-[#fbf9f6] border-y border-white/10 py-3 my-2 leading-relaxed">
                    "{filteredResidents[0].quote}"
                  </blockquote>

                  <p className="text-xs text-[#a6a49f] leading-relaxed font-sans">
                    {filteredResidents[0].bio}
                  </p>

                  <div className="p-4 bg-[#121312] border border-white/[0.08] space-y-2 text-xs font-mono text-[#c8c5be]">
                    <div className="flex justify-between">
                      <span className="text-[#73716b]">Studio Status:</span>
                      <span className="text-white">Active Production</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#73716b]">Direct Inquiries:</span>
                      <span className="text-emerald-400">0% Commission Direct</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#73716b]">Monograph Works:</span>
                      <span className="text-white">{filteredResidents[0].artworksCount || 12} Specimens</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleInspectArtist(filteredResidents[0].id)}
                      className="w-full sm:w-auto px-7 py-3 border border-white/20 text-white text-xs font-mono uppercase tracking-widest hover:border-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Enter Master Monograph</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Asymmetric Diptych Atelier Comparison (60/40 Split) */}
          {filteredResidents[1] && filteredResidents[2] && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
              {/* Studio One: 7 cols */}
              <div
                className="lg:col-span-7 bg-[#171817] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-xl cursor-pointer group"
                onClick={() => handleInspectArtist(filteredResidents[1].id)}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#a6a49f]">
                    <span>Atelier Study II · {filteredResidents[1].discipline}</span>
                    <span>{filteredResidents[1].location}</span>
                  </div>
                  <div className="aspect-[16/10] bg-[#121312] overflow-hidden relative border border-white/[0.08] mb-6">
                    <img
                      src={filteredResidents[1].heroImageUrl || filteredResidents[1].avatarUrl}
                      alt={filteredResidents[1].name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.88]"
                    />
                  </div>
                  <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white group-hover:underline">
                    {filteredResidents[1].name}
                  </h4>
                  <p className="text-xs font-mono text-[#a6a49f] mt-1">{filteredResidents[1].medium}</p>
                  <p className="text-xs text-[#a6a49f] font-sans mt-3 line-clamp-2 leading-relaxed">
                    {filteredResidents[1].bio}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#73716b]">{filteredResidents[1].artworksCount || 10} Works Catalogued</span>
                  <span className="text-white group-hover:underline flex items-center gap-1">
                    <span>Enter Monograph</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>

              {/* Studio Two: 5 cols */}
              <div
                className="lg:col-span-5 bg-[#171817] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-xl cursor-pointer group"
                onClick={() => handleInspectArtist(filteredResidents[2].id)}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#a6a49f]">
                    <span>Atelier Study III · {filteredResidents[2].discipline}</span>
                    <span>{filteredResidents[2].location}</span>
                  </div>
                  <div className="aspect-square bg-[#121312] overflow-hidden relative border border-white/[0.08] mb-6">
                    <img
                      src={filteredResidents[2].heroImageUrl || filteredResidents[2].avatarUrl}
                      alt={filteredResidents[2].name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.88]"
                    />
                  </div>
                  <h4 className="font-serif text-2xl font-normal text-white group-hover:underline">
                    {filteredResidents[2].name}
                  </h4>
                  <p className="text-xs font-mono text-[#a6a49f] mt-1">{filteredResidents[2].medium}</p>
                  <p className="text-xs text-[#a6a49f] font-sans mt-3 line-clamp-2 leading-relaxed">
                    {filteredResidents[2].bio}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#73716b]">{filteredResidents[2].artworksCount || 8} Works Catalogued</span>
                  <span className="text-white group-hover:underline flex items-center gap-1">
                    <span>Enter Monograph</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Directory Accession Ledger for Further Masters */}
          {filteredResidents.slice(3).length > 0 && (
            <div className="bg-[#171817] border border-white/[0.08] overflow-hidden shadow-2xl mb-12">
              <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-white">
                  Roster Accession Ledger · Resident Masters Directory
                </span>
                <span className="text-xs font-mono text-[#73716b]">
                  {filteredResidents.slice(3).length} Masters Catalogued
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#121312] text-[#73716b] border-b border-white/[0.08] uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Ref</th>
                      <th className="py-3 px-4">Master & Atelier</th>
                      <th className="py-3 px-4">Discipline & Medium</th>
                      <th className="py-3 px-4 hidden md:table-cell">Studio Location</th>
                      <th className="py-3 px-4">Catalogued</th>
                      <th className="py-3 px-4 text-right">Monograph</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {filteredResidents.slice(3).map((c, idx) => (
                      <tr
                        key={c.id}
                        onClick={() => handleInspectArtist(c.id)}
                        className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                      >
                        <td className="py-3.5 px-4 text-[#73716b]">
                          {(idx + 4).toString().padStart(3, '0')}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={c.avatarUrl}
                              alt={c.name}
                              className="w-10 h-10 object-cover border border-white/[0.08] bg-[#121312]"
                            />
                            <div>
                              <span className="font-serif text-sm text-white group-hover:underline block font-normal">
                                {c.name}
                              </span>
                              <span className="text-[11px] text-[#73716b]">@{c.handle || c.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#a6a49f]">
                          {c.medium}
                        </td>
                        <td className="py-3.5 px-4 text-[#73716b] hidden md:table-cell">
                          {c.location}
                        </td>
                        <td className="py-3.5 px-4 text-white">
                          {c.artworksCount || 10} Pieces
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="text-white group-hover:underline">
                            Enter →
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <button
              onClick={() => navigateTo('artist')}
              className="px-8 py-3.5 border border-white/20 text-white text-xs font-mono uppercase tracking-widest hover:border-white hover:bg-white/5 transition-all"
            >
              Browse Full Roster of Independent Masters →
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: SALON & MONOGRAPH PACING (Breaking Card-Grid Monotony)
          Alternating visual weights:
          1. Monumental full-width exhibition plate
          2. Asymmetric paired studies
          3. Accession ledger table with metric specs
          ========================================================================= */}
      <section className="py-28 bg-[#121312] border-b border-white/[0.08] text-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c2623a]">
                Exhibition Salon & Monograph Pacing
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-white mt-2">
                Recent Acquisitions & Studio Works
              </h2>
            </div>
            <p className="text-xs font-mono text-[#a6a49f]">
              Alternating exhibition scale: monumental plates, paired studies, and accession tables.
            </p>
          </div>

          {/* 1. Monumental Full-Width Exhibition Plate */}
          <div className="border border-white/15 bg-[#171817] p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div
                className="lg:col-span-8 aspect-[16/10] bg-black overflow-hidden relative cursor-pointer border border-white/10 group"
                onClick={() => handleInspectArtwork(monumentalArtwork.id)}
              >
                <img
                  src={monumentalArtwork.imageUrl}
                  alt={monumentalArtwork.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.88] contrast-[1.08]"
                />
                <div className="absolute top-4 left-4 bg-[#121312]/90 backdrop-blur-md px-3 py-1 text-xs font-mono text-white border border-white/15">
                  Plate 01 · Monumental Scale
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="text-xs font-mono text-[#c2623a] uppercase tracking-widest">
                  Featured Masterwork
                </div>

                <div>
                  <h3
                    onClick={() => handleInspectArtwork(monumentalArtwork.id)}
                    className="font-serif text-3xl sm:text-4xl font-normal text-white hover:underline cursor-pointer"
                  >
                    {monumentalArtwork.title}
                  </h3>
                  <button
                    onClick={() => handleInspectArtist(monumentalArtwork.artistId)}
                    className="text-xs font-mono text-[#a6a49f] hover:text-white block mt-1"
                  >
                    By {monumentalArtwork.artistName} ({monumentalArtwork.artistLocation})
                  </button>
                </div>

                <p className="text-sm text-[#a6a49f] font-sans leading-relaxed">
                  {monumentalArtwork.curatorialStatement || monumentalArtwork.bodyDescription}
                </p>

                <div className="p-4 bg-[#121312] border border-white/10 space-y-2 text-xs font-mono text-[#c8c5be]">
                  <div className="flex justify-between">
                    <span className="text-[#73716b]">Medium:</span>
                    <span className="text-white">{monumentalArtwork.medium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#73716b]">Dimensions:</span>
                    <span className="text-white">{monumentalArtwork.dimensions || '240 × 180 cm'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#73716b]">Provenance:</span>
                    <span className="text-white">Studio Direct · Milan</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-semibold">
                    <span className="text-white">Valuation:</span>
                    <span className="text-[#c2623a]">{formatPrice(monumentalArtwork.price, currency)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => onQuickInquire && onQuickInquire(monumentalArtwork)}
                    className="px-6 py-3 border border-[#c2623a] bg-[#c2623a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#d67248] transition-colors"
                  >
                    Acquisition Dossier
                  </button>
                  <button
                    onClick={() => handleInspectArtwork(monumentalArtwork.id)}
                    className="px-6 py-3 border border-white/20 text-white text-xs font-mono uppercase tracking-widest hover:border-white transition-colors"
                  >
                    Inspect Plate
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Asymmetric Paired Studies (60/40 Split) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Study One: 7 cols */}
            <div
              className="lg:col-span-7 bg-[#171817] border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-xl cursor-pointer group"
              onClick={() => handleInspectArtwork(studyArtworkOne.id)}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#a6a49f]">
                  <span>Study II · Architectural Tapestry</span>
                  <span>{studyArtworkOne.dimensions || '180 × 90 cm'}</span>
                </div>
                <div className="aspect-[16/10] bg-black overflow-hidden relative border border-white/10 mb-6">
                  <img
                    src={studyArtworkOne.imageUrl}
                    alt={studyArtworkOne.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.88]"
                  />
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white group-hover:underline">
                  {studyArtworkOne.title}
                </h4>
                <p className="text-xs font-mono text-[#c2623a] mt-1">{studyArtworkOne.artistName}</p>
                <p className="text-xs text-[#a6a49f] font-sans mt-2 line-clamp-2">
                  {studyArtworkOne.curatorialStatement || studyArtworkOne.bodyDescription}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white font-semibold">
                  {formatPrice(studyArtworkOne.price, currency)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onQuickInquire) onQuickInquire(studyArtworkOne);
                  }}
                  className="text-[#c2623a] hover:underline"
                >
                  Acquisition Inquiry →
                </button>
              </div>
            </div>

            {/* Study Two: 5 cols */}
            <div
              className="lg:col-span-5 bg-[#171817] border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-xl cursor-pointer group"
              onClick={() => handleInspectArtwork(studyArtworkTwo.id)}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#a6a49f]">
                  <span>Study III · Sculptural Woodcraft</span>
                  <span>{studyArtworkTwo.dimensions || '52 × 38 cm'}</span>
                </div>
                <div className="aspect-square bg-black overflow-hidden relative border border-white/10 mb-6">
                  <img
                    src={studyArtworkTwo.imageUrl}
                    alt={studyArtworkTwo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.88]"
                  />
                </div>
                <h4 className="font-serif text-2xl font-normal text-white group-hover:underline">
                  {studyArtworkTwo.title}
                </h4>
                <p className="text-xs font-mono text-[#c2623a] mt-1">{studyArtworkTwo.artistName}</p>
                <p className="text-xs text-[#a6a49f] font-sans mt-2 line-clamp-2">
                  {studyArtworkTwo.curatorialStatement || studyArtworkTwo.bodyDescription}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white font-semibold">
                  {formatPrice(studyArtworkTwo.price, currency)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onQuickInquire) onQuickInquire(studyArtworkTwo);
                  }}
                  className="text-[#c2623a] hover:underline"
                >
                  Acquisition Inquiry →
                </button>
              </div>
            </div>
          </div>

          {/* 3. Accession Table with Metric Specs */}
          <div className="bg-[#171817] border border-white/15 overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-white">
                Accession Ledger · Additional Studio Works
              </span>
              <button
                onClick={() => navigateTo('discover')}
                className="text-xs font-mono text-[#c2623a] hover:underline flex items-center gap-1"
              >
                <span>View Complete Discovery Index</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#121312] text-[#73716b] border-b border-white/10 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Ref</th>
                    <th className="py-3 px-4">Masterwork</th>
                    <th className="py-3 px-4">Artist / Location</th>
                    <th className="py-3 px-4 hidden md:table-cell">Dimensions</th>
                    <th className="py-3 px-4">Valuation</th>
                    <th className="py-3 px-4 text-right">Inquiry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {ledgerArtworks.map((art, idx) => (
                    <tr
                      key={art.id}
                      onClick={() => handleInspectArtwork(art.id)}
                      className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 text-[#73716b]">
                        ACC.{art.year}.0{idx + 5}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-serif text-sm text-white font-normal group-hover:underline">
                          {art.title}
                        </div>
                        <div className="text-[11px] text-[#a6a49f] truncate max-w-xs">{art.medium}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-white">{art.artistName}</div>
                        <div className="text-[11px] text-[#73716b]">{art.artistLocation}</div>
                      </td>
                      <td className="py-3.5 px-4 hidden md:table-cell text-[#a6a49f]">
                        {art.dimensions || 'Archival Specs'}
                      </td>
                      <td className="py-3.5 px-4 text-white font-semibold">
                        {formatPrice(art.price, currency)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onQuickInquire) onQuickInquire(art);
                          }}
                          className="text-[#c2623a] hover:text-white underline text-[11px] uppercase tracking-wider"
                        >
                          Inquire
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CURATED THEMATIC ANTHOLOGIES
          ========================================================================= */}
      <section className="py-28 bg-[#121312] border-b border-white/[0.08] text-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c2623a]">
                Curatorial Viewing Rooms
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-white mt-2">
                Thematic Anthologies
              </h2>
            </div>
            <p className="text-xs font-mono text-[#a6a49f]">
              Cross-disciplinary investigations curated across the global ateliers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {THEMATIC_COLLECTIONS.map((col) => (
              <div
                key={col.id}
                onClick={() => navigateTo('discover')}
                className="group relative aspect-[3/4] bg-black overflow-hidden cursor-pointer border border-white/15 hover:border-white/40 transition-all shadow-2xl"
              >
                <img
                  src={col.imageUrl}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.75] contrast-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-xs font-mono tracking-widest uppercase text-[#c2623a] block">
                    {col.worksCount} Works Catalogued
                  </span>
                  <h3 className="font-serif text-2xl font-normal leading-snug group-hover:underline">
                    {col.title}
                  </h3>
                  <div className="pt-2 text-xs font-mono text-[#a6a49f] flex items-center gap-1 group-hover:text-white">
                    <span>Enter Exhibition Room</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: DISPATCHES ON MATERIALITY — ATELIER JOURNAL
          ========================================================================= */}
      <section className="py-28 bg-[#121312] border-b border-white/[0.08] text-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between mb-16 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c2623a]">
                Scholarly Monograph Essays
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-white mt-2">
                Dispatches on Materiality
              </h2>
            </div>
            <button
              onClick={() => navigateTo('journal')}
              className="text-xs font-mono uppercase tracking-widest text-[#a6a49f] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>All Dispatches</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {JOURNAL_ARTICLES.slice(0, 3).map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  if (onSelectJournal) {
                    onSelectJournal(article.id);
                  } else {
                    navigateTo('journal-essay');
                  }
                }}
                className="group cursor-pointer flex flex-col border border-white/15 p-6 bg-[#171817] hover:border-white/40 transition-all shadow-xl"
              >
                <div className="aspect-[16/10] bg-black overflow-hidden mb-6 border border-white/10">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[0.85]"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#a6a49f] mb-3">
                  <span className="text-[#c2623a] font-semibold">{article.dispatchNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.category}</span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-white group-hover:underline leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#a6a49f] mt-3 line-clamp-3 leading-relaxed flex-1 font-sans">
                  {article.excerpt}
                </p>

                <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs font-mono text-[#73716b]">
                  <span>By {article.author}</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: INSTITUTIONAL PROVENANCE & QUANTITATIVE TRUST
          ========================================================================= */}
      <section className="py-24 bg-[#121312] border-b border-white/[0.08] text-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pb-12 border-b border-white/10 text-center sm:text-left">
            <div>
              <div className="font-serif text-4xl sm:text-5xl text-white font-normal tabular-nums">100%</div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#c2623a] mt-1">Direct Proceeds</div>
              <p className="text-xs text-[#a6a49f] mt-1">Direct to artist accounts</p>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl text-white font-normal tabular-nums">0%</div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#c2623a] mt-1">Platform Cut</div>
              <p className="text-xs text-[#a6a49f] mt-1">Zero intermediary tax</p>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl text-white font-normal tabular-nums">€1.42M</div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#c2623a] mt-1">Acquisitions</div>
              <p className="text-xs text-[#a6a49f] mt-1">Facilitated globally</p>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl text-white font-normal tabular-nums">18</div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#c2623a] mt-1">Biennial Loans</div>
              <p className="text-xs text-[#a6a49f] mt-1">Institutional records</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Atelier has completely replaced traditional gallery back-and-forth for our acquisition committee. The provenance records and direct communication with artists are second to none.",
                author: "Dr. Henriette Laurent",
                role: "Chief Curator, Fondation des Arts Contemporains, Zurich",
              },
              {
                quote: "Commissioning bespoke monolithic pieces for private residences used to take months of opaque gallery negotiations. Through Atelier, we work directly with Soren and Elena with complete pricing transparency.",
                author: "Matteo Rossi",
                role: "Architectural Director, Studio Rossi Milan",
              },
              {
                quote: "The archival resolution and technical kiln notes provide a degree of scholarly rigor rarely seen in contemporary digital platforms.",
                author: "Sora Kim",
                role: "Senior Curator, National Crafts Collection, Seoul",
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-[#171817] border border-white/10 p-6 sm:p-8 space-y-4 flex flex-col justify-between"
              >
                <div className="text-[#c2623a] text-2xl font-serif">“</div>
                <p className="font-serif text-base sm:text-lg text-[#dedbd4] italic leading-relaxed flex-1">
                  {t.quote}
                </p>
                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs font-mono text-white font-semibold">{t.author}</div>
                  <div className="text-xs font-mono text-[#a6a49f]">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: SOVEREIGN ATELIER MONOGRAPH (Closing Onboarding Sanctuary)
          ========================================================================= */}
      <section className="py-32 bg-[#121312] text-white relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-xs font-mono uppercase tracking-widest text-[#c2623a]">
              Direct Studio Sovereign Identity
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.02] tracking-tight">
              The digital space your craft has always deserved.
            </h2>

            <p className="text-base sm:text-xl text-[#a6a49f] font-sans leading-relaxed max-w-2xl mx-auto">
              Galleries take 50%. Social feeds compress detail. Atelier offers archival resolution, scholarly curatorial context, and structured commission workflows where 100% of proceeds go directly to you.
            </p>

            {/* Handle Reservation Form (Zero-Pill Architecture) */}
            <div className="pt-2 max-w-lg mx-auto">
              <form
                onSubmit={handleClaimSubmit}
                className="bg-[#171817] p-3 border border-white/20 shadow-2xl transition-all hover:border-white/40"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex items-center bg-[#121312] border border-white/15 px-3 py-3">
                    <span className="font-mono text-[#73716b] text-xs select-none">
                      atelier.app/@
                    </span>
                    <input
                      type="text"
                      value={handleInput}
                      onChange={(e) => setHandleInput(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                      placeholder="yourname"
                      aria-label="Claim your artist handle"
                      className="w-full bg-transparent px-2 text-sm text-white placeholder-white/30 focus:outline-none font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={handleSubmitted}
                    className="px-6 py-3.5 border border-[#c2623a] bg-[#c2623a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#d67248] transition-all whitespace-nowrap"
                  >
                    {handleSubmitted ? 'Establishing...' : 'Establish Monograph →'}
                  </button>
                </div>
              </form>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#73716b]">
              <span>Direct Studio Onboarding</span>
              <span aria-hidden="true">·</span>
              <span>0% Platform Commission</span>
              <span aria-hidden="true">·</span>
              <span>Permanent Archival Provenance</span>
              <span aria-hidden="true">·</span>
              <span>Museum-Grade 300DPI Resolution</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
