import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const ratio = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
      setProgress(Math.round(ratio * 100));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-primary via-secondary to-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
        aria-hidden
      />
    </div>
  );
}
