import React, { useState } from 'react';
import { CommissionRequest, CommissionStatus, Creator } from '../../types';

interface CommissionInboxViewProps {
  commissions: CommissionRequest[];
  creator: Creator;
  onUpdateStatus: (id: string, status: CommissionStatus, notes?: string) => void;
  onDeleteRequest: (id: string) => void;
}

const STATUS_OPTIONS: { label: string; value: CommissionStatus; color: string }[] = [
  { label: 'Received', value: 'RECEIVED', color: 'bg-[#f4f2ee] text-[#1b1c1a]' },
  { label: 'In Review', value: 'IN_REVIEW', color: 'bg-[#fff8e1] text-[#b78103]' },
  { label: 'Accepted', value: 'ACCEPTED', color: 'bg-[#e8f5e9] text-[#2e7d32]' },
  { label: 'Declined', value: 'DECLINED', color: 'bg-[#ffebee] text-[#c62828]' },
  { label: 'In Progress', value: 'IN_PROGRESS', color: 'bg-[#e3f2fd] text-[#1565c0]' },
  { label: 'Delivered', value: 'DELIVERED', color: 'bg-[#f1f8e9] text-[#33691e]' },
  { label: 'Cancelled', value: 'CANCELLED', color: 'bg-[#f5f5f5] text-[#757575]' },
];

