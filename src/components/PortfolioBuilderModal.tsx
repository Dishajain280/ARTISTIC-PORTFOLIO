import React, { useState } from 'react';
import { Artist, Artwork } from '../types';

interface PortfolioBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onArtistCreated?: (newArtist: Artist, firstArtwork?: Artwork) => void;
}

export const PortfolioBuilderModal: React.FC<PortfolioBuilderModalProps> = ({
  isOpen,
  onClose,
  onArtistCreated,
}) => {
  const [step, setStep] = useState<number>(1);
  const [artistData, setArtistData] = useState({
    name: '',
    location: '',
    discipline: 'Ceramics & Stoneware',
    quote: '',
    bio: '',
    theme: 'linen',
  });

  const [artworkData, setArtworkData] = useState({
    title: '',
    medium: 'Wood-fired stoneware and natural ash',
    dimensions: '32 × 24 × 24 cm',
    price: 1800,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCYJbwpwV-3cgDvXdipwer65B0xikHcyR8stgkXoymzhFIbbIKNUbmlgBLUwKcRHIMRWV4VcYu_xsg1oosB3EiF5BbcK5ZLJ1y7XvD3AxRNuhiI-N2wlnV6ONPyvmxLzv3iVgTJiiv0w8QfgepPXBeBHv6IiVNNNjrOND4fjJ_2yjSow7t1CREu7Yn9DhpJPmn8Zk8RytNV6mQo3ZXyxhJXtzpieQDKf9CY-3Mm86ygt8ZAi9mDxMVZ',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Finalize
      const newArtistId = artistData.name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'new-creator';
      const createdArtist: Artist = {
        id: newArtistId,
        name: artistData.name || 'Unnamed Artisan',
        location: artistData.location || 'Independent Atelier',
        medium: artistData.discipline,
        discipline: artistData.discipline.split('&')[0].trim(),
        quote: artistData.quote || 'Crafting timeless tactile objects with ancestral techniques.',
        bio: artistData.bio || 'Independent atelier focused on mindful production and natural materiality.',
        avatarUrl: artworkData.imageUrl,
        heroImageUrl: artworkData.imageUrl,
        galleryRepresentation: 'Direct Studio Monograph',
        artworksCount: 1,
        availablePiecesCount: 1,
        selectedMasterworkTitle: artworkData.title || 'Untitled Work I',
        selectedMasterworkYear: new Date().getFullYear(),
        selectedMasterworkImage: artworkData.imageUrl,
        featuredWorkIds: [`piece-${Date.now()}`],
        exhibitions: [
          {
            year: new Date().getFullYear(),
            title: 'Inaugural Monograph Exhibition',
            venue: 'Atelier Global Salon',
          },
        ],
      };

      const createdArtwork: Artwork = {
        id: `piece-${Date.now()}`,
        title: artworkData.title || 'Untitled Piece',
        artistId: newArtistId,
        artistName: createdArtist.name,
        artistLocation: createdArtist.location,
        artistAvatar: createdArtist.avatarUrl,
        medium: artworkData.medium,
        mediumCategory: 'Ceramics & Stoneware',
        year: new Date().getFullYear(),
        price: artworkData.price,
        status: 'available',
        dimensions: artworkData.dimensions,
        imageUrl: artworkData.imageUrl,
        altText: artworkData.title,
        curatorialStatement: artistData.quote,
      };

      if (onArtistCreated) {
        onArtistCreated(createdArtist, createdArtwork);
      }
      setIsSuccess(true);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setStep(1);
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

        {isSuccess ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#e8e6e1] flex items-center justify-center text-[#1b1c1a]">
              <span className="material-symbols-outlined text-3xl">auto_stories</span>
            </div>
            <h3 className="font-serif text-3xl font-medium text-[#1b1c1a]">
              Your Monograph Is Live
            </h3>
            <p className="text-sm text-[#575953] max-w-md mx-auto leading-relaxed">
              Congratulations, <strong className="text-[#1b1c1a]">{artistData.name}</strong>. Your atelier workspace and digital catalogue have been published with 0% commission sales enabled.
            </p>
            <div className="p-4 bg-[#f4f2ee] border border-[#e4e2df] max-w-md mx-auto text-left font-mono text-xs space-y-1">
              <div>Monograph URL: atelier.art/{artistData.name.toLowerCase().replace(/\s+/g, '-') || 'studio'}</div>
              <div>Direct Inquiries: Enabled to your studio inbox</div>
              <div>Catalog Status: 1 Masterwork Catalogued</div>
            </div>
            <button
              onClick={handleClose}
              className="mt-6 px-8 py-3 bg-[#1b1c1a] text-white text-xs uppercase tracking-widest font-mono hover:bg-[#333532] transition-colors"
            >
              Explore the Platform
            </button>
          </div>
        ) : (
          <div>
            {/* Step Indicator */}
            <div className="mb-6 border-b border-[#e4e2df] pb-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#72787e] mb-2">
                <span>MONOGRAPH BUILDER</span>
                <span>STEP {step} OF 4</span>
              </div>
              <div className="flex gap-1 h-1 bg-[#e8e6e1]">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 transition-all duration-300 ${
                      step >= s ? 'bg-[#1b1c1a]' : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleNext}>
              {/* STEP 1: Basic Atelier Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1b1c1a]">
                    Establish Your Atelier Monograph
                  </h2>
                  <p className="text-sm text-[#575953] leading-relaxed">
                    Set up your dedicated digital catalog for exhibitions, patron acquisitions, and studio documentation.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                        Artist or Foundry Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={artistData.name}
                        onChange={(e) => setArtistData({ ...artistData, name: e.target.value })}
                        placeholder="e.g. Kaori Murata"
                        className="w-full px-3 py-2.5 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                          Studio Location *
                        </label>
                        <input
                          type="text"
                          required
                          value={artistData.location}
                          onChange={(e) => setArtistData({ ...artistData, location: e.target.value })}
                          placeholder="e.g. Kyoto & Stockholm"
                          className="w-full px-3 py-2.5 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                          Primary Medium
                        </label>
                        <select
                          value={artistData.discipline}
                          onChange={(e) => setArtistData({ ...artistData, discipline: e.target.value })}
                          className="w-full px-3 py-2.5 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                        >
                          <option value="Ceramics & Stoneware">Ceramics & Stoneware</option>
                          <option value="Abstract Oil & Mixed Media">Abstract Oil & Canvas</option>
                          <option value="Woodcraft & Sculptural Furniture">Woodcraft & Joinery</option>
                          <option value="Architectural Textiles & Fiber">Fiber & Textiles</option>
                          <option value="Sculpture & Foundry Bronze">Sculpture & Bronze</option>
                          <option value="Printmaking & Archival Inks">Printmaking & Etching</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Artist Statement & Philosophy */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1b1c1a]">
                    Artistic Philosophy & Bio
                  </h2>
                  <p className="text-sm text-[#575953]">
                    Patrons on Atelier cherish provenance and intentionality over fast output.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                        Core Motto or Epigraph
                      </label>
                      <input
                        type="text"
                        value={artistData.quote}
                        onChange={(e) => setArtistData({ ...artistData, quote: e.target.value })}
                        placeholder="e.g. Listening to the quiet tension between unrefined clay and fire."
                        className="w-full px-3 py-2.5 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                        Studio Biography
                      </label>
                      <textarea
                        rows={4}
                        value={artistData.bio}
                        onChange={(e) => setArtistData({ ...artistData, bio: e.target.value })}
                        placeholder="Describe your training, studio methods, kiln/brush techniques, and material ethics..."
                        className="w-full px-3 py-2.5 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a] resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: First Masterwork Entry */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1b1c1a]">
                    Catalogue Your First Masterwork
                  </h2>
                  <p className="text-sm text-[#575953]">
                    Add your flagship work to anchor your monograph showcase.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                        Artwork Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={artworkData.title}
                        onChange={(e) => setArtworkData({ ...artworkData, title: e.target.value })}
                        placeholder="e.g. Vessel in Kuro-yū No. 12"
                        className="w-full px-3 py-2.5 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                          Dimensions
                        </label>
                        <input
                          type="text"
                          value={artworkData.dimensions}
                          onChange={(e) => setArtworkData({ ...artworkData, dimensions: e.target.value })}
                          placeholder="e.g. 38 × 22 × 22 cm"
                          className="w-full px-3 py-2.5 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                          Direct Acquisition Price ($ USD)
                        </label>
                        <input
                          type="number"
                          value={artworkData.price}
                          onChange={(e) => setArtworkData({ ...artworkData, price: Number(e.target.value) })}
                          placeholder="1800"
                          className="w-full px-3 py-2.5 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-mono text-[#575953] mb-1">
                        High-Resolution Photograph
                      </label>
                      <div className="flex items-center gap-3">
                        <img
                          src={artworkData.imageUrl}
                          alt="Preview"
                          className="w-16 h-16 object-cover border border-[#d2cfc9]"
                        />
                        <input
                          type="text"
                          value={artworkData.imageUrl}
                          onChange={(e) => setArtworkData({ ...artworkData, imageUrl: e.target.value })}
                          className="flex-1 px-3 py-2 bg-white border border-[#d2cfc9] text-xs font-mono text-[#1b1c1a] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Monograph Layout & Aesthetic */}
              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1b1c1a]">
                    Select Monograph Palette
                  </h2>
                  <p className="text-sm text-[#575953]">
                    Every Atelier portfolio features editorial typography inspired by museum art monographs.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      { id: 'linen', title: 'Belgian Linen', desc: 'Warm ivory & charcoal contrast', bg: 'bg-[#fbf9f6] text-[#1b1c1a]' },
                      { id: 'carbon', title: 'Carbon Basalt', desc: 'Deep graphite & silver accents', bg: 'bg-[#1b1c1a] text-[#fbf9f6]' },
                      { id: 'ochre', title: 'Terra Ochre', desc: 'Earthy warmth & mineral terracotta', bg: 'bg-[#f4efe8] text-[#332e29]' },
                    ].map((pal) => (
                      <button
                        type="button"
                        key={pal.id}
                        onClick={() => setArtistData({ ...artistData, theme: pal.id })}
                        className={`p-4 border text-left transition-all ${
                          artistData.theme === pal.id
                            ? 'border-[#1b1c1a] ring-2 ring-[#1b1c1a]'
                            : 'border-[#d2cfc9] opacity-75 hover:opacity-100'
                        } ${pal.bg}`}
                      >
                        <h4 className="font-serif text-base font-medium">{pal.title}</h4>
                        <p className="text-[11px] mt-1 opacity-80">{pal.desc}</p>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-[#f4f2ee] border border-[#e4e2df] text-xs text-[#575953] space-y-1 mt-4">
                    <p className="font-medium text-[#1b1c1a]">Included With Your Atelier Monograph:</p>
                    <ul className="list-disc pl-4 space-y-0.5 mt-1">
                      <li>Independent domain & museum-grade presentation</li>
                      <li>0% commission direct studio acquisition forms</li>
                      <li>Provenance Certificate generator for patrons</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-[#e4e2df] mt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-[#575953] hover:text-[#1b1c1a] transition-colors"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  className="px-7 py-3 bg-[#1b1c1a] text-white text-xs uppercase tracking-widest font-mono hover:bg-[#333532] transition-colors"
                >
                  {step === 4 ? 'Publish Monograph' : 'Continue →'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
