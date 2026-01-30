import React, { useState, useEffect, useRef } from 'react';

interface Stat {
  value: string;
  numericValue: number;
  prefix: string;
  suffix: string;
  label: string;
}

const statList: Stat[] = [
  { value: '+100k', numericValue: 100, prefix: '+', suffix: 'k', label: 'Clients' },
  { value: '80', numericValue: 80, prefix: '', suffix: '', label: 'Expert Trainers' },
  { value: '8', numericValue: 8, prefix: '', suffix: '', label: 'Branches' },
  { value: '10', numericValue: 10, prefix: '', suffix: '', label: 'Years Experience' },
];

const AnimatedCounter: React.FC<{ stat: Stat; isVisible: boolean }> = ({ stat, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * stat.numericValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, stat.numericValue]);

  return (
    <span>
      {stat.prefix}{count}{stat.suffix}
    </span>
  );
};

const Stats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-dark-card border-y border-neutral-border/20 py-16 md:py-24 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statList.map((stat, idx) => (
            <div
              key={idx}
              className="text-center group cursor-default"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="font-orbitron text-4xl md:text-5xl lg:text-7xl font-black text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                {isVisible ? <AnimatedCounter stat={stat} isVisible={isVisible} /> : '0'}
              </div>
              <div className="font-jakarta text-neutral-gray text-xs md:text-sm uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">
                {stat.label}
              </div>

              {/* Decorative line */}
              <div className="mt-4 mx-auto w-12 h-0.5 bg-neutral-border/30 group-hover:bg-primary group-hover:w-20 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
