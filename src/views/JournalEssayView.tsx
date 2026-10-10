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
    <article className="min-h-screen bg-[#121312] text-[#fbf9f6] pt-24 pb-24 selection:bg-[#c2623a] selection:text-white">
      {/* Header & Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8">
        <button
          onClick={() => onNavigate('journal')}
          className="text-xs font-mono uppercase tracking-widest text-[#a6a49f] hover:text-white flex items-center gap-1.5 mb-8 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to All Dispatches</span>
        </button>

        <div className="space-y-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-mono text-[#a6a49f]">
            <span className="text-white font-semibold">{article.dispatchNumber}</span>
            <span aria-hidden="true">·</span>
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            {article.temperature && (
              <>
                <span aria-hidden="true">·</span>
                <span>{article.temperature}</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#fbf9f6] leading-[1.1] tracking-tight">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="font-mono text-sm sm:text-base text-[#a6a49f] tracking-wide">
              {article.subtitle}
            </p>
          )}

          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#73716b]">
            <div>
              <span className="text-white font-medium">Text: {article.author}</span>
              <span className="text-[#a6a49f] ml-2">({article.authorRole})</span>
            </div>
            {article.photographer && (
              <div className="text-[#a6a49f]">
                Photography: <span className="text-white">{article.photographer}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Essay Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 my-12">
        <div className="aspect-[16/9] bg-[#121312] overflow-hidden border border-white/[0.08] shadow-2xl">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xs font-mono text-[#73716b] mt-3 italic text-center sm:text-left">
          Documented during fieldwork on location. Preserved in the Atelier Archival Collection.
        </p>
      </div>

      {/* Essay Typography Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 space-y-6 text-[#e4e2df]">
        <p className="font-serif text-2xl sm:text-3xl text-[#fbf9f6] italic leading-relaxed border-y border-white/10 py-6 my-10 text-center sm:text-left">
          "{article.excerpt}"
        </p>

        {article.contentParagraphs.map((para, idx) => (
          <p key={idx} className="font-serif text-lg sm:text-xl text-[#d5d3ce] leading-relaxed">
            {para}
          </p>
        ))}

        <div className="p-6 sm:p-8 bg-[#171817] border border-white/[0.08] text-xs font-mono text-[#a6a49f] space-y-2 my-12 shadow-xl">
          <p className="font-semibold text-white uppercase tracking-wider">About the Author</p>
          <p className="font-sans text-sm leading-relaxed text-[#a6a49f]">
            {article.author} writes for international ceramic monographs, museum catalogues, and material ethnographies. Based between Kyoto and Oxford.
          </p>
        </div>

        {/* Footer Navigation: Next Dispatches */}
        <div className="pt-12 border-t border-white/[0.08]">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#a6a49f] mb-6">
            Recommended Dispatches
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectJournal(rel.id)}
                className="group cursor-pointer p-4 bg-[#171817] border border-white/[0.08] hover:border-white/30 transition-all shadow-md"
              >
                <span className="text-[11px] font-mono text-[#f5c28e]">{rel.dispatchNumber}</span>
                <h4 className="font-serif text-lg font-medium text-[#fbf9f6] group-hover:text-[#f5c28e] mt-1 transition-colors">
                  {rel.title}
                </h4>
                <p className="text-xs text-[#a6a49f] mt-1 line-clamp-2">{rel.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
