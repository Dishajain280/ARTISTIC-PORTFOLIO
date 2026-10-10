import React, { useState } from 'react';
import { Artwork, Creator } from '../../types';

interface ArtworkInspectModalProps {
  artwork: Artwork | null;
  creator: Creator;
  onClose: () => void;
  onOpenCommission: () => void;
}

export const ArtworkInspectModal: React.FC<ArtworkInspectModalProps> = ({
  artwork,
  creator,
  onClose,
  onOpenCommission,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!artwork) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#fbf9f6] border border-[#e4e2df] w-full max-w-5xl max-h-[94vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#72787e] hover:text-[#1b1c1a] p-1"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Visual Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/3] bg-[#ebe7e0] border border-[#e4e2df] overflow-hidden">
              <img
                src={artwork.images[activeImageIdx] || artwork.images[0]}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail switcher if multiple images */}
            {artwork.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {artwork.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-16 border flex-shrink-0 transition-all ${
                      activeImageIdx === idx
                        ? 'border-[#1b1c1a] ring-1 ring-[#1b1c1a]'
                        : 'border-[#e4e2df] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dossier Meta (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
                Monograph Entry • @{creator.handle}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1b1c1a] mt-1">
                {artwork.title}
              </h2>
              <p className="text-xs text-[#72787e] font-mono mt-1">
                {artwork.medium} • {artwork.year}
              </p>
            </div>

            <p className="text-sm text-[#575953] leading-relaxed font-sans">
              {artwork.description}
            </p>

            <div className="p-4 bg-white border border-[#e4e2df] divide-y divide-[#eceae6] text-xs font-mono">
              <div className="py-2 flex justify-between">
                <span className="text-[#72787e]">Dimensions:</span>
                <span className="text-[#1b1c1a]">{artwork.dimensions}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-[#72787e]">Status:</span>
                <span className="text-[#2e7d32] font-semibold">{artwork.status.replace('_', ' ')}</span>
              </div>
              {artwork.price && (
                <div className="py-2 flex justify-between">
                  <span className="text-[#72787e]">Catalog Value:</span>
                  <span className="text-[#1b1c1a] font-bold">${artwork.price.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {artwork.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-[#f4f2ee] border border-[#e4e2df] text-[10px] font-mono text-[#575953]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-[#e4e2df] space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenCommission();
                }}
                className="w-full py-3.5 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-colors"
              >
                Commission Similar Piece with @{creator.handle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
