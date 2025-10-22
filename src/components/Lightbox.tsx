import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface LightboxImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  title?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev
}) => {
  const currentImage = images[currentIndex];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev?.();
          break;
        case 'ArrowRight':
          onNext?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !currentImage) return null;

  return (
    <div className={`lightbox-overlay ${isOpen ? 'active' : ''}`}>
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose}
      />

      {/* Lightbox Content */}
      <div className="lightbox-content relative max-w-5xl max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        {/* Navigation Buttons */}
        {images.length > 1 && onPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {images.length > 1 && onNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Image Container */}
        <div className="relative">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="w-full h-auto max-h-[80vh] object-contain"
          />
          
          {/* Image Info */}
          {(currentImage.title || currentImage.caption) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              {currentImage.title && (
                <h3 className="text-xl font-bold mb-2">{currentImage.title}</h3>
              )}
              {currentImage.caption && (
                <p className="text-gray-200">{currentImage.caption}</p>
              )}
            </div>
          )}
        </div>

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};

// Gallery Grid Component with Lightbox Integration
interface GalleryGridProps {
  images: LightboxImage[];
  columns?: number;
  gap?: number;
  className?: string;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  images,
  columns = 3,
  gap = 4,
  className = ''
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div 
        className={`grid gap-${gap} ${className}`}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
        }}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-2xl hover-lift hover-glow cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="text-white" size={24} />
                </div>
              </div>
              
              {image.title && (
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-lg">{image.title}</h3>
                  {image.caption && (
                    <p className="text-sm text-gray-200 mt-1">{image.caption}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={images}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
};

export default Lightbox;