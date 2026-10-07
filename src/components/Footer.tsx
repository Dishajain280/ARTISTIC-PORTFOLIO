import React from 'react';
import { ViewMode, Currency } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenPortfolioBuilder: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  currency,
  onCurrencyChange,
  onOpenPortfolioBuilder,
}) => {
  return (
    <footer className="w-full bg-[#f5f3f0] border-t border-[#e4e2df] text-[#1b1c1a]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-5 pr-0 lg:pr-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-serif text-2xl font-medium tracking-tight text-[#1b1c1a]">
                Atelier
              </span>
            </div>
            <p className="font-serif text-lg text-[#444748] max-w-md italic mb-4 leading-relaxed">
              The space your art deserves. Purpose-built for visual artists, sculptors, and independent makers worldwide.
            </p>
            <p className="text-[11px] text-[#747878] uppercase tracking-wider font-semibold">
              Curated Digital Monograph & Atelier Platform
            </p>
          </div>

          {/* Nav Col 1 */}
          <div className="lg:col-span-2 md:col-span-1">
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#1b1c1a] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('discover')}
                  className="text-[#444748] hover:text-[#1b1c1a] transition-colors"
                >
                  Discover
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover')}
                  className="text-[#444748] hover:text-[#1b1c1a] transition-colors"
                >
                  Curated Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('artist')}
                  className="text-[#444748] hover:text-[#1b1c1a] transition-colors"
                >
                  Exhibitions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('artist')}
                  className="text-[#444748] hover:text-[#1b1c1a] transition-colors"
                >
                  Commission Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Col 2 */}
          <div className="lg:col-span-2 md:col-span-1">
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#1b1c1a] mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={onOpenPortfolioBuilder}
                  className="text-[#444748] hover:text-[#1b1c1a] transition-colors font-medium text-left"
                >
                  Portfolio Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="text-[#444748] hover:text-[#1b1c1a] transition-colors"
                >
                  Commerce Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('artist')}
                  className="text-[#444748] hover:text-[#1b1c1a] transition-colors"
                >
                  Studio Manager
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="text-[#444748] hover:text-[#1b1c1a] transition-colors"
                >
                  Stories & Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Col 3 */}
          <div className="lg:col-span-3 md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#1b1c1a] mb-4">
              Legal & Social
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="text-[#444748] hover:text-[#1b1c1a] transition-colors"
                >
                  Colophon & Charter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="text-[#444748] hover:text-[#1b1c1a] transition-colors"
                >
                  Custody & Escrow
                </button>
              </li>
              <li>
                <span className="text-[#444748]">Instagram • @atelier.fineart</span>
              </li>
              <li>
                <span className="text-[#444748]">Are.na • /atelier-monographs</span>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="text-[#444748] hover:text-[#1b1c1a] transition-colors"
                >
                  Substack • Atelier Gazette
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#e4e2df] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#747878]">
            © 2025 Atelier Platform Inc. All rights reserved. Fine Art Architecture. Geneva • Kyoto • Paris • New York.
          </div>
          <div className="flex items-center gap-2 text-xs text-[#444748]">
            <span className="text-[#747878] uppercase tracking-wider font-semibold mr-1">
              CURRENCY:
            </span>
            {(['USD', 'EUR', 'GBP', 'JPY'] as Currency[]).map((c) => (
              <button
                key={`footer-${c}`}
                onClick={() => onCurrencyChange(c)}
                className={`px-2.5 py-1 text-xs border transition-colors ${
                  currency === c
                    ? 'font-semibold text-[#1b1c1a] bg-white border-[#747878]'
                    : 'text-[#444748] border-transparent hover:border-[#e4e2df] hover:bg-white'
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
