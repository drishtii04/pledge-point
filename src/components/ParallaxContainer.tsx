import React, { useEffect, useRef, useState } from 'react';

interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  backgroundImage?: string;
  overlay?: boolean;
  overlayColor?: string;
  height?: string;
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = 0.5,
  className = '',
  backgroundImage,
  overlay = true,
  overlayColor = 'from-slate-900/80 via-blue-900/60 to-indigo-900/80',
  height = 'min-h-screen'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Only calculate parallax when element is in view
        if (rect.bottom >= 0 && rect.top <= windowHeight) {
          setScrollY(scrolled * speed);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      ref={containerRef}
      className={`parallax-container relative overflow-hidden ${height} ${className}`}
    >
      {/* Parallax Background */}
      {backgroundImage && (
        <div
          className="parallax-bg"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: `translateY(${scrollY}px)`,
          }}
        />
      )}

      {/* Overlay */}
      {overlay && (
        <div className={`absolute inset-0 bg-gradient-to-br ${overlayColor}`} />
      )}

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

// Parallax Element Component for individual parallax effects
interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.3,
  direction = 'up',
  className = ''
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Only apply parallax when element is in view
        if (rect.bottom >= 0 && rect.top <= windowHeight) {
          const movement = scrolled * speed;
          
          switch (direction) {
            case 'up':
              setTransform(`translateY(-${movement}px)`);
              break;
            case 'down':
              setTransform(`translateY(${movement}px)`);
              break;
            case 'left':
              setTransform(`translateX(-${movement}px)`);
              break;
            case 'right':
              setTransform(`translateX(${movement}px)`);
              break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div
      ref={elementRef}
      className={`parallax-element ${className}`}
      style={{ transform }}
    >
      {children}
    </div>
  );
};

// Advanced Parallax Section with multiple layers
interface ParallaxSectionProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  height?: string;
  overlayOpacity?: number;
  className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  backgroundImage,
  title,
  subtitle,
  children,
  height = 'h-screen',
  overlayOpacity = 0.7,
  className = ''
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (rect.bottom >= 0 && rect.top <= windowHeight) {
          const elementTop = rect.top + scrolled;
          const elementHeight = rect.height;
          const scrollProgress = (scrolled - elementTop + windowHeight) / (windowHeight + elementHeight);
          
          setParallaxOffset(scrollProgress * 200 - 100); // Adjust multiplier for effect strength
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`relative ${height} overflow-hidden ${className}`}
    >
      {/* Multi-layer Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${parallaxOffset * 0.5}px) scale(1.1)`,
        }}
      />
      
      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0">
        <ParallaxElement speed={0.2} direction="right" className="absolute top-20 left-10">
          <div className="w-32 h-32 bg-blue-500/20 rounded-full animate-float" />
        </ParallaxElement>
        <ParallaxElement speed={0.3} direction="left" className="absolute top-40 right-20">
          <div className="w-24 h-24 bg-indigo-500/20 rounded-lg rotate-45 animate-float" style={{animationDelay: '1s'}} />
        </ParallaxElement>
        <ParallaxElement speed={0.1} direction="up" className="absolute bottom-32 left-1/4">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full animate-pulse" />
        </ParallaxElement>
      </div>

      {/* Gradient Overlay with dynamic opacity */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          <ParallaxElement speed={0.2} className="mb-6">
            <h2 className="text-5xl md:text-7xl font-bold text-white gradient-text animate-slide-left">
              {title}
            </h2>
          </ParallaxElement>
          
          {subtitle && (
            <ParallaxElement speed={0.3} className="mb-8">
              <p className="text-xl md:text-2xl text-blue-100 animate-slide-right">
                {subtitle}
              </p>
            </ParallaxElement>
          )}
          
          {children && (
            <ParallaxElement speed={0.1}>
              <div className="animate-zoom-in">
                {children}
              </div>
            </ParallaxElement>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <ParallaxElement speed={0.4} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce text-white/60">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </ParallaxElement>
    </section>
  );
};

export default ParallaxContainer;