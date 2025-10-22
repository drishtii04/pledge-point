import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  description: string;
  author?: string;
  location?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showNavigation?: boolean;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showNavigation = true,
  className = ''
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`carousel-container relative w-full h-[500px] ${className}`}>
      {/* Carousel Track */}
      <div 
        className="carousel-track h-full"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="carousel-slide h-full relative overflow-hidden"
          >
            {/* Background Image with Parallax Effect */}
            <div 
              className="parallax-bg"
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: `translateY(${(index - currentSlide) * 10}px)`
              }}
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/60 to-indigo-900/80" />
            
            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center max-w-4xl mx-auto px-6">
                <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-left">
                  {slide.title}
                </h3>
                <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-slide-right">
                  {slide.description}
                </p>
                {slide.author && (
                  <div className="animate-zoom-in">
                    <p className="text-lg text-blue-200 font-semibold">{slide.author}</p>
                    {slide.location && (
                      <p className="text-blue-300">{slide.location}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showNavigation && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="carousel-nav prev hover-glow"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="carousel-nav next hover-glow"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && slides.length > 1 && (
        <div className="carousel-dots absolute bottom-6 left-1/2 transform -translate-x-1/2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`carousel-dot hover-lift ${
                index === currentSlide ? 'active' : ''
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;