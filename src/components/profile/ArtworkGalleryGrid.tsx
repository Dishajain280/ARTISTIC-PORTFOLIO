import React, { useState } from 'react';
import { Artwork, Collection } from '../../types';

interface ArtworkGalleryGridProps {
  artworks: Artwork[];
  collections: Collection[];
  onInspect: (artwork: Artwork) => void;
}

export const ArtworkGalleryGrid: React.FC<ArtworkGalleryGridProps> = ({
  artworks,
  collections,
  onInspect,
}) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('all');

  const filtered =
    selectedCollectionId === 'all'
      ? artworks
      : artworks.filter((a) => a.collectionId === selectedCollectionId);

  return (
    <section id="gallery-section" className="py-16 sm:py-20 border-b border-[#e4e2df] bg-[#fbf9f6]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header & Collections Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
              Selected Works
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a] mt-1">
              Artwork Gallery & Collections
            </h2>
          </div>

          {/* Collection Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCollectionId('all')}
              className={`px-4 py-2 text-xs font-mono tracking-wider transition-colors whitespace-nowrap border ${
                selectedCollectionId === 'all'
                  ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
                  : 'bg-white text-[#575953] border-[#e4e2df] hover:border-[#1b1c1a]'
              }`}
            >
              All Works ({artworks.length})
            </button>
            {collections.map((col) => {
              const count = artworks.filter((a) => a.collectionId === col.id).length;
              return (
                <button
                  key={col.id}
                  onClick={() => setSelectedCollectionId(col.id)}
                  className={`px-4 py-2 text-xs font-mono tracking-wider transition-colors whitespace-nowrap border ${
                    selectedCollectionId === col.id
                      ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
                      : 'bg-white text-[#575953] border-[#e4e2df] hover:border-[#1b1c1a]'
                  }`}
                >
                  {col.title} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Cards Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center bg-white border border-dashed border-[#d2cfc9] p-8">
            <p className="font-serif text-xl text-[#1b1c1a]">No works catalogued in this series yet.</p>
            <p className="text-xs text-[#72787e] mt-1 font-mono">
              The artist is currently documenting new pieces in the studio.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((art) => (
              <div
                key={art.id}
                onClick={() => onInspect(art)}
                className="group bg-white border border-[#e4e2df] flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#c8c5be] cursor-pointer"
              >
                {/* Visual */}
                <div className="relative aspect-[4/5] bg-[#ebe7e0] overflow-hidden">
                  <img
                    src={art.images[0]}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                        art.status === 'available'
                          ? 'bg-white/95 text-[#1b1c1a] shadow-sm'
                          : 'bg-[#1b1c1a]/80 text-white'
                      }`}
                    >
                      {art.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-white text-[#1b1c1a] text-xs font-mono uppercase tracking-wider shadow-md">
                      Inspect Work
                    </span>
                  </div>
                </div>

                {/* Card Meta */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#72787e]">
                      <span>{art.year}</span>
                      <span>{art.dimensions}</span>
                    </div>

                    <h3 className="font-serif text-lg font-medium text-[#1b1c1a] mt-1 group-hover:underline">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#72787e] line-clamp-1 mt-0.5">{art.medium}</p>
                  </div>

                  <div className="pt-3 border-t border-[#f0ede8] flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-[#1b1c1a]">
                      {art.price ? `$${art.price.toLocaleString()}` : 'Direct Studio Piece'}
                    </span>
                    <span className="text-[#72787e] group-hover:text-[#1b1c1a]">
                      View Dossier →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
