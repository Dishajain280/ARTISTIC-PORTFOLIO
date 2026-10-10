import React from 'react';
import { Creator, ViewRoute } from '../types';

interface LandingViewProps {
  onNavigate: (route: ViewRoute) => void;
  onOpenOnboarding: () => void;
  featuredCreators: Creator[];
}

export const LandingView: React.FC<LandingViewProps> = ({
  onNavigate,
  onOpenOnboarding,
  featuredCreators,
}) => {
  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[#e4e2df]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f4f2ee] border border-[#e4e2df] text-[11px] font-mono uppercase tracking-[0.2em] text-[#575953]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b1c1a]"></span>
              Professional Identity & Commission Platform
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#1b1c1a] leading-[1.05]">
              One link for your craft, gallery, and commissions.
            </h1>

            <p className="text-lg sm:text-xl text-[#575953] font-sans max-w-2xl leading-relaxed">
              Every artist gets a sovereign shareable home: <code className="bg-[#f0ede8] px-2 py-0.5 font-mono text-[#1b1c1a] text-base border border-[#e4e2df]">atelier.app/@artistname</code>. Replace fragmented Instagram DMs, detached portfolios, and lost invoices with structured commission requests.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenOnboarding}
                className="px-8 py-4 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-all shadow-sm flex items-center gap-2"
              >
                <span>Claim Your @Handle</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <button
                onClick={() => onNavigate({ type: 'profile', handle: 'maya' })}
                className="px-8 py-4 bg-white border border-[#1b1c1a] text-[#1b1c1a] text-xs font-mono uppercase tracking-widest hover:bg-[#f4f2ee] transition-all"
              >
                Explore Live Demo (@maya)
              </button>

              <button
                onClick={() => onNavigate({ type: 'dashboard', tab: 'inbox' })}
                className="px-8 py-4 bg-transparent border border-[#e4e2df] text-[#575953] text-xs font-mono uppercase tracking-widest hover:border-[#1b1c1a] hover:text-[#1b1c1a] transition-all"
              >
                View Artist Studio Desk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Breakdown */}
      <section className="py-20 border-b border-[#e4e2df] bg-[#f7f5f1]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
              The Core Problem
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1b1c1a]">
              The creator workflow is fragmented.
            </h2>
            <p className="text-sm sm:text-base text-[#575953]">
              Artists lose thousands of hours and dollars juggling disconnected tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Messy Current Way */}
            <div className="bg-white border border-[#e4e2df] p-8 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#c62828] font-bold block">
                ✕ How Artists Work Today (Disconnected)
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#575953]">
                <li className="flex items-start gap-2">
                  <span className="text-[#c62828] font-bold mt-0.5">•</span>
                  <span><strong>Instagram / TikTok:</strong> Discovery, but zero structured commission workflow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c62828] font-bold mt-0.5">•</span>
                  <span><strong>DMs & WhatsApp:</strong> Endless back-and-forth, missing dimensions, undefined budgets, and scope creep.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c62828] font-bold mt-0.5">•</span>
                  <span><strong>Generic Websites:</strong> Outdated portfolios detached from commission intake.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c62828] font-bold mt-0.5">•</span>
                  <span><strong>Lost Opportunities:</strong> 60% of interested patrons abandon inquiries because pricing and process are opaque.</span>
                </li>
              </ul>
            </div>

            {/* The Atelier Way */}
            <div className="bg-[#1b1c1a] text-[#fbf9f6] border border-[#1b1c1a] p-8 space-y-4 shadow-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-[#7ae18c] font-bold block">
                ✓ The Atelier Way (Unified Identity)
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#c8c5be]">
                <li className="flex items-start gap-2">
                  <span className="text-[#7ae18c] font-bold mt-0.5">•</span>
                  <span><strong>One Shareable Link (atelier.app/@you):</strong> Works in your Instagram bio, email signature, and business card.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#7ae18c] font-bold mt-0.5">•</span>
                  <span><strong>Transparent Services:</strong> Base prices, turnaround times, and clear included revisions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#7ae18c] font-bold mt-0.5">•</span>
                  <span><strong>Structured Intake & AI Briefs:</strong> Patrons submit actionable briefs with spaces and dimensions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#7ae18c] font-bold mt-0.5">•</span>
                  <span><strong>Studio Commission Desk:</strong> Track status from Received to Delivered with milestone notes.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artist Profiles Demo Showcase */}
      <section className="py-20 border-b border-[#e4e2df] bg-[#fbf9f6]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
                Live Identities
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a] mt-1">
                Explore Resident Artist Monograph Links
              </h2>
            </div>
            <p className="text-xs font-mono text-[#72787e]">
              Click any artist to experience their live public profile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCreators.map((c) => (
              <div
                key={c.id}
                onClick={() => onNavigate({ type: 'profile', handle: c.handle })}
                className="group bg-white border border-[#e4e2df] p-6 flex flex-col justify-between transition-all hover:border-[#1b1c1a] hover:shadow-xl cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-[#ebe7e0] overflow-hidden border border-[#e4e2df]">
                    <img
                      src={c.heroImageUrl || c.avatarUrl}
                      alt={c.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-[#f4f2ee] text-xs font-mono text-[#1b1c1a] font-medium">
                      @{c.handle}
                    </span>
                    <span className="text-xs font-mono text-[#72787e]">{c.location}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#1b1c1a] group-hover:underline">
                    {c.name}
                  </h3>

                  <p className="text-xs font-mono text-[#72787e]">{c.medium}</p>

                  <p className="text-xs text-[#575953] line-clamp-2 leading-relaxed">
                    {c.bio}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#f0ede8] mt-6 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#1b1c1a] font-medium group-hover:underline">
                    atelier.app/@{c.handle}
                  </span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Claim Callout */}
      <section className="py-20 bg-[#1b1c1a] text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 text-center space-y-6 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#a0a39f]">
            Hackathon MVP • Ready to Demo
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-tight">
            Claim your artist @handle today.
          </h2>
          <p className="text-base text-[#c8c5be] font-sans">
            Start accepting structured commissions with 0% commission deductions.
          </p>
          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={onOpenOnboarding}
              className="px-8 py-4 bg-[#fbf9f6] text-[#1b1c1a] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Claim Your Handle
            </button>
            <button
              onClick={() => onNavigate({ type: 'profile', handle: 'maya' })}
              className="px-8 py-4 border border-[#575953] text-white text-xs font-mono uppercase tracking-widest hover:border-white transition-colors"
            >
              View Maya's Profile
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
