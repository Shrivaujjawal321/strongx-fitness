import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Fitness Enthusiast',
    image: 'https://framerusercontent.com/images/xi1UY2Vgw6DC8jegvqw9EfQio.png',
    content: 'StrongX transformed my approach to fitness. The trainers are incredibly knowledgeable and the facilities are world-class. I\'ve never felt more confident in my body.',
    rating: 5
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Marathon Runner',
    image: 'https://framerusercontent.com/images/tsaBMg9KZgULPVL6lcOo6ZXBHg.png',
    content: 'The training programs here are exceptional. I\'ve improved my marathon time by 30 minutes since joining. The community is supportive and motivating.',
    rating: 5
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    role: 'Yoga Practitioner',
    image: 'https://framerusercontent.com/images/7iP2zPdbVOguf0rv0B7NaCIxw.jpg',
    content: 'The yoga classes at StrongX are unlike anything else. The instructors bring both physical expertise and spiritual depth to every session.',
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="bg-dark py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">Testimonials</h4>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase italic">What Our Members Say</h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-dark-card rounded-3xl p-8 md:p-16 border border-neutral-border/20 relative">
            {/* Quote Mark */}
            <div className="absolute top-8 left-8 font-orbitron text-[120px] font-black text-primary/10 leading-none select-none">"</div>

            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
              {/* Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary">
                  <img src={current.image} alt={current.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Stars */}
                <div className="flex gap-1 justify-center md:justify-start mb-4">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-primary text-primary" />
                  ))}
                </div>

                <p className="font-inter text-neutral-light text-lg md:text-xl leading-relaxed mb-6 italic">
                  "{current.content}"
                </p>

                <div>
                  <h4 className="font-orbitron text-white font-bold text-lg uppercase">{current.name}</h4>
                  <p className="font-jakarta text-primary text-sm uppercase tracking-widest">{current.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-neutral-border flex items-center justify-center text-white hover:bg-primary hover:text-dark hover:border-primary transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-neutral-border/50'}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-neutral-border flex items-center justify-center text-white hover:bg-primary hover:text-dark hover:border-primary transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
