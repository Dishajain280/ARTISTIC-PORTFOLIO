import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/mockData';
import { JournalArticle, ViewMode } from '../types';

interface JournalViewProps {
  onSelectJournal: (articleId: string) => void;
  onNavigate: (view: ViewMode) => void;
}

const CATEGORIES = [
  'All Dispatches',
  'Materiality & Earth',
  'Kilncraft & Fire',
  'Studio Practice',
  'Collecting Philosophy',
];

export const JournalView: React.FC<JournalViewProps> = ({
  onSelectJournal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Dispatches');

  const filteredArticles =
    selectedCategory === 'All Dispatches'
      ? JOURNAL_ARTICLES
      : JOURNAL_ARTICLES.filter((a) => a.category === selectedCategory);

  const featured = JOURNAL_ARTICLES.find((a) => a.featured) || JOURNAL_ARTICLES[0];
  const listArticles = filteredArticles.filter((a) => a.id !== featured.id);

  return (
    <div className="min-h-screen bg-[#121312] text-[#fbf9f6] pt-28 pb-24 selection:bg-[#c2623a] selection:text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Curatorial Header */}
        <div className="border-b border-white/[0.08] pb-10 mb-10">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#c2623a] mb-3">
              Editorial Monograph & Field Dispatches
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#fbf9f6] tracking-tight">
              The Atelier Journal
            </h1>
            <p className="text-base text-[#a6a49f] mt-3 font-sans max-w-2xl leading-relaxed">
              Dispatches on materiality, technique, ancestral kilns, and the quiet ethics of physical slow craft.
            </p>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pt-8 pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-colors whitespace-nowrap border ${
                  selectedCategory === cat
                    ? 'bg-white text-[#121312] border-white font-medium'
                    : 'bg-[#171817] text-[#a6a49f] border-white/[0.08] hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Essay Hero */}
        {(selectedCategory === 'All Dispatches' || featured.category === selectedCategory) && (
          <div
            onClick={() => onSelectJournal(featured.id)}
            className="group cursor-pointer bg-[#171817] border border-white/[0.08] mb-16 overflow-hidden transition-all duration-300 hover:border-white/30 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto bg-[#121312] overflow-hidden">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#a6a49f] mb-3">
                    <span className="text-white font-semibold">{featured.dispatchNumber}</span>
                    <span>•</span>
                    <span>{featured.category}</span>
                    <span>•</span>
                    <span>{featured.readTime}</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#fbf9f6] group-hover:underline transition-colors leading-tight">
                    {featured.title}
                  </h2>

                  {featured.subtitle && (
                    <p className="text-xs font-mono text-[#a6a49f] uppercase tracking-wider mt-2">
                      {featured.subtitle}
                    </p>
                  )}

                  <p className="text-sm sm:text-base text-[#a6a49f] mt-4 font-sans leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="text-xs font-mono text-[#73716b]">
                    <span>By </span>
                    <strong className="text-white">{featured.author}</strong>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#c2623a] group-hover:underline flex items-center gap-1">
                    <span>Read Monograph</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectJournal(article.id)}
              className="group cursor-pointer bg-[#171817] border border-white/[0.08] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-white/30 shadow-xl"
            >
              <div>
                <div className="aspect-[16/10] bg-[#121312] overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#73716b]">
                    <span className="text-[#f5c28e] font-semibold">{article.dispatchNumber}</span>
                    <span>•</span>
                    <span>{article.category}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#fbf9f6] group-hover:text-[#f5c28e] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#a6a49f] line-clamp-3 leading-relaxed font-sans">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/10 mt-4 flex items-center justify-between text-xs font-mono text-[#73716b]">
                <span>{article.readTime}</span>
                <span className="text-[#c2623a] group-hover:underline flex items-center gap-1">
                  <span>Read</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
