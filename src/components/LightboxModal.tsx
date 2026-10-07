import React, { useState, useEffect } from 'react';
import { Artwork } from '../types';

interface LightboxModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  activeAngleIndex?: number;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  artwork,
  isOpen,
  onClose,
  activeAngleIndex = 0,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(activeAngleIndex);

  useEffect(() => {
    setSelectedImageIndex(activeAngleIndex);
    setZoomLevel(1);
  }, [activeAngleIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !artwork) return null;

  const images = [
    { label: 'Primary View', url: artwork.imageUrl, description: artwork.title },
    ...(artwork.alternateAngles || []).map((a) => ({
      label: a.label,
      url: a.imageUrl,
      description: a.description,
    })),
  ];

  const currentImage = images[selectedImageIndex] || images[0];

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="fixed inset-0 z-50 bg-[#121312]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 text-white select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-10">
        <div>
          <h3 className="font-serif text-lg tracking-wide text-[#fbf9f6]">
            {artwork.title}
          </h3>
          <p className="text-xs text-[#a0a39f] font-sans">
            {artwork.artistName} • {currentImage.label}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#242624] border border-[#3e413e] px-2 py-1 text-xs font-mono">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="p-1 hover:text-[#e4e2df] disabled:opacity-30"
              title="Zoom Out"
            >
              <span className="material-symbols-outlined text-base">remove</span>
            </button>
            <span className="px-2">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="p-1 hover:text-[#e4e2df] disabled:opacity-30"
              title="Zoom In"
            >
              <span className="material-symbols-outlined text-base">add</span>
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={handleResetZoom}
                className="ml-2 text-[10px] uppercase text-[#a0a39f] hover:text-white"
              >
                Reset
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center bg-[#242624] border border-[#3e413e] hover:bg-[#343734] transition-colors"
            title="Close"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </div>

      {/* Main Viewing Area */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden py-4">
        <div
          className="max-w-full max-h-[75vh] transition-transform duration-200 ease-out flex items-center justify-center"
          style={{
            transform: `scale(${zoomLevel})`,
            cursor: zoomLevel > 1 ? 'grab' : 'zoom-in',
          }}
          onClick={() => {
            if (zoomLevel === 1) handleZoomIn();
            else handleResetZoom();
          }}
        >
          <img
            src={currentImage.url}
            alt={currentImage.label}
            className="max-h-[75vh] max-w-[90vw] object-contain shadow-2xl"
          />
        </div>
      </div>

      {/* Bottom Bar: Alternate Views Thumbnails & Caption */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#2e312e] pt-4 z-10">
        <p className="text-xs text-[#a0a39f] font-serif italic max-w-md truncate">
          {currentImage.description}
        </p>

        {images.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedImageIndex(idx);
                  setZoomLevel(1);
                }}
                className={`relative flex-shrink-0 w-14 h-14 border transition-all ${
                  selectedImageIndex === idx
                    ? 'border-white ring-1 ring-white'
                    : 'border-[#3e413e] opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.label}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
