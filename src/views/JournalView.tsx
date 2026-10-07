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
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-28 pb-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="border-b border-[#e4e2df] pb-10 mb-10">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
              Editorial Monograph
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#1b1c1a] mt-1">
              The Atelier Journal
            </h1>
            <p className="text-base text-[#575953] mt-3 font-sans max-w-xl">
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
                    ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
                    : 'bg-white text-[#575953] border-[#e4e2df] hover:border-[#1b1c1a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Essay Hero (shown when All Dispatches or matches category) */}
        {(selectedCategory === 'All Dispatches' || featured.category === selectedCategory) && (
          <div
            onClick={() => onSelectJournal(featured.id)}
            className="group cursor-pointer bg-white border border-[#e4e2df] mb-16 overflow-hidden transition-all hover:shadow-xl hover:border-[#c8c5be]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto bg-[#ebe7e0] overflow-hidden">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#72787e] mb-3">
                    <span className="text-[#1b1c1a] font-semibold">{featured.dispatchNumber}</span>
                    <span>•</span>
                    <span>{featured.category}</span>
                    <span>•</span>
                    <span>{featured.readTime}</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a] group-hover:underline leading-tight">
                    {featured.title}
                  </h2>

                  {featured.subtitle && (
                    <p className="text-xs font-mono text-[#72787e] uppercase tracking-wider mt-2">
                      {featured.subtitle}
                    </p>
                  )}

                  <p className="text-sm sm:text-base text-[#575953] mt-4 font-sans leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#f0ede8] flex items-center justify-between">
                  <div className="text-xs font-mono">
                    <span className="text-[#1b1c1a] font-medium block">Words by {featured.author}</span>
                    <span className="text-[#72787e]">{featured.authorRole}</span>
                  </div>
                  <span className="text-xs font-mono text-[#1b1c1a] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Essay →
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List of Dispatches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectJournal(article.id)}
              className="group cursor-pointer bg-white border border-[#e4e2df] flex flex-col justify-between transition-all hover:shadow-lg hover:border-[#c8c5be]"
            >
              <div>
                <div className="aspect-[16/10] bg-[#ebe7e0] overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2.5 text-xs font-mono text-[#72787e] mb-2">
                    <span className="text-[#1b1c1a] font-medium">{article.dispatchNumber}</span>
                    <span>•</span>
                    <span>{article.category}</span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#1b1c1a] group-hover:underline leading-snug">
                    {article.title}
                  </h3>

                  {article.subtitle && (
                    <p className="text-xs font-mono text-[#72787e] mt-1">{article.subtitle}</p>
                  )}

                  <p className="text-xs text-[#575953] mt-3 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-mono text-[#72787e] border-t border-[#f4f2ee] mt-4 pt-4">
                <span>By {article.author}</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
