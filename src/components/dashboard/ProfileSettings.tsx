import React, { useState } from 'react';
import { Creator } from '../../types';
import { generateArtistBio } from '../../services/aiService';

interface ProfileSettingsProps {
  creator: Creator;
  onUpdateCreator: (updates: Partial<Creator>) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  creator,
  onUpdateCreator,
}) => {
  const [formData, setFormData] = useState({
    handle: creator.handle,
    name: creator.name,
    tagline: creator.tagline,
    bio: creator.bio,
    location: creator.location,
    medium: creator.medium,
    avatarUrl: creator.avatarUrl,
    instagram: creator.socialLinks.instagram || '',
    website: creator.socialLinks.website || '',
    email: creator.socialLinks.email || '',
    aiKeywords: 'tactile memory, tectonic weight, coarse grogged stoneware, elemental fire',
  });

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleAiBio = async () => {
    setIsAiLoading(true);
    try {
      const res = await generateArtistBio({
        name: formData.name,
        medium: formData.medium,
        location: formData.location,
        philosophyKeywords: formData.aiKeywords,
      });

      setFormData((prev) => ({
        ...prev,
        tagline: res.tagline,
        bio: res.bio,
      }));
    } catch (e) {
      console.error('AI bio generation error', e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    onUpdateCreator({
      handle: formData.handle.toLowerCase().trim(),
      name: formData.name,
      tagline: formData.tagline,
      bio: formData.bio,
      location: formData.location,
      medium: formData.medium,
      avatarUrl: formData.avatarUrl,
      socialLinks: {
        instagram: formData.instagram || undefined,
        website: formData.website || undefined,
        email: formData.email || undefined,
      },
    });

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-[#e4e2df] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#72787e]">
            Studio Identity
          </span>
          <h2 className="font-serif text-3xl font-normal text-[#1b1c1a] mt-1">
            Artist Profile & Identity Settings
          </h2>
          <p className="text-xs text-[#575953] font-mono mt-1">
            Public link: atelier.app/@{creator.handle}
          </p>
        </div>

        {savedNotice && (
          <span className="text-xs font-mono text-[#2e7d32] bg-[#e8f5e9] px-3 py-1 font-semibold animate-in fade-in">
            ✓ Settings Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white border border-[#e4e2df] p-6 sm:p-10 shadow-sm">
        {/* Handle & Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
              Unique Handle (@handle) *
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2 bg-[#f4f2ee] border border-r-0 border-[#d2cfc9] text-xs font-mono text-[#72787e]">
                @
              </span>
              <input
                type="text"
                required
                value={formData.handle}
                onChange={(e) => setFormData({ ...formData, handle: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') })}
                className="flex-1 px-3 py-2 bg-white border border-[#d2cfc9] text-sm font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
              />
            </div>
            <span className="text-[10px] text-[#72787e] font-mono mt-0.5 block">
              Shareable identity: atelier.app/@{formData.handle}
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
              Artist / Studio Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
            />
          </div>
        </div>

        {/* Medium & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
              Primary Medium / Discipline *
            </label>
            <input
              type="text"
              required
              value={formData.medium}
              onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
              Studio Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
            />
          </div>
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
            Studio Tagline / Epigraph
          </label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            placeholder="e.g. Architectural Stoneware, Monolithic Vessels & Mineral Reduction"
            className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
          />
        </div>

        {/* AI Bio Generator Box */}
        <div className="p-4 bg-[#f0ede8] border border-[#d2cfc9] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#1b1c1a] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>AI Portfolio / Bio Assistant (Gemini)</span>
            </span>
            <button
              type="button"
              onClick={handleAiBio}
              disabled={isAiLoading}
              className="px-3 py-1 bg-[#1b1c1a] text-white text-[11px] font-mono uppercase tracking-wider hover:bg-[#343734] transition-colors disabled:opacity-50"
            >
              {isAiLoading ? 'Synthesizing...' : '✨ Generate Bio & Tagline'}
            </button>
          </div>
          <input
            type="text"
            value={formData.aiKeywords}
            onChange={(e) => setFormData({ ...formData, aiKeywords: e.target.value })}
            placeholder="Style or philosophy keywords: e.g. wabi-sabi, 72-hour anagama kiln, architectural mass..."
            className="w-full px-3 py-1.5 bg-white border border-[#d2cfc9] text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
          />
        </div>

        {/* Bio Textarea */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
            Artist Statement & Biography
          </label>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a] leading-relaxed resize-none"
          />
        </div>

        {/* Social Links & Avatar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
              Instagram Handle
            </label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              placeholder="e.g. mayachen.studio"
              className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
              Studio Website
            </label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="e.g. mayachen.art"
              className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
              Studio Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. maya@atelier.app"
              className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
            />
          </div>
        </div>

        {/* Avatar URL */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
            Studio Portrait / Avatar URL
          </label>
          <div className="flex items-center gap-3">
            <img
              src={formData.avatarUrl}
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover border border-[#d2cfc9]"
            />
            <input
              type="text"
              value={formData.avatarUrl}
              onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
              className="flex-1 px-3 py-2 bg-white border border-[#d2cfc9] text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
            />
          </div>
        </div>

        {/* Save CTA */}
        <div className="pt-6 border-t border-[#e4e2df] flex items-center justify-between">
          <span className="text-xs font-mono text-[#72787e]">
            Live updates reflect instantly across public profile
          </span>
          <button
            type="submit"
            className="px-8 py-3 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-colors"
          >
            Save Profile Settings
          </button>
        </div>
      </form>
    </div>
  );
};
