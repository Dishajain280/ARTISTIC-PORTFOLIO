import React, { useState, useEffect, useRef } from 'react';
import { ARTWORKS, ARTISTS, JOURNAL_ARTICLES } from '../data/mockData';
import { Artwork, Artist, JournalArticle, ViewMode, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArtwork: (artworkId: string) => void;
  onSelectArtist: (artistId: string) => void;
  onSelectJournal: (articleId: string) => void;
  onNavigate: (view: ViewMode) => void;
  currency: Currency;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArtwork,
  onSelectArtist,
  onSelectJournal,
  currency,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredArtworks = normalizedQuery
    ? ARTWORKS.filter(
        (art) =>
          art.title.toLowerCase().includes(normalizedQuery) ||
          art.medium.toLowerCase().includes(normalizedQuery) ||
          art.artistName.toLowerCase().includes(normalizedQuery)
      )
    : ARTWORKS.slice(0, 4);

  const filteredArtists = normalizedQuery
    ? ARTISTS.filter(
        (artist) =>
          artist.name.toLowerCase().includes(normalizedQuery) ||
          artist.medium.toLowerCase().includes(normalizedQuery) ||
          artist.location.toLowerCase().includes(normalizedQuery)
      )
    : ARTISTS.slice(0, 3);

  const filteredArticles = normalizedQuery
    ? JOURNAL_ARTICLES.filter(
        (art) =>
          art.title.toLowerCase().includes(normalizedQuery) ||
          art.category.toLowerCase().includes(normalizedQuery) ||
          art.author.toLowerCase().includes(normalizedQuery)
      )
    : JOURNAL_ARTICLES.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div
        className="w-full max-w-2xl bg-[#fbf9f6] border border-[#e4e2df] rounded-none shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-[#e4e2df] bg-[#ffffff]">
          <span className="material-symbols-outlined text-[#72787e] mr-3 text-2xl">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artworks, artists, ceramics, oil painting, essays..."
            className="w-full bg-transparent text-base text-[#1b1c1a] placeholder-[#8d9196] focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#72787e] hover:text-[#1b1c1a] p-1"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-3 px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider text-[#72787e] bg-[#f4f2ee] border border-[#e4e2df]">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6 divide-y divide-[#eceae6]">
          {/* Artworks */}
          {filteredArtworks.length > 0 && (
            <div className="pt-2 first:pt-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#72787e]">
                  Artworks ({filteredArtworks.length})
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredArtworks.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => {
                      onSelectArtwork(art.id);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2 group text-left hover:bg-[#f4f2ee] transition-colors border border-transparent hover:border-[#e4e2df]"
                  >
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-14 h-14 object-cover flex-shrink-0 bg-[#e4e2df]"
                    />
                    <div className="min-w-0">
                      <p className="font-serif text-sm font-medium text-[#1b1c1a] truncate group-hover:underline">
                        {art.title}
                      </p>
                      <p className="text-xs text-[#72787e] truncate">{art.artistName}</p>
                      <p className="text-xs font-mono text-[#575953] mt-0.5">
                        {formatPrice(art.price, currency)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Artists */}
          {filteredArtists.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#72787e]">
                  Artists & Ateliers ({filteredArtists.length})
                </span>
              </div>
              <div className="space-y-2">
                {filteredArtists.map((artist) => (
                  <button
                    key={artist.id}
                    onClick={() => {
                      onSelectArtist(artist.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 group hover:bg-[#f4f2ee] transition-colors border border-transparent hover:border-[#e4e2df] text-left"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={artist.avatarUrl}
                        alt={artist.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-serif text-sm font-medium text-[#1b1c1a] group-hover:underline">
                          {artist.name}
                        </p>
                        <p className="text-xs text-[#72787e]">
                          {artist.discipline} • {artist.location}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#72787e]">
                      {artist.artworksCount} pieces
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Journal Articles */}
          {filteredArticles.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#72787e]">
                  Journal Dispatches ({filteredArticles.length})
                </span>
              </div>
              <div className="space-y-2">
                {filteredArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => {
                      onSelectJournal(article.id);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 p-2 group hover:bg-[#f4f2ee] transition-colors border border-transparent hover:border-[#e4e2df] text-left"
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-12 h-12 object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-serif text-sm font-medium text-[#1b1c1a] truncate group-hover:underline">
                        {article.title}
                      </p>
                      <p className="text-xs text-[#72787e] truncate">
                        {article.category} • {article.readTime}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredArtworks.length === 0 &&
            filteredArtists.length === 0 &&
            filteredArticles.length === 0 && (
              <div className="py-12 text-center text-[#72787e]">
                <p className="font-serif text-lg text-[#1b1c1a]">No results found for "{query}"</p>
                <p className="text-xs mt-1">
                  Try searching for "stoneware", "Elena", "oil", or "minimalist".
                </p>
              </div>
            )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#f4f2ee] border-t border-[#e4e2df] flex items-center justify-between text-xs text-[#72787e]">
          <span>Quick monograph lookup</span>
          <button
            onClick={onClose}
            className="hover:text-[#1b1c1a] font-medium transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
