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
      a: 'Yes. Independent Creator and Foundry Guild members can connect any personal domain (e.g., elenarostova.com) with automatic SSL certificates and custom typography formatting.',
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
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-28 pb-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
            Sovereign Infrastructure
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#1b1c1a] leading-tight">
            Fair patronage for those who craft with their hands.
          </h1>
          <p className="text-base sm:text-lg text-[#575953] font-sans leading-relaxed">
            Replace the prohibitive 50% commercial gallery deduction with an uncompromised digital monograph built for longevity.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center p-1 bg-[#f0ede8] border border-[#e4e2df] mt-6">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-xs font-mono transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-white text-[#1b1c1a] shadow-sm font-medium'
                  : 'text-[#72787e] hover:text-[#1b1c1a]'
              }`}
            >
              Annual Patronage (Save 20%)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-xs font-mono transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#1b1c1a] shadow-sm font-medium'
                  : 'text-[#72787e] hover:text-[#1b1c1a]'
              }`}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {/* Pricing Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24 items-stretch">
          {/* TIER 1: Collector & Patron */}
          <div className="bg-white border border-[#e4e2df] p-8 flex flex-col justify-between hover:border-[#1b1c1a] transition-colors">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#72787e]">
                  Tier I
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#1b1c1a] mt-1">
                  Collector & Patron
                </h3>
                <p className="text-xs text-[#575953] mt-2">
                  For private collectors, architects, curators, and fine art enthusiasts.
                </p>
              </div>

              <div className="border-t border-b border-[#f0ede8] py-4">
                <span className="font-mono text-4xl font-semibold text-[#1b1c1a]">$0</span>
                <span className="text-xs font-mono text-[#72787e] ml-2">/ forever complimentary</span>
              </div>

              <ul className="space-y-3 text-xs text-[#444748]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#1b1c1a]">check</span>
                  <span>Browse complete monograph catalogues in ultra-high resolution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#1b1c1a]">check</span>
                  <span>Direct studio inquiries with 0% secondary markups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#1b1c1a]">check</span>
                  <span>Save private curated collections and exhibition bookmarks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#1b1c1a]">check</span>
                  <span>Atelier Journal dispatches and field essays</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('discover')}
              className="mt-8 w-full py-3 bg-[#f4f2ee] border border-[#e4e2df] text-[#1b1c1a] text-xs font-mono uppercase tracking-wider hover:bg-[#1b1c1a] hover:text-white transition-colors"
            >
              Browse Catalog
            </button>
          </div>

          {/* TIER 2: Independent Creator (Featured) */}
          <div className="bg-[#1b1c1a] text-[#fbf9f6] border-2 border-[#1b1c1a] p-8 flex flex-col justify-between shadow-xl relative scale-105">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#fbf9f6] text-[#1b1c1a] px-4 py-0.5 text-[10px] font-mono uppercase tracking-widest border border-[#1b1c1a]">
              Recommended for Artists
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#a0a39f]">
                  Tier II
                </span>
                <h3 className="font-serif text-3xl font-medium mt-1">
                  Independent Creator
                </h3>
                <p className="text-xs text-[#c8c5be] mt-2">
                  For individual ceramicists, painters, sculptors, and textile artists.
                </p>
              </div>

              <div className="border-t border-b border-[#343734] py-4">
                <span className="font-mono text-4xl font-semibold">
                  {billingCycle === 'annual' ? '$24' : '$28'}
                </span>
                <span className="text-xs font-mono text-[#a0a39f] ml-2">
                  / month {billingCycle === 'annual' ? '(billed $280/yr)' : ''}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-[#e4e2df]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#fbf9f6]">check</span>
                  <span>
                    <strong>0% Commission</strong> on all direct studio acquisitions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#fbf9f6]">check</span>
                  <span>Dedicated custom domain (e.g., yourname.art)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#fbf9f6]">check</span>
                  <span>Uncompressed museum-grade image archives (macro zoom enabled)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#fbf9f6]">check</span>
                  <span>Physical specifications & provenance ledger generator</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#fbf9f6]">check</span>
                  <span>Direct custodial escrow & white-glove crate integrations</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenPortfolioBuilder}
              className="mt-8 w-full py-4 bg-[#fbf9f6] text-[#1b1c1a] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Start 30-Day Free Trial
            </button>
          </div>

          {/* TIER 3: Studio & Foundry Guild */}
          <div className="bg-white border border-[#e4e2df] p-8 flex flex-col justify-between hover:border-[#1b1c1a] transition-colors">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#72787e]">
                  Tier III
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#1b1c1a] mt-1">
                  Studio & Foundry Guild
                </h3>
                <p className="text-xs text-[#575953] mt-2">
                  For collective workshops, glass foundries, print ateliers, and artist estates.
                </p>
              </div>

              <div className="border-t border-b border-[#f0ede8] py-4">
                <span className="font-mono text-4xl font-semibold text-[#1b1c1a]">
                  {billingCycle === 'annual' ? '$70' : '$85'}
                </span>
                <span className="text-xs font-mono text-[#72787e] ml-2">
                  / month {billingCycle === 'annual' ? '(billed $850/yr)' : ''}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-[#444748]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#1b1c1a]">check</span>
                  <span>Up to 10 resident artist monographs under one shared guild domain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#1b1c1a]">check</span>
                  <span>Private salon preview links with passcode-protected access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#1b1c1a]">check</span>
                  <span>Printable exhibition catalogue generation (press-ready PDFs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-[#1b1c1a]">check</span>
                  <span>Dedicated logistics coordinator for white-glove transport</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenPortfolioBuilder}
              className="mt-8 w-full py-3 bg-[#f4f2ee] border border-[#e4e2df] text-[#1b1c1a] text-xs font-mono uppercase tracking-wider hover:bg-[#1b1c1a] hover:text-white transition-colors"
            >
              Enroll Guild Monograph
            </button>
          </div>
        </div>

        {/* Interactive Economic Sovereignty Calculator */}
        <div className="max-w-4xl mx-auto bg-white border border-[#e4e2df] p-8 sm:p-12 mb-24 shadow-sm">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
              Economic Comparison
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a] mt-1">
              Economic Sovereignty Calculator
            </h2>
            <p className="text-sm text-[#575953] mt-2">
              See the direct financial difference between physical gallery representation and the Atelier sovereign model.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-[#575953]">Estimated Annual Artwork Gross Sales:</span>
                <span className="text-base font-semibold text-[#1b1c1a]">
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
                className="w-full accent-[#1b1c1a] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {/* Traditional Gallery */}
              <div className="p-6 bg-[#f7f5f1] border border-[#e4e2df] space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#72787e] block">
                  Traditional Gallery (50% Take)
                </span>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Gallery Commission (50%):</span>
                    <span className="font-mono text-[#ba1a1a]">-{formatPrice(galleryTake, currency)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium pt-2 border-t border-[#e4e2df]">
                    <span>Artist Net Return:</span>
                    <span className="font-mono text-base">{formatPrice(galleryArtistKeeps, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Atelier Sovereign Model */}
              <div className="p-6 bg-[#1b1c1a] text-[#fbf9f6] space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#a0a39f] block">
                  Atelier Monograph (0% Commission)
                </span>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#c8c5be]">Atelier Membership:</span>
                    <span className="font-mono text-[#a0a39f]">-{formatPrice(atelierAnnualCost, currency)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-[#343734]">
                    <span>Artist Net Return:</span>
                    <span className="font-mono text-base text-[#7ae18c]">
                      {formatPrice(atelierArtistKeeps, currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Banner */}
            <div className="p-4 bg-[#e7f1e9] border border-[#b2dbba] flex items-center justify-between text-xs font-mono text-[#1b5e20]">
              <span>Direct Additional Capital Kept in Your Studio:</span>
              <span className="text-base font-bold">+{formatPrice(savedDifference, currency)}/year</span>
            </div>
          </div>
        </div>

        {/* Custodial Integrity Pillars */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
              Platform Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a] mt-1">
              Custodial Integrity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white border border-[#e4e2df] space-y-3">
              <span className="material-symbols-outlined text-3xl text-[#1b1c1a]">account_balance</span>
              <h3 className="font-serif text-xl font-medium text-[#1b1c1a]">
                Direct Studio Escrow
              </h3>
              <p className="text-xs text-[#575953] leading-relaxed">
                We never touch or withhold your artwork revenue. Funds flow into dedicated escrow accounts until transport is completed safely.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#e4e2df] space-y-3">
              <span className="material-symbols-outlined text-3xl text-[#1b1c1a]">verified_user</span>
              <h3 className="font-serif text-xl font-medium text-[#1b1c1a]">
                Immutable Provenance
              </h3>
              <p className="text-xs text-[#575953] leading-relaxed">
                Every monograph record is permanent and non-deletable. Your creative legacy, exhibitions, and collector pedigrees remain intact forever.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#e4e2df] space-y-3">
              <span className="material-symbols-outlined text-3xl text-[#1b1c1a]">local_shipping</span>
              <h3 className="font-serif text-xl font-medium text-[#1b1c1a]">
                White-Glove Logistics
              </h3>
              <p className="text-xs text-[#575953] leading-relaxed">
                Connect directly with climate-controlled fine art couriers equipped for heavy stoneware, delicate unspun textiles, and large canvases.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
              Clarifications
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a] mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="bg-white border border-[#e4e2df] divide-y divide-[#eceae6]">
            {faqs.map((faq, idx) => (
              <div key={idx} className="transition-colors">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                >
                  <span className="font-serif text-lg font-medium text-[#1b1c1a] group-hover:underline">
                    {faq.q}
                  </span>
                  <span className="material-symbols-outlined text-[#72787e] transition-transform duration-200">
                    {expandedFaq === idx ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-[#575953] leading-relaxed">
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
