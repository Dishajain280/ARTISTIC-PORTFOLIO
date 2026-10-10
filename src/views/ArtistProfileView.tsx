import React, { useState } from 'react';
import { ARTISTS, ARTWORKS } from '../data/mockData';
import { Artwork, Currency, ViewMode } from '../types';
import { formatPrice } from '../utils/formatters';

interface ArtistProfileViewProps {
  artistId?: string;
  onSelectArtist: (id: string) => void;
  onSelectArtwork: (id: string) => void;
  onNavigate: (view: ViewMode) => void;
  currency: Currency;
  onQuickInquire: (artwork: Artwork) => void;
}

type TabType = 'works' | 'process' | 'exhibitions';
type WorksLayout = 'salon' | 'grid';

export const ArtistProfileView: React.FC<ArtistProfileViewProps> = ({
  artistId,
  onSelectArtist,
  onSelectArtwork,
  currency,
  onQuickInquire,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('works');
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'available'>('all');
  const [worksLayout, setWorksLayout] = useState<WorksLayout>('salon');

  // If no artistId provided or artist not found, default to Elena Rostova
  const artist = ARTISTS.find((a) => a.id === artistId) || ARTISTS[0];

  const artistWorks = ARTWORKS.filter((a) => a.artistId === artist.id);
  const displayedWorks =
    filterAvailability === 'available'
      ? artistWorks.filter((a) => a.status === 'available')
      : artistWorks;

  const signaturePiece = displayedWorks[0] || artistWorks[0];
  const studyOne = displayedWorks[1];
  const studyTwo = displayedWorks[2];
  const inventoryWorks = displayedWorks.slice(3);

  return (
    <div className="min-h-screen bg-[#121312] text-[#fbf9f6] pt-24 pb-24 selection:bg-[#c2623a] selection:text-white">
      {/* Top Artist Selector Switcher */}
      <div className="bg-[#171817] border-b border-white/[0.08] py-3">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between gap-4 overflow-x-auto">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#a6a49f] whitespace-nowrap">
            Monograph Index:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {ARTISTS.map((a) => (
              <button
                key={a.id}
                onClick={() => onSelectArtist(a.id)}
                className={`px-3 py-1 text-xs font-mono tracking-wider whitespace-nowrap transition-colors border ${
                  a.id === artist.id
                    ? 'bg-white text-[#121312] border-white font-medium'
                    : 'bg-[#121312] text-[#a6a49f] border-white/[0.08] hover:border-white/30 hover:text-white'
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Monograph Header */}
      <section className="border-b border-white/[0.08] bg-[#121312] py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Portrait / Atelier Image */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] bg-[#121312] overflow-hidden border border-white/[0.08] shadow-2xl">
                <img
                  src={artist.heroImageUrl || artist.avatarUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#171817] border border-white/[0.08] p-4 shadow-xl hidden sm:block">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#a6a49f]">
                  Active Atelier
                </p>
                <p className="font-serif text-sm font-medium text-[#fbf9f6]">
                  {artist.location}
                </p>
              </div>
            </div>

            {/* Monograph Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-mono uppercase tracking-widest text-[#a6a49f]">
                Monograph Dossier #{artist.id.toUpperCase()} · Verified Provenance
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#fbf9f6] tracking-tight">
                {artist.name}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-[#a6a49f]">
                <span>
                  <strong className="text-white">Medium:</strong> {artist.medium}
                </span>
                <span>
                  <strong className="text-white">Studio:</strong> {artist.location}
                </span>
                <span>
                  <strong className="text-white">Representation:</strong> {artist.galleryRepresentation}
                </span>
              </div>

              <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#fbf9f6] leading-snug border-y border-white/10 py-4 my-2">
                "{artist.quote}"
              </blockquote>

              <p className="text-sm sm:text-base text-[#a6a49f] leading-relaxed max-w-2xl font-sans">
                {artist.bio}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.08] max-w-lg">
                <div>
                  <span className="text-3xl font-serif text-white block">
                    {artist.artworksCount}
                  </span>
                  <span className="text-[11px] font-mono text-[#73716b] uppercase">
                    Catalogued Works
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-serif text-white block">
                    {artist.availablePiecesCount}
                  </span>
                  <span className="text-[11px] font-mono text-[#73716b] uppercase">
                    Available Pieces
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-serif text-white block">
                    {artist.exhibitions.length}
                  </span>
                  <span className="text-[11px] font-mono text-[#73716b] uppercase">
                    Biennale / Solos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="border-b border-white/[0.08] sticky top-20 z-30 bg-[#121312]/95 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('works')}
              className={`py-4 text-xs font-mono uppercase tracking-widest transition-colors border-b-2 ${
                activeTab === 'works'
                  ? 'border-white text-white font-medium'
                  : 'border-transparent text-[#73716b] hover:text-white'
              }`}
            >
              Selected Works ({artistWorks.length})
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`py-4 text-xs font-mono uppercase tracking-widest transition-colors border-b-2 ${
                activeTab === 'process'
                  ? 'border-white text-white font-medium'
                  : 'border-transparent text-[#73716b] hover:text-white'
              }`}
            >
              Studio Practice & Materials
            </button>
            <button
              onClick={() => setActiveTab('exhibitions')}
              className={`py-4 text-xs font-mono uppercase tracking-widest transition-colors border-b-2 ${
                activeTab === 'exhibitions'
                  ? 'border-white text-white font-medium'
                  : 'border-transparent text-[#73716b] hover:text-white'
              }`}
            >
              Exhibitions & Pedigree
            </button>
          </div>

          {activeTab === 'works' && (
            <div className="hidden sm:flex items-center gap-3">
              {/* Availability Filter */}
              <div className="flex items-center border border-white/[0.08] bg-[#171817] p-0.5">
                <button
                  onClick={() => setFilterAvailability('all')}
                  className={`px-3 py-1 text-xs font-mono transition-colors ${
                    filterAvailability === 'all'
                      ? 'bg-white/15 text-white font-medium'
                      : 'text-[#73716b] hover:text-white'
                  }`}
                >
                  All Works
                </button>
                <button
                  onClick={() => setFilterAvailability('available')}
                  className={`px-3 py-1 text-xs font-mono transition-colors ${
                    filterAvailability === 'available'
                      ? 'bg-white/15 text-white font-medium'
                      : 'text-[#73716b] hover:text-white'
                  }`}
                >
                  Available
                </button>
              </div>

              {/* Layout Switcher */}
              <div className="flex items-center border border-white/[0.08] bg-[#171817] p-0.5">
                <button
                  onClick={() => setWorksLayout('salon')}
                  className={`p-1.5 transition-colors ${
                    worksLayout === 'salon' ? 'bg-white/15 text-white' : 'text-[#73716b] hover:text-white'
                  }`}
                  title="Salon Exhibition Pacing"
                >
                  <span className="material-symbols-outlined text-sm">view_quilt</span>
                </button>
                <button
                  onClick={() => setWorksLayout('grid')}
                  className={`p-1.5 transition-colors ${
                    worksLayout === 'grid' ? 'bg-white/15 text-white' : 'text-[#73716b] hover:text-white'
                  }`}
                  title="Specimen Grid"
                >
                  <span className="material-symbols-outlined text-sm">apps</span>
                </button>
              </div>
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
              <div className="py-20 text-center text-[#a6a49f] border border-dashed border-white/[0.08] bg-[#171817] p-8">
                <p className="font-serif text-xl text-[#fbf9f6]">All pieces in this series are currently acquired or on museum loan.</p>
                <button
                  onClick={() => setFilterAvailability('all')}
                  className="mt-4 px-6 py-2.5 bg-white text-[#121312] text-xs font-mono uppercase tracking-wider hover:bg-[#eae8e4] transition-colors"
                >
                  View Archive
                </button>
              </div>
            ) : worksLayout === 'salon' ? (
              /* =============================================================
                 SALON & MONOGRAPH PACING:
                 1. Monumental masterwork plate
                 2. Asymmetric paired studies (diptych split)
                 3. Specimen inventory table
                 ============================================================= */
              <div className="space-y-16">
                {/* 1. Signature Monumental Plate */}
                {signaturePiece && (
                  <div className="border border-white/[0.08] bg-[#171817] p-6 sm:p-10 shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      <div
                        className="lg:col-span-8 aspect-[16/10] bg-[#121312] overflow-hidden relative cursor-pointer border border-white/[0.08] group"
                        onClick={() => onSelectArtwork(signaturePiece.id)}
                      >
                        <img
                          src={signaturePiece.imageUrl}
                          alt={signaturePiece.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.88] contrast-[1.08]"
                        />
                        <div className="absolute top-4 left-4 bg-[#121312]/90 backdrop-blur-md px-3 py-1 text-xs font-mono text-white border border-white/[0.08]">
                          Signature Specimen · Series Flagship
                        </div>
                      </div>

                      <div className="lg:col-span-4 space-y-6">
                        <div className="text-xs font-mono text-[#a6a49f] uppercase tracking-widest">
                          Masterwork Plate
                        </div>

                        <div>
                          <h3
                            onClick={() => onSelectArtwork(signaturePiece.id)}
                            className="font-serif text-3xl sm:text-4xl font-normal text-white hover:underline cursor-pointer"
                          >
                            {signaturePiece.title}
                          </h3>
                          <span className="text-xs font-mono text-[#73716b] block mt-1">
                            {signaturePiece.year} · {artist.location}
                          </span>
                        </div>

                        <p className="text-sm text-[#a6a49f] font-sans leading-relaxed">
                          {signaturePiece.curatorialStatement || signaturePiece.bodyDescription || artist.quote}
                        </p>

                        <div className="p-4 bg-[#121312] border border-white/[0.08] space-y-2 text-xs font-mono text-[#c8c5be]">
                          <div className="flex justify-between">
                            <span className="text-[#73716b]">Medium:</span>
                            <span className="text-white">{signaturePiece.medium}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#73716b]">Dimensions:</span>
                            <span className="text-white">{signaturePiece.dimensions || 'Archival record'}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-white/[0.08] text-sm font-semibold">
                            <span className="text-white">Valuation:</span>
                            <span className="text-white">{formatPrice(signaturePiece.price, currency)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                          {signaturePiece.status === 'available' ? (
                            <button
                              onClick={() => onQuickInquire(signaturePiece)}
                              className="px-6 py-3 border border-[#c2623a] bg-[#c2623a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#d67248] transition-colors"
                            >
                              Acquisition Dossier
                            </button>
                          ) : (
                            <span className="px-4 py-2 border border-white/[0.08] text-xs font-mono text-[#73716b] uppercase">
                              Private Collection
                            </span>
                          )}
                          <button
                            onClick={() => onSelectArtwork(signaturePiece.id)}
                            className="px-6 py-3 border border-white/20 text-white text-xs font-mono uppercase tracking-widest hover:border-white transition-colors"
                          >
                            Inspect Specimen
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Asymmetric Paired Studies */}
                {studyOne && studyTwo && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div
                      className="lg:col-span-7 bg-[#171817] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-xl cursor-pointer group"
                      onClick={() => onSelectArtwork(studyOne.id)}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#a6a49f]">
                          <span>Study II · {studyOne.mediumCategory}</span>
                          <span>{studyOne.dimensions}</span>
                        </div>
                        <div className="aspect-[16/10] bg-[#121312] overflow-hidden relative border border-white/[0.08] mb-6">
                          <img
                            src={studyOne.imageUrl}
                            alt={studyOne.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.88]"
                          />
                        </div>
                        <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white group-hover:underline">
                          {studyOne.title}
                        </h4>
                        <p className="text-xs text-[#a6a49f] font-sans mt-2 line-clamp-2">
                          {studyOne.curatorialStatement || studyOne.bodyDescription}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                        <span className="text-white font-semibold">
                          {formatPrice(studyOne.price, currency)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuickInquire(studyOne);
                          }}
                          className="text-white/80 hover:text-white underline"
                        >
                          Acquisition Inquiry →
                        </button>
                      </div>
                    </div>

                    <div
                      className="lg:col-span-5 bg-[#171817] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-xl cursor-pointer group"
                      onClick={() => onSelectArtwork(studyTwo.id)}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#a6a49f]">
                          <span>Study III · {studyTwo.mediumCategory}</span>
                          <span>{studyTwo.dimensions}</span>
                        </div>
                        <div className="aspect-square bg-[#121312] overflow-hidden relative border border-white/[0.08] mb-6">
                          <img
                            src={studyTwo.imageUrl}
                            alt={studyTwo.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.88]"
                          />
                        </div>
                        <h4 className="font-serif text-2xl font-normal text-white group-hover:underline">
                          {studyTwo.title}
                        </h4>
                        <p className="text-xs text-[#a6a49f] font-sans mt-2 line-clamp-2">
                          {studyTwo.curatorialStatement || studyTwo.bodyDescription}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                        <span className="text-white font-semibold">
                          {formatPrice(studyTwo.price, currency)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuickInquire(studyTwo);
                          }}
                          className="text-white/80 hover:text-white underline"
                        >
                          Acquisition Inquiry →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Accession Inventory Ledger */}
                {inventoryWorks.length > 0 && (
                  <div className="bg-[#171817] border border-white/[0.08] overflow-hidden shadow-2xl">
                    <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-widest text-white">
                        Accession Inventory · {artist.name}
                      </span>
                      <span className="text-xs font-mono text-[#73716b]">
                        {inventoryWorks.length} Additional Works
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-[#121312] text-[#73716b] border-b border-white/[0.08] uppercase tracking-wider text-[11px]">
                          <tr>
                            <th className="py-3 px-4">Ref</th>
                            <th className="py-3 px-4">Masterwork</th>
                            <th className="py-3 px-4 hidden md:table-cell">Medium</th>
                            <th className="py-3 px-4 hidden md:table-cell">Dimensions</th>
                            <th className="py-3 px-4">Valuation</th>
                            <th className="py-3 px-4 text-right">Inquiry</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                          {inventoryWorks.map((art) => (
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
                                  <span className="font-serif text-sm text-white group-hover:underline">
                                    {art.title}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 text-[#a6a49f] hidden md:table-cell">
                                {art.medium}
                              </td>
                              <td className="py-3.5 px-4 text-[#73716b] hidden md:table-cell">
                                {art.dimensions || 'Archival specs'}
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
            ) : (
              /* Uniform Grid Mode if explicitly toggled */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {displayedWorks.map((art) => (
                  <div
                    key={art.id}
                    className="group bg-[#171817] border border-white/[0.08] flex flex-col justify-between transition-all hover:border-white/30 shadow-xl"
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
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#121312]/90 border border-white/[0.08] text-white">
                          {art.status === 'available' ? 'Available' : 'Reserved'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-[#73716b]">
                          <span>{art.year}</span>
                          <span>{art.dimensions}</span>
                        </div>
                        <h3
                          onClick={() => onSelectArtwork(art.id)}
                          className="font-serif text-lg font-medium text-[#fbf9f6] mt-1.5 hover:underline cursor-pointer tracking-tight"
                        >
                          {art.title}
                        </h3>
                        <p className="text-xs text-[#a6a49f] line-clamp-1 mt-1 font-sans">{art.medium}</p>
                      </div>

                      <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                        <span className="font-mono text-sm font-semibold text-white">
                          {formatPrice(art.price, currency)}
                        </span>
                        {art.status === 'available' ? (
                          <button
                            onClick={() => onQuickInquire(art)}
                            className="text-xs font-mono text-white/80 hover:text-white flex items-center gap-1 transition-colors"
                          >
                            <span>Inquire</span>
                            <span className="material-symbols-outlined text-xs">arrow_outward</span>
                          </button>
                        ) : (
                          <span className="text-xs font-mono text-[#73716b] italic">Reserved</span>
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
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#a6a49f]">
                Materiality & Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#fbf9f6]">
                A Commitment to Slow, Ancestral Craft
              </h2>
              <p className="text-base text-[#a6a49f] font-sans leading-relaxed">
                Rather than adhering to mass production schedules, work in this atelier is governed by the drying seasons, weather humidity, and long wood firings that take place only three times per calendar year.
              </p>
            </div>

            {/* Photo & Technical notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#171817] border border-white/[0.08] p-6 sm:p-8 shadow-xl">
              <div className="aspect-[4/3] bg-[#121312] overflow-hidden border border-white/[0.08]">
                <img
                  src={artist.selectedMasterworkImage || artist.heroImageUrl}
                  alt="Process"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4 text-xs font-mono text-[#a6a49f]">
                <h4 className="font-serif text-xl font-medium text-[#fbf9f6]">
                  Kiln Atmosphere & Raw Materials
                </h4>
                <p className="leading-relaxed font-sans">
                  Clay is hand-mined from mountain veins in Shiga Prefecture, aged underground for three years to cultivate microbial plasticity.
                </p>
                <div className="space-y-2 pt-3 border-t border-white/[0.08] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">·</span>
                    <span>Firing Duration: 72 continuous hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">·</span>
                    <span>Fuel: Japanese red pine cordwood</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">·</span>
                    <span>Glaze Chemistry: Unrefined natural wood ash and feldspar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">·</span>
                    <span>Peak Temperature: 1,300°C reduction</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#171817] border border-white/[0.08] text-center space-y-4 shadow-xl">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#a6a49f] block">
                Bespoke Atelier Commissions
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#fbf9f6]">
                Interested in a Custom Commission?
              </h3>
              <p className="text-sm text-[#a6a49f] max-w-lg mx-auto leading-relaxed font-sans">
                {artist.name} accepts a limited allotment of bespoke commissions each season for private architectural residences and museum permanent collections.
              </p>
              <button
                onClick={() => onQuickInquire(displayedWorks[0] || ARTWORKS[0])}
                className="mt-4 px-8 py-3.5 bg-[#c2623a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#d67248] transition-colors shadow-lg"
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
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#a6a49f]">
                Institutional Provenance
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#fbf9f6] mt-1">
                Exhibitions & Museum Collections
              </h2>
            </div>

            <div className="bg-[#171817] border border-white/[0.08] divide-y divide-white/[0.08] overflow-hidden shadow-xl">
              {artist.exhibitions.map((ex, idx) => (
                <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors">
                  <div className="sm:w-24 flex-shrink-0 font-serif text-2xl text-white">
                    {ex.year}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-lg font-medium text-[#fbf9f6]">
                      {ex.title}
                    </h4>
                    <p className="text-xs text-[#a6a49f] font-sans mt-0.5">{ex.venue}</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#a6a49f] bg-white/5 border border-white/[0.08] px-2.5 py-1 self-start sm:self-center">
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
