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
    patronName: '',
    representation: '',
    email: '',
    phone: '',
    cityCountry: '',
    inquiryIntent: 'acquisition',
    architecturalSetting: 'private_residence',
    displaySpecification: 'pedestal',
    cratingMethod: 'museum_crate',
    curatorialNotes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [dossierRef, setDossierRef] = useState('');

  if (!isOpen || !artwork) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `DOS-${artwork.id.substring(0, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setDossierRef(refCode);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121312] border border-white/[0.08] w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl text-[#fbf9f6]">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-6 right-6 text-[#73716b] hover:text-white p-1 transition-colors"
          aria-label="Close dossier modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-6">
            <div className="w-14 h-14 mx-auto border border-[#c2623a] flex items-center justify-center text-[#c2623a]">
              <span className="material-symbols-outlined text-2xl">check</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#a6a49f]">
                Dossier Transmitted Directly to Studio
              </span>
              <h3 className="font-serif text-3xl font-normal text-white">
                Acquisition Consultation Dispatched
              </h3>
              <p className="text-sm text-[#a6a49f] max-w-lg mx-auto leading-relaxed font-sans">
                Your private curatorial dossier regarding <em className="text-white font-serif">{artwork.title}</em> has been registered with the atelier director and transmitted directly to {artwork.artistName}.
              </p>
            </div>

            {/* Archival Confirmation Card */}
            <div className="p-6 bg-[#171817] border border-white/[0.08] text-left max-w-lg mx-auto space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="text-[#a6a49f] uppercase tracking-wider text-[11px]">Dossier Reference:</span>
                <span className="text-[#c2623a] font-semibold">{dossierRef}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#a6a49f]">Masterwork:</span>
                <span className="text-white">{artwork.title} ({artwork.year})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#a6a49f]">Artist & Atelier:</span>
                <span className="text-white">{artwork.artistName} · {artwork.artistLocation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#a6a49f]">Listing Valuation:</span>
                <span className="text-white font-semibold">{formatPrice(artwork.price, currency)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#a6a49f]">Platform Take:</span>
                <span className="text-emerald-400 font-medium">0% Sovereign (100% Artist Direct)</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[11px] text-[#73716b]">
                <span>Response Protocol:</span>
                <span>Within 24 business hours</span>
              </div>
            </div>

            <p className="text-xs text-[#73716b] font-sans max-w-md mx-auto">
              A private PDF condition report, verified provenance ledger, and insured freight estimate will be sent to <span className="text-white font-mono">{formData.email}</span>.
            </p>

            <button
              onClick={handleReset}
              className="px-8 py-3.5 border border-white/30 text-white text-xs uppercase tracking-widest font-mono hover:border-white hover:bg-white/5 transition-colors"
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          <div>
            {/* Header Lockup */}
            <div className="mb-8 pb-6 border-b border-white/[0.08]">
              <div className="text-xs font-mono uppercase tracking-widest text-[#c2623a] mb-2">
                Private Curatorial Consultation
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight">
                Acquisition Dossier
              </h2>
              <p className="text-xs sm:text-sm text-[#a6a49f] mt-1 font-sans">
                Confidential consultation with the atelier director. 100% of proceeds go directly to the artist.
              </p>

              {/* Artwork Summary Strip */}
              <div className="flex items-center gap-4 mt-6 p-4 bg-[#171817] border border-white/[0.08]">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-16 h-16 object-cover bg-black border border-white/10 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg text-white font-normal truncate">
                      {artwork.title}
                    </span>
                    <span className="font-mono text-xs font-semibold text-white ml-2 shrink-0">
                      {formatPrice(artwork.price, currency)}
                    </span>
                  </div>
                  <div className="text-xs text-[#a6a49f] mt-0.5 truncate">
                    {artwork.artistName} · {artwork.artistLocation}
                  </div>
                  <div className="text-[11px] font-mono text-[#73716b] mt-1 truncate">
                    {artwork.medium} · {artwork.dimensions || 'Dimensions on ledger'}
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Patron & Representation */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-3">
                  1. Patron & Representation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#a6a49f] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.patronName}
                      onChange={(e) => setFormData({ ...formData, patronName: e.target.value })}
                      placeholder="e.g. Lady Clara Sterling"
                      className="w-full px-3.5 py-2.5 bg-[#171817] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-[#73716b] focus:outline-none focus:border-[#c2623a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#a6a49f] mb-1">
                      Representation / Entity
                    </label>
                    <input
                      type="text"
                      value={formData.representation}
                      onChange={(e) => setFormData({ ...formData, representation: e.target.value })}
                      placeholder="Private Collection / Architectural Studio"
                      className="w-full px-3.5 py-2.5 bg-[#171817] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-[#73716b] focus:outline-none focus:border-[#c2623a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#a6a49f] mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="patron@estate.org"
                      className="w-full px-3.5 py-2.5 bg-[#171817] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-[#73716b] focus:outline-none focus:border-[#c2623a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#a6a49f] mb-1">
                      Telephone / Courier Contact
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+41 22 819 00 00"
                      className="w-full px-3.5 py-2.5 bg-[#171817] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-[#73716b] focus:outline-none focus:border-[#c2623a]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Architectural Placement & Setting */}
              <div className="pt-2 border-t border-white/10">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-3">
                  2. Architectural Setting & Display
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#a6a49f] mb-1">
                      Architectural Setting
                    </label>
                    <select
                      value={formData.architecturalSetting}
                      onChange={(e) => setFormData({ ...formData, architecturalSetting: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#171817] border border-white/[0.08] text-xs font-mono text-white focus:outline-none focus:border-[#c2623a]"
                    >
                      <option value="private_residence">Private Residence · Salon or Living Pavilion</option>
                      <option value="architectural_project">Architectural Project / Bespoke Interior</option>
                      <option value="institutional_collection">Museum / Institutional Permanent Collection</option>
                      <option value="corporate_atrium">Corporate Collection / Executive Atrium</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#a6a49f] mb-1">
                      Mounting / Plinth Specification
                    </label>
                    <select
                      value={formData.displaySpecification}
                      onChange={(e) => setFormData({ ...formData, displaySpecification: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#171817] border border-white/[0.08] text-xs font-mono text-white focus:outline-none focus:border-[#c2623a]"
                    >
                      <option value="pedestal">Freestanding Pedestal / Plinth</option>
                      <option value="niche">Architectural Niche / Recessed Shelf</option>
                      <option value="wall_mount">Direct Wall Cantilever Mount</option>
                      <option value="vitrine">Climate-Regulated Vitrine</option>
                      <option value="custom_artist_plinth">Request Custom Plinth Carved by Artist</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Delivery Logistics & Crate Handling */}
              <div className="pt-2 border-t border-white/10">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-3">
                  3. Logistics & Crate Handling
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <label
                      className={`p-3.5 border cursor-pointer flex items-start gap-3 transition-colors ${
                        formData.cratingMethod === 'museum_crate'
                          ? 'border-[#c2623a] bg-[#171817]'
                          : 'border-white/[0.08] bg-[#121312] hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="cratingMethod"
                        value="museum_crate"
                        checked={formData.cratingMethod === 'museum_crate'}
                        onChange={() => setFormData({ ...formData, cratingMethod: 'museum_crate' })}
                        className="mt-0.5 accent-[#c2623a]"
                      />
                      <div>
                        <span className="font-mono text-white block">Museum-Grade Timber Crating</span>
                        <p className="text-[#a6a49f] text-[11px] mt-1 font-sans">
                          Custom-fitted kiln-dried timber, archival foam lining, insured fine-art courier.
                        </p>
                      </div>
                    </label>

                    <label
                      className={`p-3.5 border cursor-pointer flex items-start gap-3 transition-colors ${
                        formData.cratingMethod === 'studio_visit'
                          ? 'border-[#c2623a] bg-[#171817]'
                          : 'border-white/[0.08] bg-[#121312] hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="cratingMethod"
                        value="studio_visit"
                        checked={formData.cratingMethod === 'studio_visit'}
                        onChange={() => setFormData({ ...formData, cratingMethod: 'studio_visit' })}
                        className="mt-0.5 accent-[#c2623a]"
                      />
                      <div>
                        <span className="font-mono text-white block">Private Studio Handover</span>
                        <p className="text-[#a6a49f] text-[11px] mt-1 font-sans">
                          Arrange personal studio visit and handover with the artist in {artwork.artistLocation}.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#a6a49f] mb-1">
                      Destination City & Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cityCountry}
                      onChange={(e) => setFormData({ ...formData, cityCountry: e.target.value })}
                      placeholder="e.g. Zurich, Switzerland or Milan, Italy"
                      className="w-full px-3.5 py-2.5 bg-[#171817] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-[#73716b] focus:outline-none focus:border-[#c2623a]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Curatorial Consultation Notes */}
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white">
                    4. Curatorial Note to the Atelier
                  </h3>
                  <span className="text-[11px] font-mono text-[#73716b]">Optional</span>
                </div>
                <textarea
                  rows={3}
                  value={formData.curatorialNotes}
                  onChange={(e) => setFormData({ ...formData, curatorialNotes: e.target.value })}
                  placeholder="Detail inquiries on lighting orientation, conservation documentation, or private studio visit schedule..."
                  className="w-full px-3.5 py-2.5 bg-[#171817] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-[#73716b] focus:outline-none focus:border-[#c2623a] resize-none"
                />
              </div>

              {/* Form Action */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-[#73716b] text-center sm:text-left">
                  <span>100% Artist Direct Proceeds</span>
                  <span className="mx-2">·</span>
                  <span>Zero Gallery Surcharge</span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 border border-[#c2623a] bg-[#c2623a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#d67248] transition-colors"
                >
                  Transmit Curatorial Dossier
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
