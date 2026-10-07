import React, { useState } from 'react';
import { Artwork, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface InquiryModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  artwork,
  isOpen,
  onClose,
  currency,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cityCountry: '',
    inquiryType: 'acquisition',
    deliveryMethod: 'white_glove',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !artwork) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#fbf9f6] border border-[#e4e2df] w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-6 right-6 text-[#72787e] hover:text-[#1b1c1a] p-1"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#e8e6e1] flex items-center justify-center text-[#1b1c1a]">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <h3 className="font-serif text-2xl font-normal text-[#1b1c1a]">
              Inquiry Dispatched to {artwork.artistName}
            </h3>
            <p className="text-sm text-[#575953] max-w-md mx-auto leading-relaxed">
              Your message and acquisition interest for <strong className="font-medium text-[#1b1c1a]">"{artwork.title}"</strong> has been relayed directly to the artist's studio team. You will receive an official dossier and insured shipping breakdown within 24 hours.
            </p>
            <div className="p-4 bg-[#f4f2ee] border border-[#e4e2df] text-xs font-mono text-[#575953] text-left max-w-md mx-auto mt-4 space-y-1">
              <div>Reference Code: ATL-{artwork.id.toUpperCase()}-{Date.now().toString().slice(-4)}</div>
              <div>Custodial Escrow: 100% Artist Direct Payout</div>
              <div>Condition Report: Authenticated by Atelier Provenance Ledger</div>
            </div>
            <button
              onClick={handleReset}
              className="mt-6 px-8 py-3 bg-[#1b1c1a] text-white text-xs uppercase tracking-widest font-mono hover:bg-[#333532] transition-colors"
            >
              Return to Artwork
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#72787e]">
                Direct Studio Dialogue
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1b1c1a] mt-1">
                Acquisition & Studio Inquiry
              </h2>
              <div className="flex items-center gap-3 mt-3 p-3 bg-[#f4f2ee] border border-[#e4e2df]">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-14 h-14 object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-serif text-base text-[#1b1c1a] truncate font-medium">
                    {artwork.title}
                  </p>
                  <p className="text-xs text-[#72787e] truncate">
                    {artwork.artistName} • {artwork.medium}
                  </p>
                  <p className="text-xs font-mono font-medium text-[#1b1c1a] mt-0.5">
                    {formatPrice(artwork.price, currency)}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lady Clara Sterling"
                    className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="patron@estate.org"
                    className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                    City & Country of Delivery
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cityCountry}
                    onChange={(e) => setFormData({ ...formData, cityCountry: e.target.value })}
                    placeholder="e.g. Geneva, Switzerland"
                    className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                    Inquiry Intent
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  >
                    <option value="acquisition">Direct Piece Acquisition</option>
                    <option value="curatorial">Curatorial / Institutional Loan</option>
                    <option value="commission">Custom Studio Commission</option>
                    <option value="studio_visit">Private Atelier Studio Visit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                  Logistical & Handling Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className={`p-3 border cursor-pointer flex items-start gap-2 ${formData.deliveryMethod === 'white_glove' ? 'border-[#1b1c1a] bg-[#f4f2ee]' : 'border-[#d2cfc9] bg-white'}`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="white_glove"
                      checked={formData.deliveryMethod === 'white_glove'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'white_glove' })}
                      className="mt-0.5"
                    />
                    <div>
                      <span className="font-medium text-[#1b1c1a]">Museum-Grade White Glove</span>
                      <p className="text-[#72787e] text-[11px] mt-0.5">Custom timber crating, temperature controlled, climate insured.</p>
                    </div>
                  </label>
                  <label className={`p-3 border cursor-pointer flex items-start gap-2 ${formData.deliveryMethod === 'studio_pickup' ? 'border-[#1b1c1a] bg-[#f4f2ee]' : 'border-[#d2cfc9] bg-white'}`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="studio_pickup"
                      checked={formData.deliveryMethod === 'studio_pickup'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'studio_pickup' })}
                      className="mt-0.5"
                    />
                    <div>
                      <span className="font-medium text-[#1b1c1a]">Personal Studio Collection</span>
                      <p className="text-[#72787e] text-[11px] mt-0.5">Collect directly from artist's studio in {artwork.artistLocation}.</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                  Private Note to Artist
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Inquire regarding physical inspection, custom plinths, or collection placement..."
                  className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <span className="text-[11px] text-[#72787e] font-sans">
                  Guaranteed 0% secondary gallery surcharges.
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#1b1c1a] text-white text-xs uppercase tracking-widest font-mono hover:bg-[#333532] transition-colors"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
