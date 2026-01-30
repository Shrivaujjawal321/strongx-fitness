import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Instagram, Twitter } from 'lucide-react';

interface Trainer {
  id: string;
  name: string;
  role: string;
  specialization: string;
  image: string;
  experience: string;
}

const trainers: Trainer[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Head Trainer',
    specialization: 'Strength & Conditioning',
    image: 'https://framerusercontent.com/images/DfZVAWUharKP1TLVdrdGLWV1Y.png',
    experience: '12 years'
  },
  {
    id: '2',
    name: 'Maria Santos',
    role: 'Yoga Master',
    specialization: 'Hatha & Vinyasa Yoga',
    image: 'https://framerusercontent.com/images/w7mvBMur7SwicQrVQAWzF5enAl8.png',
    experience: '8 years'
  },
  {
    id: '3',
    name: 'James Wilson',
    role: 'Kickfit Coach',
    specialization: 'Combat Fitness',
    image: 'https://framerusercontent.com/images/NFPoBmn9tbELZrJPpQLLq5YefY.png',
    experience: '10 years'
  },
  {
    id: '4',
    name: 'Sophie Lee',
    role: 'Swimming Coach',
    specialization: 'Aquatic Training',
    image: 'https://framerusercontent.com/images/EL4yThdzsxP7vQqRvu9qxol0bjA.png',
    experience: '7 years'
  },
  {
    id: '5',
    name: 'Marcus Brown',
    role: 'Group-X Instructor',
    specialization: 'HIIT & Dance Fitness',
    image: 'https://framerusercontent.com/images/AdkEtTpyfJGpDu86xwjZ1qUEFs.png',
    experience: '6 years'
  }
];

const Trainers: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350;
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
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="bg-dark py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-12 flex justify-between items-end">
        <div>
          <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">Expert Team</h4>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase italic">Our Trainers</h2>
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
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 no-scrollbar w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {[...trainers, ...trainers].map((trainer, index) => (
          <div
            key={`${trainer.id}-${index}`}
            className="flex-shrink-0 w-[300px] group cursor-pointer snap-start"
          >
            {/* Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-80" />

              {/* Social Links Overlay */}
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                <div className="w-10 h-10 rounded-full bg-dark/80 backdrop-blur flex items-center justify-center text-white hover:bg-primary hover:text-dark transition-all cursor-pointer">
                  <Instagram size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-dark/80 backdrop-blur flex items-center justify-center text-white hover:bg-primary hover:text-dark transition-all cursor-pointer">
                  <Twitter size={18} />
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute top-4 left-4 bg-primary text-dark font-jakarta font-bold text-xs uppercase tracking-wider px-3 py-1 rounded">
                {trainer.experience}
              </div>
            </div>

            {/* Info */}
            <div>
              <h3 className="font-orbitron text-xl font-bold text-white uppercase mb-1 group-hover:text-primary transition-colors">
                {trainer.name}
              </h3>
              <p className="font-jakarta text-primary text-sm uppercase tracking-wider mb-2">{trainer.role}</p>
              <p className="font-inter text-neutral-gray text-sm">{trainer.specialization}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trainers;
