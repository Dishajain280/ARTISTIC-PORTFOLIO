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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div
        className="w-full max-w-2xl bg-[#121312] border border-white/[0.08] rounded-none shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-[#fbf9f6]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4.5 border-b border-white/[0.08] bg-[#171817]">
          <span className="material-symbols-outlined text-[#c2623a] mr-3 text-2xl">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artworks, artists, ceramics, oil painting, essays..."
            className="w-full bg-transparent text-base text-[#fbf9f6] placeholder-[#73716b] focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#73716b] hover:text-white p-1 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-3 px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider text-[#a6a49f] bg-white/10 border border-white/15">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6 divide-y divide-white/10">
          {/* Artworks */}
          {filteredArtworks.length > 0 && (
            <div className="pt-2 first:pt-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#c2623a]">
                  Catalog Specimens ({filteredArtworks.length})
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
                    className="flex items-center gap-3 p-2.5 group text-left bg-[#171817] hover:bg-white/[0.06] transition-colors border border-white/10 hover:border-white/25"
                  >
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-14 h-14 object-cover flex-shrink-0 bg-[#121312] border border-white/10"
                    />
                    <div className="min-w-0">
                      <p className="font-serif text-sm font-medium text-[#fbf9f6] truncate group-hover:text-[#f5c28e] transition-colors">
                        {art.title}
                      </p>
                      <p className="text-xs text-[#a6a49f] truncate">{art.artistName}</p>
                      <p className="text-xs font-mono text-[#f5c28e] mt-0.5">
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
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#c2623a]">
                  Monograph Artists ({filteredArtists.length})
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
                    className="w-full flex items-center justify-between p-2.5 group bg-[#171817] hover:bg-white/[0.06] transition-colors border border-white/10 hover:border-white/25 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={artist.avatarUrl}
                        alt={artist.name}
                        className="w-10 h-10 object-cover border border-white/15"
                      />
                      <div>
                        <p className="font-serif text-sm font-medium text-[#fbf9f6] group-hover:text-[#f5c28e] transition-colors">
                          {artist.name}
                        </p>
                        <p className="text-xs text-[#a6a49f]">
                          {artist.discipline} • {artist.location}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#73716b]">
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
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#c2623a]">
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
                    className="w-full flex items-center gap-3 p-2.5 group bg-[#171817] hover:bg-white/[0.06] transition-colors border border-white/10 hover:border-white/25 text-left"
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-12 h-12 object-cover flex-shrink-0 border border-white/10"
                    />
                    <div className="min-w-0">
                      <p className="font-serif text-sm font-medium text-[#fbf9f6] truncate group-hover:text-[#f5c28e] transition-colors">
                        {article.title}
                      </p>
                      <p className="text-xs text-[#a6a49f] truncate">
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
              <div className="py-12 text-center text-[#73716b]">
                <p className="font-serif text-lg text-[#fbf9f6]">No results found for "{query}"</p>
                <p className="text-xs mt-1 text-[#a6a49f]">
                  Try searching for "stoneware", "Elena", "oil", or "minimalist".
                </p>
              </div>
            )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#171817] border-t border-white/[0.08] flex items-center justify-between text-xs text-[#73716b]">
          <span className="font-mono">Quick monograph index lookup</span>
          <button
            onClick={onClose}
            className="hover:text-white font-mono uppercase tracking-wider transition-colors"
          >
            Close Window [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
