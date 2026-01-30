import React, { useRef, useEffect, useState } from 'react';
import { TRANSFORMATIONS } from '../constants';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const TransformationSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 600;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Reset to start when reaching the end
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 570, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="bg-dark py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">Results</h4>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase italic leading-tight">
            Let's See Our Students<br />
            <span className="text-primary">Have Transformed</span>
          </h2>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-neutral-border flex items-center justify-center text-white hover:bg-primary hover:text-dark hover:border-primary transition-all"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-neutral-border flex items-center justify-center text-white hover:bg-primary hover:text-dark hover:border-primary transition-all"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-4 no-scrollbar w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {[...TRANSFORMATIONS, ...TRANSFORMATIONS].map((t, index) => (
          <div
            key={`${t.id}-${index}`}
            className="flex-shrink-0 w-[350px] md:w-[550px] bg-dark-card rounded-3xl overflow-hidden border border-neutral-border/20 hover:border-primary/30 transition-all shadow-2xl snap-start group"
          >
            {/* Header */}
            <div className="p-6 md:p-8 pb-0">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-orbitron text-2xl md:text-3xl font-black text-white uppercase mb-1">"{t.name}"</h3>
                  <div className="flex gap-4 text-neutral-gray text-sm font-jakarta uppercase tracking-wider">
                    <span>Age: {t.age}</span>
                    <span className="text-neutral-border">|</span>
                    <span className="text-primary font-bold">{t.duration}</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-neutral-border/20 pt-6 mb-6">
                <div className="bg-dark rounded-xl p-4">
                  <p className="text-neutral-gray text-xs uppercase tracking-widest mb-2 font-jakarta">Weight</p>
                  <p className="font-orbitron text-lg md:text-xl text-white font-bold">
                    {t.weight.before} <span className="text-neutral-border mx-1">→</span> <span className="text-primary">{t.weight.after}</span>
                  </p>
                </div>
                <div className="bg-dark rounded-xl p-4">
                  <p className="text-neutral-gray text-xs uppercase tracking-widest mb-2 font-jakarta">Body Fat</p>
                  <p className="font-orbitron text-lg md:text-xl text-white font-bold">
                    {t.bodyFat.before} <span className="text-neutral-border mx-1">→</span> <span className="text-primary">{t.bodyFat.after}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 gap-2 p-2">
              <div className="relative overflow-hidden rounded-xl">
                <img src={t.images.before} className="w-full h-48 md:h-64 object-cover grayscale" alt="Before" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-dark/90 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] text-white font-bold uppercase tracking-wider">Before</div>
              </div>
              <div className="relative overflow-hidden rounded-xl border-2 border-primary">
                <img src={t.images.after} className="w-full h-48 md:h-64 object-cover" alt="After" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-primary px-3 py-1.5 rounded-lg text-[10px] text-dark font-bold uppercase tracking-wider">After</div>
              </div>
            </div>

            {/* Marquee Banner */}
            <div className="bg-primary/10 border-t border-primary/20 py-3 overflow-hidden">
              <div className="flex animate-marquee">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="font-orbitron text-xs font-bold text-primary uppercase px-4 whitespace-nowrap flex items-center">
                    TRAINED BY STRONGX <span className="mx-3 opacity-50">&#x2022;</span>
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 pt-4">
              <button className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-primary hover:text-dark hover:border-primary transition-all group-hover:bg-primary group-hover:text-dark group-hover:border-primary">
                Read Success Story <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TransformationSection;
