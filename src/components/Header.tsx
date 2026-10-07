import React, { useState } from 'react';
import { ViewMode, Currency } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenSearch: () => void;
  onOpenPortfolioBuilder: () => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenPortfolioBuilder,
  currency,
  onCurrencyChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: ViewMode }[] = [
    { label: 'Discover', view: 'discover' },
    { label: 'Explore', view: 'discover' },
    { label: 'Artists', view: 'artist' },
    { label: 'Journal', view: 'journal' },
    { label: 'Pricing', view: 'pricing' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fbf9f6]/95 backdrop-blur-md border-b border-[#e4e2df] transition-all">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 h-20 flex items-center justify-between gap-4">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 transition-opacity hover:opacity-85 text-left group"
          >
            <span className="font-serif text-3xl font-medium tracking-tight text-[#1b1c1a]">
              Atelier
            </span>
          </button>

          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((item, idx) => {
              const isActive =
                (item.view === currentView) ||
                (item.label === 'Explore' && currentView === 'discover');
              return (
                <button
                  key={`${item.label}-${idx}`}
                  onClick={() => onNavigate(item.view)}
                  className={`text-sm tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#1b1c1a] font-semibold border-b-2 border-[#1b1c1a] pb-0.5'
                      : 'text-[#444748] hover:text-[#1b1c1a]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Search, Actions, Profile */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden md:flex items-center bg-[#f5f3f0] border border-[#e4e2df] px-3.5 py-1.5 hover:border-[#747878] transition-colors text-left"
            title="Search artists, artwork, or medium (⌘K)"
          >
            <span className="material-symbols-outlined text-[#747878] text-[18px] mr-2">
              search
            </span>
            <span className="text-xs text-[#747878] w-44 lg:w-56 truncate">
              Search artists, artwork, medium...
            </span>
            <kbd className="text-[10px] text-[#747878] bg-[#efeeeb] px-1.5 py-0.5 border border-[#e4e2df] ml-2 uppercase">
              ⌘K
            </kbd>
          </button>

          {/* Quick Search Icon for Mobile */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 text-[#444748] hover:text-[#1b1c1a]"
            aria-label="Search"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Currency Pill Switcher */}
          <div className="hidden lg:flex items-center border border-[#e4e2df] bg-[#f5f3f0] text-[11px] font-semibold">
            {(['USD', 'EUR', 'GBP', 'JPY'] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => onCurrencyChange(c)}
                className={`px-2 py-1 transition-colors ${
                  currency === c
                    ? 'bg-[#161616] text-white'
                    : 'text-[#444748] hover:text-[#1b1c1a]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenPortfolioBuilder}
            className="hidden sm:inline-block text-sm text-[#444748] hover:text-[#1b1c1a] px-2 py-1.5 transition-colors"
          >
            Sign In
          </button>

          <button
            onClick={onOpenPortfolioBuilder}
            className="inline-flex items-center justify-center bg-[#161616] text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2.5 rounded-full hover:bg-[#99452d] hover:text-white transition-colors duration-200 shadow-sm"
          >
            Create your portfolio
          </button>

          {/* Profile Avatar with status beacon */}
          <div
            onClick={() => onNavigate('artist')}
            className="relative flex items-center cursor-pointer group"
            title="Elena Rostova (Active Atelier Studio)"
          >
            <img
              alt="Elena Rostova Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#e4e2df] group-hover:ring-[#1b1c1a] transition-all"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtJQN5uJT-T09aZOuD0K3MTbiYktbCLAxnkWV3w1MbqZuKiL_QqGmMQmIlfpObqppqLTOIdDVMltppi1S8RxDRN0xdKQRsEfTrzpbmpkkJLV2kcY4XYrYZZVo9r3xaFhGpJ6iENcPoVxs5VUCNi-n5J8mqtHfy77yRz0jjCSUk4CY2l2xAFJX6TtymihhkCSwvSHWY_I96coK1_67w0_3SaL7lsFblbu1dYth_OHr7AzgjcfKCbm8p"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#99452d] ring-2 ring-[#fbf9f6]"></span>
          </div>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 text-[#1b1c1a]"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fbf9f6] border-b border-[#e4e2df] px-6 py-5 space-y-4 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item, idx) => (
              <button
                key={`mobile-${item.label}-${idx}`}
                onClick={() => {
                  onNavigate(item.view);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-base font-serif text-[#1b1c1a] py-1 border-b border-[#efeeeb] flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-[16px] text-[#747878]">
                  arrow_forward
                </span>
              </button>
            ))}
          </nav>
          <div className="pt-2 flex items-center justify-between text-xs text-[#747878]">
            <span>Currency:</span>
            <div className="flex gap-2">
              {(['USD', 'EUR', 'GBP', 'JPY'] as Currency[]).map((c) => (
                <button
                  key={`mob-${c}`}
                  onClick={() => onCurrencyChange(c)}
                  className={`px-2 py-1 ${
                    currency === c ? 'bg-[#161616] text-white' : 'bg-[#efeeeb]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
