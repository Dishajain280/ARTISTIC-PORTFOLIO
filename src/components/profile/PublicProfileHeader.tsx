import React, { useState } from 'react';
import { Creator } from '../../types';

interface PublicProfileHeaderProps {
  creator: Creator;
  onOpenCommission: () => void;
  onScrollToGallery: () => void;
  onScrollToServices: () => void;
}

export const PublicProfileHeader: React.FC<PublicProfileHeaderProps> = ({
  creator,
  onOpenCommission,
  onScrollToGallery,
  onScrollToServices,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = `${window.location.origin}/@${creator.handle}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative border-b border-[#e4e2df] bg-[#f7f5f1] pt-24 pb-14 sm:pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left: Artist Portrait & Quick Provenance */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 aspect-square bg-[#ebe7e0] border border-[#e4e2df] overflow-hidden shadow-sm">
              <img
                src={creator.avatarUrl}
                alt={creator.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="px-2.5 py-1 bg-white border border-[#e4e2df] text-xs font-mono font-medium text-[#1b1c1a]">
                @{creator.handle}
              </span>
              <span className="text-xs font-mono text-[#72787e]">• {creator.medium}</span>
            </div>

            <div className="mt-2 text-xs font-mono text-[#575953] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span>{creator.location}</span>
            </div>

            {/* Social Links */}
            <div className="mt-4 flex items-center gap-3 text-xs font-mono text-[#72787e]">
              {creator.socialLinks.instagram && (
                <span className="hover:text-[#1b1c1a] cursor-pointer">
                  ig: @{creator.socialLinks.instagram}
                </span>
              )}
              {creator.socialLinks.website && (
                <span>• {creator.socialLinks.website}</span>
              )}
            </div>
          </div>

          {/* Right: Artist Monograph Statement & Action CTAs */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#e4e2df] text-[10px] font-mono uppercase tracking-[0.2em] text-[#575953]">
                <span>Independent Artist Monograph</span>
                <span>•</span>
                <span>Direct Studio Desk</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1b1c1a] leading-tight">
                {creator.name}
              </h1>

              {creator.tagline && (
                <p className="font-serif italic text-xl sm:text-2xl text-[#444748] leading-snug">
                  "{creator.tagline}"
                </p>
              )}
            </div>

            <p className="text-sm sm:text-base text-[#575953] leading-relaxed max-w-3xl font-sans">
              {creator.bio}
            </p>

            {/* Action Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenCommission}
                className="px-6 sm:px-8 py-3.5 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Commission @{creator.handle}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <button
                onClick={onScrollToServices}
                className="px-6 py-3.5 bg-white border border-[#1b1c1a] text-[#1b1c1a] text-xs font-mono uppercase tracking-widest hover:bg-[#f4f2ee] transition-colors"
              >
                Commission Services
              </button>

              <button
                onClick={onScrollToGallery}
                className="px-6 py-3.5 bg-transparent border border-[#e4e2df] text-[#575953] text-xs font-mono uppercase tracking-widest hover:border-[#1b1c1a] hover:text-[#1b1c1a] transition-colors"
              >
                Browse Works
              </button>

              <button
                onClick={handleShare}
                className="px-4 py-3.5 bg-white border border-[#e4e2df] text-[#575953] hover:text-[#1b1c1a] text-xs font-mono transition-colors flex items-center gap-1.5"
                title="Share link"
              >
                <span className="material-symbols-outlined text-sm">share</span>
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
