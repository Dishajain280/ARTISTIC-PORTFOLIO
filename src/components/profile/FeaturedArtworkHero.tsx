import React from 'react';
import { Artwork, Creator } from '../../types';

interface FeaturedArtworkHeroProps {
  artwork: Artwork;
  creator: Creator;
  onInspect: (artwork: Artwork) => void;
  onOpenCommission: () => void;
}

export const FeaturedArtworkHero: React.FC<FeaturedArtworkHeroProps> = ({
  artwork,
  creator,
  onInspect,
  onOpenCommission,
}) => {
  return (
    <section className="py-14 sm:py-20 border-b border-[#e4e2df] bg-[#fbf9f6]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
              Flagship Monograph Showcase
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1b1c1a] mt-1">
              Featured Work
            </h2>
          </div>
          <span className="text-xs font-mono text-[#72787e] hidden sm:inline">
            Catalogued by @{creator.handle}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-[#e4e2df] p-6 sm:p-10 shadow-sm">
          {/* Main Visual */}
          <div
            className="lg:col-span-7 relative group cursor-pointer aspect-[4/3] bg-[#ebe7e0] overflow-hidden"
            onClick={() => onInspect(artwork)}
          >
            <img
              src={artwork.images[0]}
              alt={artwork.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#1b1c1a]">
              Masterwork
            </div>
            {artwork.images.length > 1 && (
              <div className="absolute bottom-4 left-4 bg-[#1b1c1a]/80 text-white px-2.5 py-1 text-[11px] font-mono">
                +{artwork.images.length - 1} detail angles
              </div>
            )}
            <div className="absolute bottom-4 right-4 bg-white text-[#1b1c1a] px-3 py-1 text-xs font-mono group-hover:bg-[#1b1c1a] group-hover:text-white transition-colors">
              Inspect Resolution ↗
            </div>
          </div>

          {/* Curatorial Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#72787e]">{artwork.year}</span>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                    artwork.status === 'available'
                      ? 'bg-[#e7f1e9] text-[#1e582d]'
                      : 'bg-[#f4f2ee] text-[#575953]'
                  }`}
                >
                  {artwork.status.replace('_', ' ')}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#1b1c1a] mt-2">
                {artwork.title}
              </h3>
              <p className="text-xs font-mono text-[#72787e] mt-1">{artwork.medium}</p>
            </div>

            <p className="text-sm text-[#575953] leading-relaxed font-sans">
              {artwork.description}
            </p>

            <div className="p-4 bg-[#f7f5f1] border border-[#e4e2df] space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#72787e]">Dimensions:</span>
                <span className="text-[#1b1c1a]">{artwork.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#72787e]">Provenance:</span>
                <span className="text-[#1b1c1a]">Direct Studio Monograph</span>
              </div>
              {artwork.price && (
                <div className="flex justify-between pt-2 border-t border-[#e4e2df] text-sm">
                  <span className="text-[#72787e]">Acquisition:</span>
                  <span className="font-semibold text-[#1b1c1a]">${artwork.price.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onInspect(artwork)}
                className="px-6 py-3 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-colors"
              >
                Inspect Work
              </button>
              <button
                onClick={onOpenCommission}
                className="px-6 py-3 border border-[#1b1c1a] text-[#1b1c1a] text-xs font-mono uppercase tracking-widest hover:bg-[#f4f2ee] transition-colors"
              >
                Request Similar Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
