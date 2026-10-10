import React, { useState } from 'react';
import { ViewRoute, Creator } from '../../types';

interface NavbarProps {
  currentRoute: ViewRoute;
  onNavigate: (route: ViewRoute) => void;
  creator: Creator;
  onOpenOnboarding: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  creator,
  onOpenOnboarding,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/@${creator.handle}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isProfileActive = currentRoute.type === 'profile';
  const isDashboardActive = currentRoute.type === 'dashboard';
  const isLandingActive = currentRoute.type === 'landing';

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#fbf9f6]/95 backdrop-blur-md border-b border-[#e4e2df] transition-all">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand & Identity Link */}
        <div className="flex items-center gap-6 sm:gap-8">
          <button
            onClick={() => onNavigate({ type: 'landing' })}
            className="flex items-center gap-2 group text-left"
          >
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1b1c1a]">
              Atelier
            </span>
          </button>

          {/* Shareable Link Capsule */}
          <div className="hidden md:flex items-center bg-[#f4f2ee] border border-[#e4e2df] px-3 py-1.5 text-xs font-mono text-[#575953] gap-2">
            <span className="text-[#8d9196]">identity:</span>
            <button
              onClick={() => onNavigate({ type: 'profile', handle: creator.handle })}
              className="font-medium text-[#1b1c1a] hover:underline"
              title="View public profile"
            >
              atelier.app/@{creator.handle}
            </button>
            <button
              onClick={handleCopyLink}
              className="text-[#72787e] hover:text-[#1b1c1a] pl-1 border-l border-[#d2cfc9]"
              title="Copy public link to clipboard"
            >
              {copied ? (
                <span className="text-[#255e37] text-[10px] font-sans font-semibold">Copied!</span>
              ) : (
                <span className="text-[10px] uppercase tracking-wider">Copy</span>
              )}
            </button>
          </div>
        </div>

        {/* Center / Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-6 text-xs sm:text-sm">
          <button
            onClick={() => onNavigate({ type: 'landing' })}
            className={`px-3 py-1.5 transition-colors font-sans ${
              isLandingActive
                ? 'text-[#1b1c1a] font-semibold border-b-2 border-[#1b1c1a]'
                : 'text-[#575953] hover:text-[#1b1c1a]'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => onNavigate({ type: 'profile', handle: creator.handle })}
            className={`px-3 py-1.5 transition-colors font-sans flex items-center gap-1.5 ${
              isProfileActive
                ? 'text-[#1b1c1a] font-semibold border-b-2 border-[#1b1c1a]'
                : 'text-[#575953] hover:text-[#1b1c1a]'
            }`}
          >
            <span>Public Profile</span>
            <span className="text-[10px] font-mono text-[#8d9196] hidden sm:inline">
              (@{creator.handle})
            </span>
          </button>

          <button
            onClick={() => onNavigate({ type: 'dashboard', tab: 'inbox' })}
            className={`px-3 py-1.5 transition-colors font-sans flex items-center gap-1.5 ${
              isDashboardActive
                ? 'text-[#1b1c1a] font-semibold border-b-2 border-[#1b1c1a]'
                : 'text-[#575953] hover:text-[#1b1c1a]'
            }`}
          >
            <span>Studio Desk</span>
            <span className="w-2 h-2 rounded-full bg-[#1b1c1a]"></span>
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenOnboarding}
            className="hidden lg:inline-flex items-center px-4 py-2 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#343734] transition-colors"
          >
            Claim @Handle
          </button>

          {/* Quick Perspective Toggle */}
          <button
            onClick={() => {
              if (isDashboardActive) {
                onNavigate({ type: 'profile', handle: creator.handle });
              } else {
                onNavigate({ type: 'dashboard', tab: 'inbox' });
              }
            }}
            className="px-3.5 py-1.5 border border-[#1b1c1a] text-[#1b1c1a] text-xs font-mono uppercase tracking-wider hover:bg-[#f4f2ee] transition-colors"
          >
            {isDashboardActive ? 'View Public /@' : 'Enter Studio'}
          </button>
        </div>
      </div>
    </header>
  );
};
