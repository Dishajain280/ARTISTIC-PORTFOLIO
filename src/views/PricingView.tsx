import React, { useState } from 'react';
import { ViewMode, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface PricingViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenPortfolioBuilder: () => void;
  currency: Currency;
}

export const PricingView: React.FC<PricingViewProps> = ({
  onNavigate,
  onOpenPortfolioBuilder,
  currency,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [salesVolume, setSalesVolume] = useState<number>(45000); // for sovereignty calculator
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Calculator math
  const galleryTake = Math.round(salesVolume * 0.5);
  const galleryArtistKeeps = salesVolume - galleryTake;
  const atelierAnnualCost = billingCycle === 'annual' ? 280 : 28 * 12;
  const atelierArtistKeeps = salesVolume - atelierAnnualCost;
  const savedDifference = atelierArtistKeeps - galleryArtistKeeps;

  const faqs = [
    {
      q: 'Does Atelier take any commission on artwork sales?',
      a: 'Never. Atelier operates on a transparent software membership model. Whether you sell one ceramic vessel for $1,200 or an architectural installation for $80,000, 100% of the acquisition price goes directly into your studio accounts.',
    },
    {
      q: 'How are acquisitions and collector payments processed?',
      a: 'Patrons can submit direct binding inquiries or acquire works via secure custodial escrow. We support international wire transfers, SEPA, ACH, and major credit cards with museum-grade compliance.',
    },
    {
      q: 'Can I connect my own custom studio domain?',
      a: 'Yes. Independent Creator and Foundry Guild members can connect any personal domain (e.g., elenarostova.art) with automatic SSL certificates and custom typography formatting.',
    },
    {
      q: 'How does Atelier handle white-glove shipping for fragile or monumental works?',
      a: 'We partner with specialized fine art logistics providers across North America, Europe, and Asia. When an acquisition is finalized, the system can automatically generate timber crating specs and climate-controlled freight quotes.',
    },
    {
      q: 'What is the Atelier Provenance Ledger?',
      a: 'Every work catalogued receives an immutable provenance code and a printable museum-grade Certificate of Authenticity containing physical dimensions, kiln details, firing signatures, and ownership history.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#121312] text-[#fbf9f6] pt-28 pb-24 selection:bg-[#c2623a] selection:text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Curatorial Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-[#a6a49f]">
            Sovereign Infrastructure & 0% Economics
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#fbf9f6] leading-tight tracking-tight">
            Fair patronage for those who craft with their hands.
          </h1>
          <p className="text-base sm:text-lg text-[#a6a49f] font-sans leading-relaxed">
            Replace the prohibitive 50% commercial gallery deduction with an uncompromised digital monograph built for longevity.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center p-1 bg-[#171817] border border-white/[0.08] mt-6">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-xs font-mono transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-white/15 text-white shadow-sm font-medium'
                  : 'text-[#73716b] hover:text-white'
              }`}
            >
              Annual Patronage (Save 20%)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-xs font-mono transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white/15 text-white shadow-sm font-medium'
                  : 'text-[#73716b] hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {/* Pricing Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24 items-stretch">
          {/* TIER 1: Collector & Patron */}
          <div className="bg-[#171817] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-white/25 transition-all shadow-xl">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#73716b]">
                  Tier I
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#fbf9f6] mt-1">
                  Collector & Patron
                </h3>
                <p className="text-xs text-[#a6a49f] mt-2 font-sans">
                  For private collectors, architects, curators, and fine art enthusiasts.
                </p>
              </div>

              <div className="border-t border-b border-white/[0.08] py-4">
                <span className="font-mono text-4xl font-semibold text-[#fbf9f6]">$0</span>
                <span className="text-xs font-mono text-[#73716b] ml-2">/ forever complimentary</span>
              </div>

              <ul className="space-y-3 text-xs text-[#a6a49f]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#73716b]">check</span>
                  <span>Browse complete monograph catalogues in ultra-high resolution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#73716b]">check</span>
                  <span>Direct studio inquiries with 0% secondary markups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#73716b]">check</span>
                  <span>Save private curated collections and exhibition bookmarks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#73716b]">check</span>
                  <span>Atelier Journal dispatches and field essays</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('discover')}
              className="mt-8 w-full py-3.5 bg-white/5 border border-white/[0.08] text-[#fbf9f6] text-xs font-mono uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Browse Catalog
            </button>
          </div>

          {/* TIER 2: Independent Creator (Featured) */}
          <div className="bg-[#171817] border border-white/20 p-8 flex flex-col justify-between shadow-2xl relative scale-105 z-10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#121312] px-3.5 py-0.5 text-[10px] font-mono uppercase tracking-widest font-semibold shadow-md">
              Flagship Monograph
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#a6a49f]">
                  Tier II
                </span>
                <h3 className="font-serif text-3xl font-medium mt-1 text-[#fbf9f6]">
                  Independent Creator
                </h3>
                <p className="text-xs text-[#a6a49f] mt-2 font-sans">
                  For individual ceramicists, painters, sculptors, and textile artists.
                </p>
              </div>

              <div className="border-t border-b border-white/[0.08] py-4">
                <span className="font-mono text-4xl font-semibold text-[#fbf9f6]">
                  {billingCycle === 'annual' ? '$24' : '$28'}
                </span>
                <span className="text-xs font-mono text-[#a6a49f] ml-2">
                  / month {billingCycle === 'annual' ? '(billed $280/yr)' : ''}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-[#e4e2df]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  <span>
                    <strong className="text-white">0% Commission</strong> on all direct studio acquisitions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-white/70">check</span>
                  <span>Dedicated custom domain (e.g., yourname.art)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-white/70">check</span>
                  <span>Uncompressed museum-grade image archives (macro zoom enabled)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-white/70">check</span>
                  <span>Physical specifications & provenance ledger generator</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-white/70">check</span>
                  <span>Direct custodial escrow & white-glove crate integrations</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenPortfolioBuilder}
              className="mt-8 w-full py-4 bg-[#c2623a] text-white text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#d67248] transition-colors shadow-lg"
            >
              Start 30-Day Free Trial
            </button>
          </div>

          {/* TIER 3: Studio & Foundry Guild */}
          <div className="bg-[#171817] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-white/25 transition-all shadow-xl">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#73716b]">
                  Tier III
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#fbf9f6] mt-1">
                  Studio & Foundry Guild
                </h3>
                <p className="text-xs text-[#a6a49f] mt-2 font-sans">
                  For collective workshops, glass foundries, print ateliers, and artist estates.
                </p>
              </div>

              <div className="border-t border-b border-white/[0.08] py-4">
                <span className="font-mono text-4xl font-semibold text-[#fbf9f6]">
                  {billingCycle === 'annual' ? '$70' : '$85'}
                </span>
                <span className="text-xs font-mono text-[#73716b] ml-2">
                  / month {billingCycle === 'annual' ? '(billed $850/yr)' : ''}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-[#a6a49f]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#73716b]">check</span>
                  <span>Up to 10 resident artist monographs under one shared guild domain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#73716b]">check</span>
                  <span>Private salon preview links with passcode-protected access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#73716b]">check</span>
                  <span>Printable exhibition catalogue generation (press-ready PDFs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#73716b]">check</span>
                  <span>Dedicated logistics coordinator for white-glove transport</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenPortfolioBuilder}
              className="mt-8 w-full py-3.5 bg-white/5 border border-white/[0.08] text-[#fbf9f6] text-xs font-mono uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Enroll Guild Monograph
            </button>
          </div>
        </div>

        {/* Interactive Economic Sovereignty Calculator */}
        <div className="max-w-4xl mx-auto bg-[#171817] border border-white/[0.08] p-8 sm:p-12 mb-24 shadow-2xl">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#a6a49f]">
              Economic Comparison
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#fbf9f6] mt-1">
              Economic Sovereignty Calculator
            </h2>
            <p className="text-sm text-[#a6a49f] mt-2 font-sans">
              See the direct financial difference between physical gallery representation and the Atelier sovereign model.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-[#a6a49f]">Estimated Annual Artwork Gross Sales:</span>
                <span className="text-base font-semibold text-[#fbf9f6]">
                  {formatPrice(salesVolume, currency)}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={150000}
                step={2500}
                value={salesVolume}
                onChange={(e) => setSalesVolume(Number(e.target.value))}
                className="w-full accent-[#c2623a] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {/* Traditional Gallery */}
              <div className="p-6 bg-[#121312] border border-white/[0.08] space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#73716b] block">
                  Traditional Gallery (50% Take)
                </span>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-[#a6a49f]">
                    <span>Gallery Commission (50%):</span>
                    <span className="font-mono text-rose-400">-{formatPrice(galleryTake, currency)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium pt-2 border-t border-white/[0.08] text-white">
                    <span>Artist Net Return:</span>
                    <span className="font-mono text-base">{formatPrice(galleryArtistKeeps, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Atelier Sovereign Model */}
              <div className="p-6 bg-[#121312] border border-emerald-500/30 text-[#fbf9f6] space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 block">
                  Atelier Monograph (0% Commission)
                </span>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-[#a6a49f]">
                    <span>Atelier Membership:</span>
                    <span className="font-mono text-[#a6a49f]">-{formatPrice(atelierAnnualCost, currency)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-white/[0.08]">
                    <span>Artist Net Return:</span>
                    <span className="font-mono text-base text-[#6ee7b7]">
                      {formatPrice(atelierArtistKeeps, currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Banner */}
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-300">
              <span>Direct Additional Capital Kept in Your Studio:</span>
              <span className="text-base font-bold">+{formatPrice(savedDifference, currency)}/year</span>
            </div>
          </div>
        </div>

        {/* Custodial Integrity Pillars */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#a6a49f]">
              Platform Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#fbf9f6] mt-1">
              Custodial Integrity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#171817] border border-white/[0.08] space-y-3 shadow-lg hover:border-white/20 transition-colors">
              <span className="material-symbols-outlined text-3xl text-white/80">account_balance</span>
              <h3 className="font-serif text-xl font-medium text-[#fbf9f6]">
                Direct Studio Escrow
              </h3>
              <p className="text-xs text-[#a6a49f] leading-relaxed font-sans">
                We never touch or withhold your artwork revenue. Funds flow into dedicated escrow accounts until transport is completed safely.
              </p>
            </div>

            <div className="p-6 bg-[#171817] border border-white/[0.08] space-y-3 shadow-lg hover:border-white/20 transition-colors">
              <span className="material-symbols-outlined text-3xl text-white/80">verified_user</span>
              <h3 className="font-serif text-xl font-medium text-[#fbf9f6]">
                Immutable Provenance
              </h3>
              <p className="text-xs text-[#a6a49f] leading-relaxed font-sans">
                Every monograph record is permanent and non-deletable. Your creative legacy, exhibitions, and collector pedigrees remain intact forever.
              </p>
            </div>

            <div className="p-6 bg-[#171817] border border-white/[0.08] space-y-3 shadow-lg hover:border-white/20 transition-colors">
              <span className="material-symbols-outlined text-3xl text-white/80">local_shipping</span>
              <h3 className="font-serif text-xl font-medium text-[#fbf9f6]">
                White-Glove Logistics
              </h3>
              <p className="text-xs text-[#a6a49f] leading-relaxed font-sans">
                Connect directly with climate-controlled fine art couriers equipped for heavy stoneware, delicate unspun textiles, and large canvases.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#a6a49f]">
              Clarifications
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#fbf9f6] mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="bg-[#171817] border border-white/[0.08] divide-y divide-white/[0.08] overflow-hidden shadow-2xl">
            {faqs.map((faq, idx) => (
              <div key={idx} className="transition-colors">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                >
                  <span className="font-serif text-lg font-medium text-[#fbf9f6] group-hover:text-white transition-colors">
                    {faq.q}
                  </span>
                  <span className="material-symbols-outlined text-[#73716b] transition-transform duration-200">
                    {expandedFaq === idx ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-[#a6a49f] leading-relaxed font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
