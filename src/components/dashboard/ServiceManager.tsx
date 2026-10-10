import React, { useState } from 'react';
import { CommissionService, Creator } from '../../types';

interface ServiceManagerProps {
  services: CommissionService[];
  creator: Creator;
  onCreateService: (service: CommissionService) => void;
  onUpdateService: (id: string, updates: Partial<CommissionService>) => void;
  onDeleteService: (id: string) => void;
}

export const ServiceManager: React.FC<ServiceManagerProps> = ({
  services,
  creator,
  onCreateService,
  onUpdateService,
  onDeleteService,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    basePrice: 1500,
    currency: 'USD' as const,
    turnaroundWeeks: 6,
    revisionsIncluded: 2,
    deliverablesString: 'Pre-production sketch review, Photographic studio updates, Signed provenance certificate',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const deliverables = formData.deliverablesString
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    const newService: CommissionService = {
      id: `srv-${Date.now().toString().slice(-6)}`,
      creatorId: creator.id,
      title: formData.title || 'Bespoke Custom Work',
      description: formData.description,
      basePrice: Number(formData.basePrice) || 1200,
      currency: formData.currency,
      turnaroundWeeks: Number(formData.turnaroundWeeks) || 4,
      revisionsIncluded: Number(formData.revisionsIncluded) || 2,
      active: true,
      deliverables,
    };

    onCreateService(newService);
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      basePrice: 1500,
      currency: 'USD',
      turnaroundWeeks: 6,
      revisionsIncluded: 2,
      deliverablesString: 'Pre-production sketch review, Photographic studio updates, Signed provenance certificate',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e4e2df] pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
            Studio Offerings
          </span>
          <h2 className="font-serif text-3xl font-normal text-[#1b1c1a] mt-1">
            Commission Services ({services.length})
          </h2>
          <p className="text-xs text-[#575953] font-mono mt-1">
            Structure your base pricing, lead times, and client intake criteria
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>New Service Offering</span>
        </button>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-white border border-[#e4e2df] p-6 flex flex-col justify-between space-y-6 shadow-sm"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                    srv.active
                      ? 'bg-[#e8f5e9] text-[#2e7d32]'
                      : 'bg-[#f4f2ee] text-[#72787e]'
                  }`}
                >
                  {srv.active ? 'Accepting Orders' : 'Bookings Closed'}
                </span>
                <button
                  onClick={() => onUpdateService(srv.id, { active: !srv.active })}
                  className="text-xs font-mono underline text-[#575953] hover:text-[#1b1c1a]"
                >
                  {srv.active ? 'Pause Service' : 'Reactivate'}
                </button>
              </div>

              <div>
                <h3 className="font-serif text-xl font-medium text-[#1b1c1a]">
                  {srv.title}
                </h3>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-mono text-2xl font-semibold text-[#1b1c1a]">
                    ${srv.basePrice.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-[#72787e]">{srv.currency} base</span>
                </div>
              </div>

              <p className="text-xs text-[#575953] leading-relaxed line-clamp-3">
                {srv.description}
              </p>

              <div className="space-y-1 text-xs font-mono text-[#72787e] pt-2 border-t border-[#f0ede8]">
                <div>• Turnaround: ~{srv.turnaroundWeeks} weeks</div>
                <div>• Revisions: {srv.revisionsIncluded} review milestones</div>
                <div>• Deliverables: {srv.deliverables.length} included items</div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#f0ede8] flex items-center justify-between text-xs font-mono">
              <span className="text-[#72787e]">ID: {srv.id}</span>
              <button
                onClick={() => {
                  if (window.confirm(`Delete service "${srv.title}"?`)) {
                    onDeleteService(srv.id);
                  }
                }}
                className="text-[#c62828] hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fbf9f6] border border-[#e4e2df] w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-[#72787e] hover:text-[#1b1c1a]"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#72787e]">
                  Commission Architecture
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#1b1c1a] mt-1">
                  Create Commission Offering
                </h3>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Architectural Hearth Totem or Custom Vessel"
                  className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                  Service Description & Parameters
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe scope, material choices, scale, and consultation process..."
                  className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                    Base Price (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                    Lead Time (Weeks) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.turnaroundWeeks}
                    onChange={(e) => setFormData({ ...formData, turnaroundWeeks: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                    Revisions Included
                  </label>
                  <input
                    type="number"
                    value={formData.revisionsIncluded}
                    onChange={(e) => setFormData({ ...formData, revisionsIncluded: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                  Deliverables & Milestones (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.deliverablesString}
                  onChange={(e) => setFormData({ ...formData, deliverablesString: e.target.value })}
                  placeholder="e.g. Clay maquette sign-off, Firing photos, Certificate of authenticity"
                  className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                />
              </div>

              <div className="pt-4 border-t border-[#e4e2df] flex items-center justify-between">
                <span className="text-xs font-mono text-[#72787e]">
                  Published live to @{creator.handle} profile
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-colors"
                >
                  Publish Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
