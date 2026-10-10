import React, { useState } from 'react';
import { Artwork, Collection, Creator } from '../../types';
import { generateArtworkMetadata } from '../../services/aiService';

interface ArtworkManagerProps {
  artworks: Artwork[];
  collections: Collection[];
  creator: Creator;
  onCreateArtwork: (artwork: Artwork) => void;
  onUpdateArtwork: (id: string, updates: Partial<Artwork>) => void;
  onDeleteArtwork: (id: string) => void;
  onSetFeatured: (id: string) => void;
}

export const ArtworkManager: React.FC<ArtworkManagerProps> = ({
  artworks,
  collections,
  creator,
  onCreateArtwork,
  onUpdateArtwork,
  onDeleteArtwork,
  onSetFeatured,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    medium: creator.medium,
    year: new Date().getFullYear(),
    dimensions: '32 × 22 × 22 cm',
    collectionId: collections[0]?.id || '',
    price: 1800,
    tagsString: 'stoneware, wood-fired, monolith',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCYJbwpwV-3cgDvXdipwer65B0xikHcyR8stgkXoymzhFIbbIKNUbmlgBLUwKcRHIMRWV4VcYu_xsg1oosB3EiF5BbcK5ZLJ1y7XvD3AxRNuhiI-N2wlnV6ONPyvmxLzv3iVgTJiiv0w8QfgepPXBeBHv6IiVNNNjrOND4fjJ_2yjSow7t1CREu7Yn9DhpJPmn8Zk8RytNV6mQo3ZXyxhJXtzpieQDKf9CY-3Mm86ygt8ZAi9mDxMVZ',
    roughAiPrompt: '',
  });

  const handleAiAssistance = async () => {
    setIsAiLoading(true);
    try {
      const res = await generateArtworkMetadata({
        titleHint: formData.title,
        medium: formData.medium,
        roughNotes: formData.roughAiPrompt || formData.description,
        creatorName: creator.name,
      });

      setFormData((prev) => ({
        ...prev,
        title: prev.title || res.suggestedTitle,
        description: res.description,
        dimensions: res.suggestedDimensions || prev.dimensions,
        medium: res.detailedMedium || prev.medium,
        tagsString: res.tags.join(', '),
      }));
    } catch (e) {
      console.error('AI assistant error', e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tags = formData.tagsString
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    const newArt: Artwork = {
      id: `art-${Date.now().toString().slice(-6)}`,
      creatorId: creator.id,
      collectionId: formData.collectionId || undefined,
      title: formData.title || 'Untitled Work',
      description: formData.description,
      images: [formData.imageUrl],
      medium: formData.medium,
      year: Number(formData.year) || new Date().getFullYear(),
      dimensions: formData.dimensions,
      tags,
      featured: artworks.length === 0,
      status: 'available',
      price: Number(formData.price) || undefined,
      createdAt: new Date().toISOString(),
    };

    onCreateArtwork(newArt);
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      medium: creator.medium,
      year: new Date().getFullYear(),
      dimensions: '32 × 22 × 22 cm',
      collectionId: collections[0]?.id || '',
      price: 1800,
      tagsString: 'stoneware, wood-fired, monolith',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYJbwpwV-3cgDvXdipwer65B0xikHcyR8stgkXoymzhFIbbIKNUbmlgBLUwKcRHIMRWV4VcYu_xsg1oosB3EiF5BbcK5ZLJ1y7XvD3AxRNuhiI-N2wlnV6ONPyvmxLzv3iVgTJiiv0w8QfgepPXBeBHv6IiVNNNjrOND4fjJ_2yjSow7t1CREu7Yn9DhpJPmn8Zk8RytNV6mQo3ZXyxhJXtzpieQDKf9CY-3Mm86ygt8ZAi9mDxMVZ',
      roughAiPrompt: '',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e4e2df] pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
            Portfolio Curation
          </span>
          <h2 className="font-serif text-3xl font-normal text-[#1b1c1a] mt-1">
            Artwork Catalog ({artworks.length})
          </h2>
          <p className="text-xs text-[#575953] font-mono mt-1">
            High-resolution artwork entries, collections, and featured monograph hero
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>Add Artwork</span>
        </button>
      </div>

      {/* Artworks List */}
      <div className="bg-white border border-[#e4e2df] divide-y divide-[#eceae6]">
        {artworks.map((art) => {
          const col = collections.find((c) => c.id === art.collectionId);

          return (
            <div
              key={art.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#faf8f5] transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={art.images[0]}
                  alt={art.title}
                  className="w-16 h-16 object-cover border border-[#e4e2df] flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-lg font-medium text-[#1b1c1a]">
                      {art.title}
                    </h4>
                    {art.featured && (
                      <span className="px-2 py-0.5 bg-[#1b1c1a] text-white text-[9px] font-mono uppercase tracking-wider">
                        Featured Hero
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#72787e] font-mono">
                    {art.medium} • {art.year} • {art.dimensions}
                  </p>
                  {col && (
                    <span className="text-[11px] font-mono text-[#575953] block mt-0.5">
                      Series: {col.title}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center text-xs font-mono">
                <span className="font-semibold text-[#1b1c1a]">
                  {art.price ? `$${art.price.toLocaleString()}` : '—'}
                </span>

                <select
                  value={art.status}
                  onChange={(e) => onUpdateArtwork(art.id, { status: e.target.value as any })}
                  aria-label="Update artwork availability status"
                  className="px-2.5 py-1 bg-[#f4f2ee] border border-[#d2cfc9] text-xs text-[#1b1c1a]"
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="private_collection">In Collection</option>
                  <option value="exhibition_loan">Museum Loan</option>
                </select>

                {!art.featured && (
                  <button
                    onClick={() => onSetFeatured(art.id)}
                    className="px-2.5 py-1 text-[#575953] hover:text-[#1b1c1a] border border-[#d2cfc9] hover:border-[#1b1c1a]"
                    title="Set as featured flagship work on monograph"
                  >
                    Set Featured
                  </button>
                )}

                <button
                  onClick={() => {
                    if (window.confirm(`Delete artwork "${art.title}"?`)) {
                      onDeleteArtwork(art.id);
                    }
                  }}
                  className="text-[#c62828] hover:underline px-1"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Artwork Modal with AI Metadata Assistant */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fbf9f6] border border-[#e4e2df] w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-[#72787e] hover:text-[#1b1c1a]"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#72787e]">
                  Monograph Cataloguing
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1b1c1a] mt-1">
                  Catalogue New Artwork
                </h3>
              </div>

              {/* AI Assistant Quick Box */}
              <div className="p-4 bg-[#f0ede8] border border-[#d2cfc9] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#1b1c1a] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    <span>AI Artwork Metadata Assistant (Gemini)</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleAiAssistance}
                    disabled={isAiLoading}
                    className="px-3 py-1 bg-[#1b1c1a] text-white text-[11px] font-mono uppercase tracking-wider hover:bg-[#343734] transition-colors disabled:opacity-50"
                  >
                    {isAiLoading ? 'Synthesizing...' : '✨ Generate Metadata'}
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.roughAiPrompt}
                  onChange={(e) => setFormData({ ...formData, roughAiPrompt: e.target.value })}
                  placeholder="Type a brief description, firing technique, or notes (e.g. anagama reduction, natural wood ash crust on shoulder)..."
                  className="w-full px-3 py-1.5 bg-white border border-[#d2cfc9] text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                />
              </div>

              {/* Title & Medium */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                    Artwork Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Vessel in Kuro-yū (VII)"
                    className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                    Technical Medium *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.medium}
                    onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                    placeholder="e.g. Wood-fired Shigaraki stoneware"
                    className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                  Curatorial Statement / Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Evocative description of physical technique, clay body, and tactile finish..."
                  className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a] resize-none"
                />
              </div>

              {/* Dimensions, Year, Price, Collection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    placeholder="34 × 22 × 22 cm"
                    className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                    Creation Year
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                    Collection / Series
                  </label>
                  <select
                    value={formData.collectionId}
                    onChange={(e) => setFormData({ ...formData, collectionId: e.target.value })}
                    aria-label="Assign to collection or series"
                    className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  >
                    <option value="">No Collection</option>
                    {collections.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags & High-Res Image URL */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                  Monograph Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tagsString}
                  onChange={(e) => setFormData({ ...formData, tagsString: e.target.value })}
                  placeholder="e.g. stoneware, reduction, monolith"
                  className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                  Artwork High-Resolution Photograph URL
                </label>
                <div className="flex items-center gap-3">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-14 h-14 object-cover border border-[#d2cfc9] flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="flex-1 px-3 py-2 bg-white border border-[#d2cfc9] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#e4e2df] flex items-center justify-between">
                <span className="text-xs font-mono text-[#72787e]">
                  Human editable before publishing
                </span>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-colors"
                >
                  Save to Monograph
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
