import React from 'react';
import { CommissionService, Creator } from '../../types';

interface CommissionServicesListProps {
  services: CommissionService[];
  creator: Creator;
  onSelectServiceForRequest: (service: CommissionService) => void;
}

export const CommissionServicesList: React.FC<CommissionServicesListProps> = ({
  services,
  creator,
  onSelectServiceForRequest,
}) => {
  return (
    <section id="services-section" className="py-16 sm:py-24 border-b border-[#e4e2df] bg-[#f7f5f1]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
            Studio Commissions & Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a] mt-1">
            Bespoke Commissions with @{creator.handle}
          </h2>
          <p className="text-sm sm:text-base text-[#575953] mt-3 font-sans leading-relaxed">
            Eliminating chaotic DMs and vague briefs. Commission bespoke masterworks directly through transparent terms, defined lead times, and structured studio reviews.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className={`bg-white border p-8 flex flex-col justify-between transition-all ${
                srv.active
                  ? 'border-[#e4e2df] hover:border-[#1b1c1a] hover:shadow-lg'
                  : 'border-[#e4e2df] opacity-60'
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#72787e]">
                      {srv.active ? 'Accepting Requests' : 'Bookings Closed'}
                    </span>
                    <h3 className="font-serif text-2xl font-medium text-[#1b1c1a] mt-1">
                      {srv.title}
                    </h3>
                  </div>
                </div>

                <div className="border-t border-b border-[#f0ede8] py-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono text-[#72787e]">Starting from</span>
                    <span className="font-mono text-3xl font-semibold text-[#1b1c1a]">
                      ${srv.basePrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono text-[#72787e]">{srv.currency}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#575953] leading-relaxed">
                  {srv.description}
                </p>

                {/* Specs / Logistics */}
                <div className="space-y-2 pt-2 text-xs font-mono text-[#575953]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#1b1c1a]">schedule</span>
                    <span>Estimated Turnaround: ~{srv.turnaroundWeeks} weeks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#1b1c1a]">tune</span>
                    <span>Revisions Included: {srv.revisionsIncluded} review milestones</span>
                  </div>
                </div>

                {/* Deliverables Checklist */}
                {srv.deliverables && srv.deliverables.length > 0 && (
                  <div className="pt-4 border-t border-[#f0ede8] space-y-2">
                    <span className="text-[11px] font-mono uppercase text-[#72787e] block">
                      Scope & Inclusions:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#444748]">
                      {srv.deliverables.map((del: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-sm text-[#1b1c1a] mt-0.5">
                            check
                          </span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-8">
                {srv.active ? (
                  <button
                    onClick={() => onSelectServiceForRequest(srv)}
                    className="w-full py-3.5 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Request Commission</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3.5 bg-[#f4f2ee] text-[#8d9196] text-xs font-mono uppercase tracking-widest cursor-not-allowed"
                  >
                    Currently Fully Booked
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
