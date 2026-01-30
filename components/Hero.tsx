import React, { useState, useEffect } from 'react';
import { ArrowRight, Instagram, Facebook, Twitter, Play } from 'lucide-react';
import { gemini } from '../services/gemini';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [motivation, setMotivation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const slides = [
    {
      image: 'https://framerusercontent.com/images/CjTKhc1hqRGghfDwFauIOmxorlk.jpg?scale-down-to=2048',
      title: ['Transform', 'body and mind', 'at strongx']
    },
    {
      image: 'https://framerusercontent.com/images/TnJyQlSTxUuWAUUwGnecriw03Bg.jpg',
      title: ['Push Your', 'Limits', 'Every Day']
    },
    {
      image: 'https://framerusercontent.com/images/HH8KrojyxZx6X20z1r13CSwiiWE.jpg',
      title: ['Strength', 'Discipline', 'Results']
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    const loadMotivation = async () => {
      setIsLoading(true);
      try {
        const text = await gemini.getAiMotivation();
        setMotivation(text);
      } catch {
        setMotivation("Push beyond your limits.");
      } finally {
        setIsLoading(false);
      }
    };
    loadMotivation();

    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Image Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            className="w-full h-full object-cover"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-50" />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto h-full px-4 md:px-8 relative z-10 flex items-center">
        <div className="max-w-4xl pt-20">
          {/* Trust Badge */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <span className="w-12 h-[2px] bg-primary"></span>
            <span className="font-jakarta text-primary text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="text-lg">&#9733;</span> Trusted by 100k+ clients
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.85] uppercase tracking-tighter mb-8 italic">
            {currentSlideData.title[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              {currentSlideData.title[1]}
            </span> <br />
            {currentSlideData.title[2]}
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-neutral-light text-lg md:text-xl max-w-xl mb-10 leading-relaxed opacity-80">
            {isLoading ? (
              <span className="inline-block w-64 h-6 bg-neutral-border/20 rounded animate-pulse" />
            ) : (
              motivation
            )}{' '}
            With ten years of experience, our fitness solution continues to lead the industry with a luxurious, result-driven environment.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="group flex items-center gap-3 font-jakarta font-bold text-xs uppercase tracking-widest bg-primary text-dark px-10 py-5 rounded-lg hover:bg-primary-hover transition-all shadow-[0_0_30px_-10px_#f0dd35] hover:shadow-[0_0_50px_-10px_#f0dd35]">
              See More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group flex items-center gap-3 font-jakarta font-bold text-xs uppercase tracking-widest border border-neutral-border/50 text-white px-10 py-5 rounded-lg hover:border-primary hover:text-primary transition-all">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary/20">
                <Play size={14} className="fill-current ml-0.5" />
              </div>
              Watch Tour
            </button>
          </div>
        </div>
      </div>

      {/* Social Links - Left Side */}
      <div className="absolute bottom-24 left-8 z-20 hidden lg:flex flex-col items-center gap-6">
        <p className="font-jakarta text-[10px] uppercase tracking-widest text-white/50 rotate-90 origin-left translate-y-20 mb-16 whitespace-nowrap">
          Follow us
        </p>
        <div className="flex flex-col gap-4">
          {[Instagram, Facebook, Twitter].map((Icon, idx) => (
            <a
              key={idx}
              href="#"
              className="w-10 h-10 rounded-full border border-neutral-border/30 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary transition-all"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* Slide Indicators - Right Side */}
      <div className="absolute bottom-24 right-8 z-20 flex flex-col items-end gap-4">
        {/* Current/Total */}
        <div className="font-orbitron text-white mb-2">
          <span className="text-2xl font-black text-primary">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="text-neutral-border mx-2">/</span>
          <span className="text-sm text-neutral-gray">{String(slides.length).padStart(2, '0')}</span>
        </div>

        {/* Progress Bars */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === currentSlide ? 'w-12 bg-primary' : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2">
        <span className="font-jakarta text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-l from-primary to-transparent" />
    </section>
  );
};

export default Hero;
