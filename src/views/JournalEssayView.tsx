import React from 'react';
import { JOURNAL_ARTICLES } from '../data/mockData';
import { ViewMode } from '../types';

interface JournalEssayViewProps {
  articleId: string;
  onNavigate: (view: ViewMode) => void;
  onSelectJournal: (articleId: string) => void;
}

export const JournalEssayView: React.FC<JournalEssayViewProps> = ({
  articleId,
  onNavigate,
  onSelectJournal,
}) => {
  const article = JOURNAL_ARTICLES.find((a) => a.id === articleId) || JOURNAL_ARTICLES[0];
  const related = JOURNAL_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <article className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-24">
      {/* Header & Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8">
        <button
          onClick={() => onNavigate('journal')}
          className="text-xs font-mono uppercase tracking-widest text-[#72787e] hover:text-[#1b1c1a] flex items-center gap-1.5 mb-8"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to All Dispatches</span>
        </button>

        <div className="space-y-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-mono text-[#72787e]">
            <span className="text-[#1b1c1a] font-semibold">{article.dispatchNumber}</span>
            <span>•</span>
            <span>{article.category}</span>
            <span>•</span>
            <span>{article.readTime}</span>
            {article.temperature && (
              <>
                <span>•</span>
                <span>{article.temperature}</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#1b1c1a] leading-[1.1]">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="font-mono text-sm sm:text-base text-[#72787e] tracking-wide">
              {article.subtitle}
            </p>
          )}

          <div className="pt-6 border-t border-[#e4e2df] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#575953]">
            <div>
              <span className="text-[#1b1c1a] font-medium">Text: {article.author}</span>
              <span className="text-[#72787e] ml-2">({article.authorRole})</span>
            </div>
            {article.photographer && (
              <div className="text-[#72787e]">
                Photography: <span className="text-[#1b1c1a]">{article.photographer}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Essay Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 my-12">
        <div className="aspect-[16/9] bg-[#ebe7e0] overflow-hidden border border-[#e4e2df] shadow-sm">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xs font-mono text-[#72787e] mt-2 italic text-center sm:text-left">
          Documented during fieldwork on location. Preserved in the Atelier Archival Collection.
        </p>
      </div>

      {/* Essay Typography Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 space-y-6 text-[#2a2c29]">
        <p className="font-serif text-2xl sm:text-3xl text-[#1b1c1a] italic leading-relaxed border-l-2 border-[#1b1c1a] pl-6 py-2 my-8">
          "{article.excerpt}"
        </p>

        {article.contentParagraphs.map((para, idx) => (
          <p key={idx} className="font-serif text-lg sm:text-xl text-[#333532] leading-relaxed">
            {para}
          </p>
        ))}

        <div className="p-6 bg-[#f4f2ee] border border-[#e4e2df] text-xs font-mono text-[#575953] space-y-2 my-10">
          <p className="font-semibold text-[#1b1c1a]">About the Author</p>
          <p>
            {article.author} writes for international ceramic monographs, museum catalogues, and material ethnographies. Based between Kyoto and Oxford.
          </p>
        </div>
      </div>

      {/* Further Dispatches Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-16 border-t border-[#e4e2df] mt-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-serif text-2xl font-normal text-[#1b1c1a]">Further Dispatches</h3>
          <button
            onClick={() => onNavigate('journal')}
            className="text-xs font-mono uppercase tracking-widest text-[#1b1c1a] hover:underline"
          >
            All Essays →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {related.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectJournal(item.id)}
              className="p-5 bg-white border border-[#e4e2df] cursor-pointer group hover:shadow-md transition-all"
            >
              <div className="aspect-[16/10] bg-[#ebe7e0] overflow-hidden mb-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#72787e]">
                {item.dispatchNumber} • {item.category}
              </span>
              <h4 className="font-serif text-lg font-medium text-[#1b1c1a] group-hover:underline mt-1">
                {item.title}
              </h4>
              <p className="text-xs text-[#575953] mt-1 line-clamp-2">{item.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
