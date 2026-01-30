import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const ServicesCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 420;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-dark py-24 overflow-hidden" id="services">
      <div className="container mx-auto px-4 md:px-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">Expertise</h4>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase italic">Our Services</h2>
          <p className="font-inter text-neutral-gray mt-4 max-w-lg">
            Comprehensive fitness programs designed by experts to help you achieve your goals.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-neutral-border flex items-center justify-center text-white hover:bg-primary hover:text-dark hover:border-primary transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-neutral-border flex items-center justify-center text-white hover:bg-primary hover:text-dark hover:border-primary transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 md:px-[calc(50vw-600px)] no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {SERVICES.map((service, index) => (
          <Link
            to={`/${service.id}`}
            key={service.id}
            className="flex-shrink-0 w-[300px] md:w-[400px] h-[500px] md:h-[550px] relative group cursor-pointer snap-start rounded-2xl overflow-hidden"
          >
            {/* Image */}
            <img
              src={service.image}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt={service.name}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />

            {/* Border Highlight */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary transition-all duration-300 rounded-2xl m-2 pointer-events-none" />

            {/* Number Badge */}
            <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-dark/80 backdrop-blur border border-neutral-border/30 flex items-center justify-center font-orbitron font-bold text-white group-hover:bg-primary group-hover:text-dark group-hover:border-primary transition-all">
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="font-orbitron text-3xl md:text-4xl font-black text-white mb-3 uppercase group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              <p className="font-jakarta text-neutral-light/70 text-sm mb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {service.description}
              </p>
              <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <span className="font-jakarta font-bold text-xs uppercase tracking-widest">Learn More</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Service Pills */}
      <div className="container mx-auto px-4 md:px-8 mt-12">
        <div className="flex flex-wrap justify-center gap-3">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              to={`/${service.id}`}
              className="px-6 py-3 rounded-full border border-neutral-border/30 text-neutral-gray font-jakarta text-sm hover:border-primary hover:text-primary transition-all"
            >
              {service.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
