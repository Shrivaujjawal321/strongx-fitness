import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
}

const facilities: Facility[] = [
  {
    id: '1',
    name: 'Modern Gym Floor',
    description: 'State-of-the-art equipment from top brands',
    image: 'https://framerusercontent.com/images/HMTwzPqouk51Ut8on7XFa2caXg.jpg'
  },
  {
    id: '2',
    name: 'Olympic Pool',
    description: '50-meter heated pool with dedicated lanes',
    image: 'https://framerusercontent.com/images/LCCMMGLq0ltGKumFa9u0MHb5o.jpg'
  },
  {
    id: '3',
    name: 'Luxury Sauna',
    description: 'Relax and recover in our premium sauna',
    image: 'https://framerusercontent.com/images/DOzktr1SJvtZ2JWlN1robGanA.jpg'
  },
  {
    id: '4',
    name: 'Private Lockers',
    description: 'Secure and spacious changing facilities',
    image: 'https://framerusercontent.com/images/X2PF52ZKTyEMOTn1egiIerQNy8.jpg'
  },
  {
    id: '5',
    name: 'Yoga Studio',
    description: 'Peaceful environment for mind-body wellness',
    image: 'https://framerusercontent.com/images/LqURARtPkDasnz8xNZRw6V7LVc.png'
  }
];

const Facilities: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 450;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-dark-card py-24 overflow-hidden border-y border-neutral-border/20">
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <div className="flex justify-between items-end">
          <div>
            <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">Amenities</h4>
            <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase italic">
              Enjoy the Best Amenities<br />
              <span className="text-primary">for Free</span> at StrongX
            </h2>
          </div>
          <div className="hidden md:flex gap-4">
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
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 md:px-[calc(50vw-600px)] no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {facilities.map((facility, index) => (
          <div
            key={facility.id}
            className="flex-shrink-0 w-[350px] md:w-[420px] group cursor-pointer snap-start"
          >
            <div className="relative h-[280px] rounded-2xl overflow-hidden mb-6">
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />

              {/* Number Badge */}
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-primary text-dark font-orbitron font-bold flex items-center justify-center">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-orbitron text-xl font-bold text-white uppercase mb-2 group-hover:text-primary transition-colors">
                  {facility.name}
                </h3>
                <p className="font-jakarta text-neutral-light/70 text-sm">
                  {facility.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-center gap-4 mt-8 px-4">
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
    </section>
  );
};

export default Facilities;
