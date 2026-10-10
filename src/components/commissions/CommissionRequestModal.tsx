import React, { useState } from 'react';
import { CommissionService, Creator, CommissionRequest } from '../../types';
import { generateCommissionBrief } from '../../services/aiService';

interface CommissionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: CommissionService;
  creator: Creator;
  onSubmitSuccess: (newRequest: CommissionRequest) => void;
}

export const CommissionRequestModal: React.FC<CommissionRequestModalProps> = ({
  isOpen,
  onClose,
  service,
  creator,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    spaceIntent: '',
    rawIdea: '',
    structuredBrief: '',
    budget: service.basePrice,
    targetDeadline: '',
    dimensions: '',
    referencesText: '',
  });

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<CommissionRequest | null>(null);

  if (!isOpen) return null;

  const handleAiStructure = async () => {
    if (!formData.rawIdea && !formData.spaceIntent) {
      alert('Please write a sentence or two about your idea or placement space first.');
      return;
    }

    setIsAiGenerating(true);
    try {
      const res = await generateCommissionBrief({
        clientRawIdea: formData.rawIdea || 'Bespoke sculptural piece for home entry',
        serviceTitle: service.title,
        clientSpaceOrIntent: formData.spaceIntent || 'Living room mantelpiece / niche',
        budget: formData.budget,
        timeline: formData.targetDeadline || `${service.turnaroundWeeks} weeks`,
        creatorName: creator.name,
      });

      setFormData((prev) => ({
        ...prev,
        structuredBrief: res.structuredBrief,
        dimensions: prev.dimensions || res.dimensionsRecommendation,
        referencesText: prev.referencesText || res.suggestedReferences.join(', '),
      }));
    } catch (err) {
      console.error('AI brief generation error', err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const refs = formData.referencesText
      ? formData.referencesText.split(',').map((r) => r.trim()).filter(Boolean)
      : [];

    const newRequest: CommissionRequest = {
      id: `req-${Date.now().toString().slice(-6)}`,
      creatorId: creator.id,
      serviceId: service.id,
      serviceTitle: service.title,
      clientName: formData.clientName || 'Private Patron',
      clientEmail: formData.clientEmail || 'patron@example.com',
      brief: formData.structuredBrief || formData.rawIdea || 'Custom sculptural commission inquiry.',
      references: refs,
      budget: Number(formData.budget) || service.basePrice,
      currency: service.currency,
      targetDeadline: formData.targetDeadline || undefined,
      dimensionsRequired: formData.dimensions || undefined,
      status: 'RECEIVED',
      statusNotes: 'Request submitted via public profile. Awaiting studio review.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSubmittedRequest(newRequest);
    onSubmitSuccess(newRequest);
  };

  const handleClose = () => {
    setSubmittedRequest(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#fbf9f6] border border-[#e4e2df] w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-[#72787e] hover:text-[#1b1c1a] p-1"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {submittedRequest ? (
          /* Submission Celebration Screen */
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#e8e6e1] flex items-center justify-center text-[#1b1c1a]">
              <span className="material-symbols-outlined text-3xl">task_alt</span>
            </div>
            <h3 className="font-serif text-3xl font-medium text-[#1b1c1a]">
              Commission Request Dispatched
            </h3>
            <p className="text-sm text-[#575953] max-w-md mx-auto leading-relaxed">
              Your request for <strong className="text-[#1b1c1a]">"{service.title}"</strong> has been relayed directly to <strong className="text-[#1b1c1a]">@{creator.handle}</strong>'s studio desk.
            </p>

            <div className="p-5 bg-white border border-[#e4e2df] max-w-md mx-auto text-left font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#72787e]">Request Reference:</span>
                <span className="font-semibold text-[#1b1c1a]">{submittedRequest.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#72787e]">Status:</span>
                <span className="text-[#1b5e20] font-bold">RECEIVED (In Studio Queue)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#72787e]">Client Contact:</span>
                <span>{submittedRequest.clientEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#72787e]">Proposed Budget:</span>
                <span>${submittedRequest.budget.toLocaleString()} {submittedRequest.currency}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-colors"
              >
                Return to Profile
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#f4f2ee] border border-[#e4e2df] text-[10px] font-mono uppercase tracking-wider text-[#575953] mb-2">
                <span>Structured Commission Intake</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1b1c1a]">
                Request Commission: {service.title}
              </h2>
              <p className="text-xs text-[#72787e] mt-1 font-mono">
                Direct to @{creator.handle} • Starting at ${service.basePrice.toLocaleString()} {service.currency} • ~{service.turnaroundWeeks} weeks turnaround
              </p>
            </div>

            {/* Client Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="e.g. Claire Sterling"
                  className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  placeholder="e.g. claire@sterling.com"
                  className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                />
              </div>
            </div>

            {/* Space Context & Raw Idea */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                Intended Space / Placement Context
              </label>
              <input
                type="text"
                value={formData.spaceIntent}
                onChange={(e) => setFormData({ ...formData, spaceIntent: e.target.value })}
                placeholder="e.g. Limestone fireplace niche in West Village residence, indirect morning sun"
                className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
              />
            </div>

            {/* Raw Thoughts & AI Structuring Button */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#575953]">
                  Your Ideas or Notes *
                </label>
                <button
                  type="button"
                  onClick={handleAiStructure}
                  disabled={isAiGenerating}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1b1c1a] text-white text-[11px] font-mono uppercase tracking-wider hover:bg-[#343734] transition-colors disabled:opacity-50"
                  title="Use Gemini AI to transform rough thoughts into an actionable curatorial brief"
                >
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  <span>{isAiGenerating ? 'Synthesizing...' : 'Structure Brief with AI'}</span>
                </button>
              </div>

              <textarea
                rows={formData.structuredBrief ? 2 : 4}
                required={!formData.structuredBrief}
                value={formData.rawIdea}
                onChange={(e) => setFormData({ ...formData, rawIdea: e.target.value })}
                placeholder="Describe what you have in mind: colors, silhouette inspiration, reference works by @maya, desired mood..."
                className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a] resize-none"
              />
            </div>

            {/* AI Structured Output (always editable by human) */}
            {formData.structuredBrief && (
              <div className="space-y-1.5 p-4 bg-[#f0ede8] border border-[#d2cfc9]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase font-semibold text-[#1b1c1a] flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    <span>Structured Brief (Editable by you):</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#72787e]">Gemini assisted</span>
                </div>
                <textarea
                  rows={4}
                  value={formData.structuredBrief}
                  onChange={(e) => setFormData({ ...formData, structuredBrief: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#d2cfc9] text-xs text-[#1b1c1a] leading-relaxed focus:outline-none focus:border-[#1b1c1a]"
                />
              </div>
            )}

            {/* Budget & Dimensions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                  Budget (USD) *
                </label>
                <input
                  type="number"
                  required
                  min={service.basePrice}
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a] font-mono"
                />
                <span className="text-[10px] text-[#72787e] font-mono">
                  Base price is ${service.basePrice.toLocaleString()}
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                  Desired Dimensions or Footprint
                </label>
                <input
                  type="text"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  placeholder="e.g. Approx. 40 × 24 × 24 cm"
                  className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                />
              </div>
            </div>

            {/* Target Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                  Target Completion Date
                </label>
                <input
                  type="date"
                  value={formData.targetDeadline}
                  onChange={(e) => setFormData({ ...formData, targetDeadline: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                  Aesthetic References (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.referencesText}
                  onChange={(e) => setFormData({ ...formData, referencesText: e.target.value })}
                  placeholder="e.g. Vessel 14 shoulder, Charcoal reduction"
                  className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#e4e2df] flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-[#72787e]">
                0% intermediary fee • Direct studio workflow
              </span>
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-colors"
              >
                Send Structured Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
