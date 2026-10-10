import React, { useState, useRef, useEffect } from 'react';
import { ViewMode, Currency } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenSearch: () => void;
  onOpenPortfolioBuilder: () => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenPortfolioBuilder,
  currency,
  onCurrencyChange,
  theme = 'dark',
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const currencyMenuRef = useRef<HTMLDivElement>(null);

  // Close currency dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(event.target as Node)) {
        setCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Strict 4 clean single-line links without duplicates
  const navLinks: { label: string; view: ViewMode }[] = [
    { label: 'Catalog', view: 'discover' },
    { label: 'Artists', view: 'artist' },
    { label: 'Journal', view: 'journal' },
    { label: 'Patronage', view: 'pricing' },
  ];

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'JPY'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121312]/95 backdrop-blur-md border-b border-white/[0.08] text-[#fbf9f6]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Quiet Wordmark */}
        <div className="shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#fbf9f6] hover:text-[#d4d1ca] transition-colors whitespace-nowrap"
          >
            Atelier
          </button>
        </div>

        {/* Zone 2: 4 Clean Single-Line Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((item) => {
            const isActive =
              currentView === item.view ||
              (item.view === 'discover' && currentView === 'artwork') ||
              (item.view === 'journal' && currentView === 'journal-essay');

            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view)}
                className={`text-sm tracking-wide transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                  isActive
                    ? 'text-[#fbf9f6] font-medium'
                    : 'text-[#a6a49f] hover:text-[#fbf9f6]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[#c2623a]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Quiet Secondary Utilities & 1 Refined Primary Action */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          {/* Quiet Search Trigger Icon */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#a6a49f] hover:text-[#fbf9f6] transition-colors flex items-center justify-center"
            title="Search catalog, artists, or journals (⌘K)"
            aria-label="Search"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Theme Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 text-[#a6a49f] hover:text-[#fbf9f6] transition-colors flex items-center justify-center"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label="Toggle theme"
            >
              <span className="material-symbols-outlined text-[20px]">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
          )}

          {/* Quiet Currency Trigger */}
          <div className="relative" ref={currencyMenuRef}>
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="px-2 py-1 text-xs font-mono tracking-widest text-[#a6a49f] hover:text-[#fbf9f6] transition-colors flex items-center gap-1 border border-transparent hover:border-white/10"
              title="Select display currency"
            >
              <span>{currency}</span>
              <span className="material-symbols-outlined text-[14px]">
                {currencyDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 py-1 w-24 bg-[#171817] border border-white/[0.08] shadow-2xl z-50">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      onCurrencyChange(c);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs font-mono tracking-wider transition-colors ${
                      currency === c
                        ? 'text-[#c2623a] bg-white/[0.04] font-medium'
                        : 'text-[#a6a49f] hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 1 Refined Primary Action (Zero-Pill Architecture) */}
          <button
            onClick={onOpenPortfolioBuilder}
            className="hidden sm:inline-flex items-center justify-center text-xs font-mono uppercase tracking-widest px-4 sm:px-5 py-2.5 border border-white/20 hover:border-white/60 bg-transparent hover:bg-white/5 text-[#fbf9f6] transition-colors whitespace-nowrap shrink-0"
          >
            Join the Atelier
          </button>

          {/* Mobile Menu Hamburger Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#a6a49f] hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-6 space-y-5 bg-[#121312] border-b border-white/[0.08] text-white animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <button
                key={`mobile-${item.label}`}
                onClick={() => {
                  onNavigate(item.view);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-base font-serif py-1.5 flex items-center justify-between border-b border-white/10 text-white"
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-[16px] text-[#a6a49f]">
                  arrow_forward
                </span>
              </button>
            ))}
          </nav>

          <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#a6a49f]">
            <span>Currency:</span>
            <div className="flex gap-2">
              {currencies.map((c) => (
                <button
                  key={`mob-${c}`}
                  onClick={() => onCurrencyChange(c)}
                  className={`px-2 py-1 text-xs border ${
                    currency === c
                      ? 'border-[#c2623a] text-white bg-[#c2623a]/10'
                      : 'border-white/10 text-[#a6a49f]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={() => {
                onOpenPortfolioBuilder();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 border border-white/30 text-white text-xs font-mono uppercase tracking-widest hover:border-white transition-colors"
            >
              Join the Atelier
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
