import React from 'react';
import { ViewMode, Currency } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenPortfolioBuilder: () => void;
  currentView?: ViewMode;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  currency,
  onCurrencyChange,
  onOpenPortfolioBuilder,
}) => {
  return (
    <footer className="w-full bg-[#121312] border-t border-white/[0.08] text-[#fbf9f6]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-5 pr-0 lg:pr-12">
            <div className="mb-4">
              <span className="font-serif text-3xl font-normal tracking-tight text-white">
                Atelier
              </span>
            </div>
            <p className="font-serif text-lg italic text-[#c8c5be] mb-4 leading-relaxed max-w-md">
              A sovereign exhibition sanctuary and archival monograph for master sculptors, ceramicists, and independent artists worldwide.
            </p>
            <p className="text-xs font-mono text-[#8a8882] tracking-wider uppercase">
              Curated Digital Monograph & Sovereign Atelier Platform
            </p>
            <div className="mt-6 text-xs font-mono text-[#73716b]">
              Geneva · Kyoto · Paris · Milan · Verified Provenance Archives
            </div>
          </div>

          {/* Navigation Column 1: Curatorial Index */}
          <div className="lg:col-span-2 md:col-span-1">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-5">
              Catalog
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('discover')}
                  className="text-[#a6a49f] hover:text-white transition-colors text-left"
                >
                  Permanent Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover')}
                  className="text-[#a6a49f] hover:text-white transition-colors text-left"
                >
                  Curated Anthologies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('artist')}
                  className="text-[#a6a49f] hover:text-white transition-colors text-left"
                >
                  Resident Masters
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('artist')}
                  className="text-[#a6a49f] hover:text-white transition-colors text-left"
                >
                  Commission Roster
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Column 2 */}
          <div className="lg:col-span-2 md:col-span-1">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-5">
              Atelier
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={onOpenPortfolioBuilder}
                  className="text-[#a6a49f] hover:text-white transition-colors text-left"
                >
                  Establish Monograph
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="text-[#a6a49f] hover:text-white transition-colors text-left"
                >
                  Patronage & Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('artist')}
                  className="text-[#a6a49f] hover:text-white transition-colors text-left"
                >
                  Studio Monograph
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="text-[#a6a49f] hover:text-white transition-colors text-left"
                >
                  Scholarly Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Institutional Col 3 */}
          <div className="lg:col-span-3 md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-5">
              Scholarly Standing
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="text-[#a6a49f] hover:text-white transition-colors text-left"
                >
                  Atelier Charter & Colophon
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="text-[#a6a49f] hover:text-white transition-colors text-left"
                >
                  Archival Provenance Ledger
                </button>
              </li>
              <li>
                <span className="text-[#73716b] font-mono text-xs">
                  Paris Salons · Geneva Custody Desk
                </span>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="text-[#a6a49f] hover:text-white transition-colors text-left"
                >
                  Dispatches on Materiality
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#73716b]">
          <div>
            © 2025 Atelier Platform. Archival Fine Art Architecture. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="uppercase tracking-widest text-[11px] text-[#8a8882]">Currency:</span>
            {(['USD', 'EUR', 'GBP', 'JPY'] as Currency[]).map((c) => (
              <button
                key={`footer-${c}`}
                onClick={() => onCurrencyChange(c)}
                className={`px-2 py-0.5 border text-xs transition-colors ${
                  currency === c
                    ? 'text-white border-[#c2623a] bg-[#c2623a]/15 font-medium'
                    : 'text-[#8a8882] border-white/10 hover:border-white/20'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