export const CommissionInboxView: React.FC<CommissionInboxViewProps> = ({
  commissions,
  creator,
  onUpdateStatus,
  onDeleteRequest,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | CommissionStatus>('ALL');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    commissions[0]?.id || null
  );
  const [statusNoteInput, setStatusNoteInput] = useState('');

  const filtered =
    activeFilter === 'ALL'
      ? commissions
      : commissions.filter((c) => c.status === activeFilter);

  const selectedRequest = commissions.find((c) => c.id === selectedRequestId) || filtered[0];

  const handleStatusChange = (status: CommissionStatus) => {
    if (selectedRequest) {
      onUpdateStatus(selectedRequest.id, status, statusNoteInput || undefined);
      setStatusNoteInput('');
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRequest && statusNoteInput.trim()) {
      onUpdateStatus(selectedRequest.id, selectedRequest.status, statusNoteInput);
      setStatusNoteInput('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Inbox Header & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e4e2df] pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
            Studio Operations
          </span>
          <h2 className="font-serif text-3xl font-normal text-[#1b1c1a] mt-1">
            Commission Inbox ({commissions.length})
          </h2>
          <p className="text-xs text-[#575953] font-mono mt-1">
            Managing structured requests for @{creator.handle}
          </p>
        </div>

        {/* Quick status pipeline pill counts */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1.5 border transition-colors ${
              activeFilter === 'ALL'
                ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
                : 'bg-white text-[#575953] border-[#e4e2df] hover:border-[#1b1c1a]'
            }`}
          >
            All ({commissions.length})
          </button>
          <button
            onClick={() => setActiveFilter('RECEIVED')}
            className={`px-3 py-1.5 border transition-colors ${
              activeFilter === 'RECEIVED'
                ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
                : 'bg-white text-[#575953] border-[#e4e2df] hover:border-[#1b1c1a]'
            }`}
          >
            Received ({commissions.filter((c) => c.status === 'RECEIVED').length})
          </button>
          <button
            onClick={() => setActiveFilter('IN_PROGRESS')}
            className={`px-3 py-1.5 border transition-colors ${
              activeFilter === 'IN_PROGRESS'
                ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
                : 'bg-white text-[#575953] border-[#e4e2df] hover:border-[#1b1c1a]'
            }`}
          >
            In Progress ({commissions.filter((c) => c.status === 'IN_PROGRESS').length})
          </button>
          <button
            onClick={() => setActiveFilter('DELIVERED')}
            className={`px-3 py-1.5 border transition-colors ${
              activeFilter === 'DELIVERED'
                ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
                : 'bg-white text-[#575953] border-[#e4e2df] hover:border-[#1b1c1a]'
            }`}
          >
            Delivered ({commissions.filter((c) => c.status === 'DELIVERED').length})
          </button>
        </div>
      </div>

      {/* Main Two-Column Inbox View */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center bg-white border border-dashed border-[#d2cfc9] p-8">
          <span className="material-symbols-outlined text-4xl text-[#72787e]">inbox</span>
          <p className="font-serif text-xl text-[#1b1c1a] mt-2">No requests in this status view.</p>
          <button
            onClick={() => setActiveFilter('ALL')}
            className="mt-4 px-5 py-2 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-wider"
          >
            View All Requests
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Requests List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {filtered.map((req) => {
              const isSelected = selectedRequest?.id === req.id;
              const statusBadge = STATUS_OPTIONS.find((s) => s.value === req.status);

              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedRequestId(req.id)}
                  className={`p-5 border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-[#1b1c1a] shadow-md ring-1 ring-[#1b1c1a]'
                      : 'bg-white border-[#e4e2df] hover:border-[#b0ada6]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono text-[#72787e]">
                      {new Date(req.createdAt).toLocaleDateString()} • {req.id.toUpperCase()}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold ${
                        statusBadge?.color || 'bg-gray-100'
                      }`}
                    >
                      {req.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-medium text-[#1b1c1a]">
                    {req.clientName}
                  </h4>
                  <p className="text-xs text-[#72787e] font-mono">{req.serviceTitle}</p>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#f0ede8] text-xs font-mono">
                    <span className="font-semibold text-[#1b1c1a]">
                      ${req.budget.toLocaleString()} {req.currency}
                    </span>
                    {req.targetDeadline && (
                      <span className="text-[#72787e]">Due: {req.targetDeadline}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Request Dossier & Status Engine (7 cols) */}
          {selectedRequest && (
            <div className="lg:col-span-7 bg-white border border-[#e4e2df] p-6 sm:p-8 space-y-6 shadow-sm">
              {/* Header Dossier */}
              <div className="border-b border-[#e4e2df] pb-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-[#72787e] uppercase">
                      Reference #{selectedRequest.id.toUpperCase()}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1b1c1a] mt-1">
                      {selectedRequest.clientName}
                    </h3>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#72787e]">Workflow Status:</span>
                    <select
                      value={selectedRequest.status}
                      onChange={(e) => handleStatusChange(e.target.value as CommissionStatus)}
                      aria-label="Update commission request status"
                      className="px-3 py-2 bg-[#f4f2ee] border border-[#d2cfc9] text-xs font-mono font-semibold text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs font-mono">
                  <div>
                    <span className="text-[#72787e] block">Client Contact:</span>
                    <a
                      href={`mailto:${selectedRequest.clientEmail}`}
                      className="text-[#1b1c1a] hover:underline truncate block"
                    >
                      {selectedRequest.clientEmail}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#72787e] block">Service:</span>
                    <span className="text-[#1b1c1a] truncate block">
                      {selectedRequest.serviceTitle}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#72787e] block">Agreed Budget:</span>
                    <span className="text-[#1b1c1a] font-semibold block">
                      ${selectedRequest.budget.toLocaleString()} {selectedRequest.currency}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#72787e] block">Target Deadline:</span>
                    <span className="text-[#1b1c1a] block">
                      {selectedRequest.targetDeadline || 'Flexible'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Structured Brief Content */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#72787e] block">
                  Structured Commission Brief
                </span>
                <div className="p-4 bg-[#fbf9f6] border border-[#e4e2df] text-xs sm:text-sm font-sans text-[#333532] leading-relaxed whitespace-pre-line">
                  {selectedRequest.brief}
                </div>
              </div>

              {/* Physical Parameters & References */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                {selectedRequest.dimensionsRequired && (
                  <div className="p-3 bg-[#f7f5f1] border border-[#e4e2df]">
                    <span className="text-[#72787e] block">Dimensions Footprint:</span>
                    <span className="text-[#1b1c1a] font-medium">
                      {selectedRequest.dimensionsRequired}
                    </span>
                  </div>
                )}
                {selectedRequest.references.length > 0 && (
                  <div className="p-3 bg-[#f7f5f1] border border-[#e4e2df]">
                    <span className="text-[#72787e] block">Reference Cues:</span>
                    <span className="text-[#1b1c1a]">
                      {selectedRequest.references.join(' • ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Studio Status Update & Notes */}
              <div className="border-t border-[#e4e2df] pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#72787e]">
                    Studio Progress Ledger
                  </span>
                  <span className="text-xs font-mono text-[#72787e]">
                    Last updated: {new Date(selectedRequest.updatedAt).toLocaleTimeString()}
                  </span>
                </div>

                {selectedRequest.statusNotes && (
                  <div className="p-3 bg-[#e8f5e9]/40 border border-[#c8e6c9] text-xs font-mono text-[#2e7d32]">
                    <strong>Latest Update Note:</strong> {selectedRequest.statusNotes}
                  </div>
                )}

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={statusNoteInput}
                    onChange={(e) => setStatusNoteInput(e.target.value)}
                    placeholder="Log a progress milestone (e.g. Firing complete, packing crate)..."
                    className="flex-1 px-3 py-2 bg-white border border-[#d2cfc9] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#343734]"
                  >
                    Log Note
                  </button>
                </form>

                {/* Workflow Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#f0ede8]">
                  <div className="flex items-center gap-2">
                    {selectedRequest.status === 'RECEIVED' && (
                      <button
                        onClick={() => handleStatusChange('IN_REVIEW')}
                        className="px-4 py-2 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#343734]"
                      >
                        Start Review →
                      </button>
                    )}
                    {selectedRequest.status === 'IN_REVIEW' && (
                      <>
                        <button
                          onClick={() => handleStatusChange('ACCEPTED')}
                          className="px-4 py-2 bg-[#1b5e20] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#2e7d32]"
                        >
                          Accept Commission
                        </button>
                        <button
                          onClick={() => handleStatusChange('DECLINED')}
                          className="px-4 py-2 border border-[#c62828] text-[#c62828] text-xs font-mono uppercase tracking-wider hover:bg-[#ffebee]"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {selectedRequest.status === 'ACCEPTED' && (
                      <button
                        onClick={() => handleStatusChange('IN_PROGRESS')}
                        className="px-4 py-2 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#343734]"
                      >
                        Begin Production →
                      </button>
                    )}
                    {selectedRequest.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() => handleStatusChange('DELIVERED')}
                        className="px-4 py-2 bg-[#1b5e20] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#2e7d32]"
                      >
                        Mark as Delivered ✓
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm('Archive / remove this commission request?')) {
                        onDeleteRequest(selectedRequest.id);
                      }
                    }}
                    className="text-xs font-mono text-[#c62828] hover:underline"
                  >
                    Delete Request
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
