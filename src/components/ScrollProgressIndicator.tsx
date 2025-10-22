import { useState, useEffect } from "react";

const ScrollProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 h-1">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-200 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-30 animate-pulse" />
    </div>
  );
};

export default ScrollProgressIndicator;