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
    theme: 'carbon',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#121312] border border-white/[0.08] w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl text-[#fbf9f6]">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-[#73716b] hover:text-white p-1 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-14 h-14 mx-auto border border-emerald-500/40 bg-emerald-950/40 flex items-center justify-center text-emerald-400">
              <span className="material-symbols-outlined text-3xl">auto_stories</span>
            </div>
            <h3 className="font-serif text-3xl font-medium text-[#fbf9f6]">
              Your Monograph Is Live
            </h3>
            <p className="text-sm text-[#a6a49f] max-w-md mx-auto leading-relaxed font-sans">
              Congratulations, <strong className="text-white">{artistData.name}</strong>. Your atelier workspace and digital catalogue have been published with 0% commission direct patronage enabled.
            </p>
            <div className="p-4 bg-[#171817] border border-white/[0.08] max-w-md mx-auto text-left font-mono text-xs space-y-1.5">
              <div>Monograph URL: <span className="text-[#f5c28e]">atelier.art/@{artistData.name.toLowerCase().replace(/\s+/g, '-') || 'studio'}</span></div>
              <div>Direct Inquiries: <span className="text-emerald-400">Enabled to studio inbox</span></div>
              <div>Catalog Status: 1 Masterwork Specimen Catalogued</div>
            </div>
            <button
              onClick={handleClose}
              className="mt-6 px-8 py-3.5 bg-[#c2623a] text-white text-xs uppercase tracking-widest font-mono hover:bg-[#d67248] transition-colors shadow-lg"
            >
              Explore the Platform
            </button>
          </div>
        ) : (
          <div>
            {/* Step Indicator */}
            <div className="mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#a6a49f] mb-2">
                <span className="text-[#c2623a]">MONOGRAPH BUILDER</span>
                <span>STEP {step} OF 4</span>
              </div>
              <div className="flex gap-1 h-1 bg-white/10">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 transition-all duration-300 ${
                      step >= s ? 'bg-[#c2623a]' : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleNext}>
              {/* STEP 1: Basic Atelier Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#fbf9f6] tracking-tight">
                    Establish Your Atelier Monograph
                  </h2>
                  <p className="text-sm text-[#a6a49f] leading-relaxed font-sans">
                    Set up your dedicated digital catalog for exhibitions, patron acquisitions, and studio documentation.
                  </p>

                  <div className="space-y-3.5 pt-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-mono text-[#a6a49f] mb-1">
                        Artist or Foundry Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={artistData.name}
                        onChange={(e) => setArtistData({ ...artistData, name: e.target.value })}
                        placeholder="e.g. Kaori Murata"
                        className="w-full px-3 py-2.5 bg-[#171817] border border-white/[0.08] text-sm text-[#fbf9f6] placeholder-[#73716b] focus:outline-none focus:border-[#c2623a]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-[#a6a49f] mb-1">
                          Studio Location *
                        </label>
                        <input
                          type="text"
                          required
                          value={artistData.location}
                          onChange={(e) => setArtistData({ ...artistData, location: e.target.value })}
                          placeholder="e.g. Kyoto & Stockholm"
                          className="w-full px-3 py-2.5 bg-[#171817] border border-white/[0.08] text-sm text-[#fbf9f6] placeholder-[#73716b] focus:outline-none focus:border-[#c2623a]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-[#a6a49f] mb-1">
                          Primary Medium
                        </label>
                        <select
                          value={artistData.discipline}
                          onChange={(e) => setArtistData({ ...artistData, discipline: e.target.value })}
                          className="w-full px-3 py-2.5 bg-[#171817] border border-white/[0.08] text-sm text-[#fbf9f6] focus:outline-none focus:border-[#c2623a]"
                        >
                          <option value="Ceramics & Stoneware" className="bg-[#171817]">Ceramics & Stoneware</option>
                          <option value="Abstract Oil & Mixed Media" className="bg-[#171817]">Abstract Oil & Canvas</option>
                          <option value="Woodcraft & Sculptural Furniture" className="bg-[#171817]">Woodcraft & Joinery</option>
                          <option value="Architectural Textiles & Fiber" className="bg-[#171817]">Fiber & Textiles</option>
                          <option value="Sculpture & Foundry Bronze" className="bg-[#171817]">Sculpture & Bronze</option>
                          <option value="Printmaking & Archival Inks" className="bg-[#171817]">Printmaking & Etching</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Artist Statement & Philosophy */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#fbf9f6] tracking-tight">
                    Artistic Philosophy & Bio
                  </h2>
                  <p className="text-sm text-[#a6a49f] font-sans">
                    Patrons on Atelier cherish provenance and intentionality over fast output.
                  </p>

                  <div className="space-y-3.5 pt-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-mono text-[#a6a49f] mb-1">
                        Core Motto or Epigraph
                      </label>
                      <input
                        type="text"
                        value={artistData.quote}
                        onChange={(e) => setArtistData({ ...artistData, quote: e.target.value })}
                        placeholder="e.g. Listening to the quiet tension between unrefined clay and fire."
                        className="w-full px-3 py-2.5 bg-[#171817] border border-white/[0.08] text-sm text-[#fbf9f6] placeholder-[#73716b] focus:outline-none focus:border-[#c2623a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-mono text-[#a6a49f] mb-1">
                        Studio Biography
                      </label>
                      <textarea
                        rows={4}
                        value={artistData.bio}
                        onChange={(e) => setArtistData({ ...artistData, bio: e.target.value })}
                        placeholder="Describe your training, studio methods, kiln/brush techniques, and material ethics..."
                        className="w-full px-3 py-2.5 bg-[#171817] border border-white/[0.08] text-sm text-[#fbf9f6] placeholder-[#73716b] focus:outline-none focus:border-[#c2623a] resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: First Masterwork Entry */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#fbf9f6] tracking-tight">
                    Catalogue Your First Masterwork
                  </h2>
                  <p className="text-sm text-[#a6a49f] font-sans">
                    Add your flagship work to anchor your monograph showcase.
                  </p>

                  <div className="space-y-3.5 pt-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-mono text-[#a6a49f] mb-1">
                        Artwork Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={artworkData.title}
                        onChange={(e) => setArtworkData({ ...artworkData, title: e.target.value })}
                        placeholder="e.g. Vessel in Kuro-yū No. 12"
                        className="w-full px-3 py-2.5 bg-[#171817] border border-white/[0.08] text-sm text-[#fbf9f6] placeholder-[#73716b] focus:outline-none focus:border-[#c2623a]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-[#a6a49f] mb-1">
                          Dimensions
                        </label>
                        <input
                          type="text"
                          value={artworkData.dimensions}
                          onChange={(e) => setArtworkData({ ...artworkData, dimensions: e.target.value })}
                          placeholder="e.g. 38 × 22 × 22 cm"
                          className="w-full px-3 py-2.5 bg-[#171817] border border-white/[0.08] text-sm text-[#fbf9f6] placeholder-[#73716b] focus:outline-none focus:border-[#c2623a]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-[#a6a49f] mb-1">
                          Direct Acquisition Price ($ USD)
                        </label>
                        <input
                          type="number"
                          value={artworkData.price}
                          onChange={(e) => setArtworkData({ ...artworkData, price: Number(e.target.value) })}
                          placeholder="1800"
                          className="w-full px-3 py-2.5 bg-[#171817] border border-white/[0.08] text-sm text-[#fbf9f6] placeholder-[#73716b] focus:outline-none focus:border-[#c2623a]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-mono text-[#a6a49f] mb-1">
                        High-Resolution Photograph URL
                      </label>
                      <div className="flex items-center gap-3">
                        <img
                          src={artworkData.imageUrl}
                          alt="Preview"
                          className="w-16 h-16 object-cover border border-white/[0.08] bg-[#121312]"
                        />
                        <input
                          type="text"
                          value={artworkData.imageUrl}
                          onChange={(e) => setArtworkData({ ...artworkData, imageUrl: e.target.value })}
                          className="flex-1 px-3 py-2.5 bg-[#171817] border border-white/[0.08] text-xs font-mono text-[#fbf9f6] focus:outline-none focus:border-[#c2623a]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Monograph Layout & Aesthetic */}
              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#fbf9f6] tracking-tight">
                    Select Monograph Palette
                  </h2>
                  <p className="text-sm text-[#a6a49f] font-sans">
                    Every Atelier portfolio features editorial typography inspired by museum art monographs.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      { id: 'carbon', title: 'Carbon Obsidian', desc: 'Deep gallery charcoal & gold specs', bg: 'bg-[#171817] text-[#fbf9f6]' },
                      { id: 'terracotta', title: 'Venetian Ochre', desc: 'Warm rust accents & aged paper', bg: 'bg-[#221a17] text-[#fbf9f6]' },
                      { id: 'basalt', title: 'Silver Basalt', desc: 'Fine cool granite & platinum', bg: 'bg-[#1a1c1a] text-[#fbf9f6]' },
                    ].map((pal) => (
                      <button
                        type="button"
                        key={pal.id}
                        onClick={() => setArtistData({ ...artistData, theme: pal.id })}
                        className={`p-4 border text-left transition-all ${
                          artistData.theme === pal.id
                            ? 'border-[#c2623a] ring-2 ring-[#c2623a]'
                            : 'border-white/10 hover:border-white/25'
                        } ${pal.bg}`}
                      >
                        <h4 className="font-serif text-base font-medium">{pal.title}</h4>
                        <p className="text-[11px] mt-1 text-[#a6a49f]">{pal.desc}</p>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-[#171817] border border-white/[0.08] text-xs text-[#a6a49f] space-y-1.5 mt-4">
                    <p className="font-medium text-white font-mono uppercase tracking-wider">Included With Your Atelier Monograph:</p>
                    <ul className="list-disc pl-4 space-y-1 mt-1 font-sans">
                      <li>Independent domain & museum-grade presentation</li>
                      <li>0% commission direct studio acquisition forms</li>
                      <li>Provenance Certificate ledger generator for patrons</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-[#a6a49f] hover:text-white transition-colors"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  className="px-7 py-3 bg-[#c2623a] text-white text-xs uppercase tracking-widest font-mono hover:bg-[#d67248] transition-colors shadow-lg"
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
