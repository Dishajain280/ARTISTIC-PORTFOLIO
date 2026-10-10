import React from 'react';
import { ViewRoute, Creator } from '../../types';

interface DemoToolbarProps {
  currentRoute: ViewRoute;
  onNavigate: (route: ViewRoute) => void;
  currentCreator: Creator;
  allCreators: Creator[];
  onSelectCreator: (handle: string) => void;
  onResetDemo: () => void;
  onOpenOnboarding: () => void;
}

export const DemoToolbar: React.FC<DemoToolbarProps> = ({
  currentRoute,
  onNavigate,
  currentCreator,
  allCreators,
  onSelectCreator,
  onResetDemo,
  onOpenOnboarding,
}) => {
  const isArtistView = currentRoute.type === 'dashboard';

  return (
    <aside aria-label="Hackathon Demo Controls" className="fixed bottom-0 left-0 right-0 z-50 bg-[#1b1c1a] text-white border-t border-[#343734] px-4 py-2.5 shadow-2xl">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Left: Perspective Switcher */}
        <div className="flex items-center gap-3">
          <span className="text-[#a0a39f] uppercase tracking-wider text-[11px] hidden sm:inline">
            DEMO PERSPECTIVE:
          </span>
          <div className="inline-flex rounded-none p-0.5 bg-[#2c2d2b] border border-[#444744]">
            <button
              onClick={() => onNavigate({ type: 'profile', handle: currentCreator.handle })}
              className={`px-3 py-1 text-[11px] uppercase tracking-wider transition-colors ${
                !isArtistView
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-sm'
                  : 'text-[#c8c5be] hover:text-white'
              }`}
            >
              Visitor / Client (/@{currentCreator.handle})
            </button>
            <button
              onClick={() => onNavigate({ type: 'dashboard', tab: 'inbox' })}
              className={`px-3 py-1 text-[11px] uppercase tracking-wider transition-colors ${
                isArtistView
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-sm'
                  : 'text-[#c8c5be] hover:text-white'
              }`}
            >
              Artist Studio Desk
            </button>
          </div>
        </div>

        {/* Center: Active Artist Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[#a0a39f] text-[11px] hidden md:inline">ARTIST:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {allCreators.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  onSelectCreator(c.handle);
                  if (currentRoute.type === 'profile') {
                    onNavigate({ type: 'profile', handle: c.handle });
                  }
                }}
                className={`px-2.5 py-1 text-[11px] transition-colors ${
                  c.handle === currentCreator.handle
                    ? 'bg-[#e4e2df] text-[#1b1c1a] font-bold'
                    : 'bg-[#2c2d2b] text-[#a0a39f] hover:text-white'
                }`}
              >
                @{c.handle}
              </button>
            ))}
            <button
              onClick={onOpenOnboarding}
              className="px-2.5 py-1 text-[11px] bg-[#343734] text-[#e4e2df] hover:bg-white hover:text-[#1b1c1a] transition-colors"
              title="Claim new artist handle"
            >
              + Claim @Handle
            </button>
          </div>
        </div>

        {/* Right: Quick Reset Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset all demo data back to clean initial seed?')) {
                onResetDemo();
              }
            }}
            className="text-[11px] text-[#a0a39f] hover:text-white underline hover:no-underline transition-colors"
            title="Restore clean initial demo state"
          >
            Reset Demo Data
          </button>
        </div>
      </div>
    </aside>
  );
};
