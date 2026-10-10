import React, { useState } from 'react';
import { Creator } from '../../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatorClaimed: (creator: Creator) => void;
  existingHandles: string[];
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onCreatorClaimed,
  existingHandles,
}) => {
  const [handle, setHandle] = useState('');
  const [name, setName] = useState('');
  const [medium, setMedium] = useState('Ceramics & Stoneware');
  const [location, setLocation] = useState('New York, NY');
  const [tagline, setTagline] = useState('Hand-coiled sculptural ceramics & wood-fired glazes');

  if (!isOpen) return null;

  const sanitizedHandle = handle.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  const isTaken = existingHandles.includes(sanitizedHandle);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!sanitizedHandle) {
      alert('Please enter a handle');
      return;
    }

    if (isTaken) {
      alert('This handle is already claimed. Please choose another.');
      return;
    }

    const newCreator: Creator = {
      id: `creator-${sanitizedHandle}`,
      handle: sanitizedHandle,
      name: name || `@${sanitizedHandle}`,
      tagline,
      bio: `Working from ${location}, ${name || `@${sanitizedHandle}`} creates contemporary works in ${medium}. Welcoming bespoke inquiries and direct commissions.`,
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAtJQN5uJT-T09aZOuD0K3MTbiYktbCLAxnkWV3w1MbqZuKiL_QqGmMQmIlfpObqppqLTOIdDVMltppi1S8RxDRN0xdKQRsEfTrzpbmpkkJLV2kcY4XYrYZZVo9r3xaFhGpJ6iENcPoVxs5VUCNi-n5J8mqtHfy77yRz0jjCSUk4CY2l2xAFJX6TtymihhkCSwvSHWY_I96coK1_67w0_3SaL7lsFblbu1dYth_OHr7AzgjcfKCbm8p',
      heroImageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCYJbwpwV-3cgDvXdipwer65B0xikHcyR8stgkXoymzhFIbbIKNUbmlgBLUwKcRHIMRWV4VcYu_xsg1oosB3EiF5BbcK5ZLJ1y7XvD3AxRNuhiI-N2wlnV6ONPyvmxLzv3iVgTJiiv0w8QfgepPXBeBHv6IiVNNNjrOND4fjJ_2yjSow7t1CREu7Yn9DhpJPmn8Zk8RytNV6mQo3ZXyxhJXtzpieQDKf9CY-3Mm86ygt8ZAi9mDxMVZ',
      location,
      medium,
      socialLinks: {
        instagram: `${sanitizedHandle}.studio`,
        email: `${sanitizedHandle}@atelier.app`,
      },
      themeSettings: {
        palette: 'linen',
        layout: 'editorial',
      },
      createdAt: new Date().toISOString(),
    };

    onCreatorClaimed(newCreator);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#fbf9f6] border border-[#e4e2df] w-full max-w-xl p-6 sm:p-10 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#72787e] hover:text-[#1b1c1a]"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#f4f2ee] border border-[#e4e2df] text-[10px] font-mono uppercase tracking-wider text-[#575953] mb-2">
              <span>Artist Onboarding</span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#1b1c1a]">
              Claim Your Atelier Identity
            </h2>
            <p className="text-xs text-[#575953] mt-1 font-mono">
              Establish your professional presence and commission link in seconds
            </p>
          </div>

          {/* Handle Claim */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
              Choose Unique Handle *
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2.5 bg-[#f4f2ee] border border-r-0 border-[#d2cfc9] text-xs font-mono text-[#72787e]">
                atelier.app/@
              </span>
              <input
                type="text"
                required
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="yourhandle"
                className="flex-1 px-3 py-2.5 bg-white border border-[#d2cfc9] text-sm font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
              />
            </div>
            {sanitizedHandle && (
              <p
                className={`text-[11px] font-mono mt-1 ${
                  isTaken ? 'text-[#c62828]' : 'text-[#2e7d32]'
                }`}
              >
                {isTaken
                  ? '✗ Handle is already claimed by another creator'
                  : '✓ Handle available: atelier.app/@' + sanitizedHandle}
              </p>
            )}
          </div>

          {/* Name & Discipline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                Artist / Studio Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alix de Maupassant"
                className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                Primary Craft Medium
              </label>
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
              >
                <option value="Ceramics & Stoneware">Ceramics & Stoneware</option>
                <option value="Woodcraft & Joinery">Woodcraft & Joinery</option>
                <option value="Abstract Oil & Mineral Pigment">Abstract Oil & Linen</option>
                <option value="Architectural Textiles & Fiber">Fiber & Architectural Textiles</option>
                <option value="Bronze & Foundry Sculpture">Sculpture & Bronze</option>
              </select>
            </div>
          </div>

          {/* Location & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                Studio Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Kyoto & London"
                className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#575953] mb-1">
                Short Tagline / Motto
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Raw clay, ash glazes & slow fire"
                className="w-full px-3 py-2 bg-white border border-[#d2cfc9] text-sm text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#e4e2df] flex items-center justify-between">
            <span className="text-xs font-mono text-[#72787e]">
              0% commission platform
            </span>
            <button
              type="submit"
              disabled={isTaken || !sanitizedHandle}
              className="px-8 py-3 bg-[#1b1c1a] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#343734] transition-colors disabled:opacity-40"
            >
              Publish Atelier Profile →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
