import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ServicePageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
}

const ServicePageHero: React.FC<ServicePageHeroProps> = ({
  title,
  subtitle,
  description,
  backgroundImage
}) => {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 pt-32">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-jakarta text-neutral-gray text-sm uppercase tracking-wider">Services</span>
            <span className="text-neutral-border">/</span>
            <span className="font-jakarta text-primary text-sm uppercase tracking-wider">{title}</span>
          </div>

          {/* Title */}
          <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6 italic">
            {title}
          </h1>

          {/* Subtitle */}
          <h2 className="font-grotesk text-primary text-lg md:text-xl font-bold uppercase tracking-wider mb-6">
            {subtitle}
          </h2>

          {/* Description */}
          <p className="font-inter text-neutral-light text-lg max-w-xl leading-relaxed opacity-80 mb-10">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="group flex items-center gap-3 font-jakarta font-bold text-xs uppercase tracking-widest bg-primary text-dark px-10 py-5 rounded-lg hover:bg-primary-hover transition-all shadow-[0_0_30px_-10px_#f0dd35]">
              Try for FREE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="font-jakarta font-bold text-xs uppercase tracking-widest border border-neutral-border/50 text-white px-10 py-5 rounded-lg hover:border-primary hover:text-primary transition-all">
              View Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 right-0 w-1/3 h-2 bg-gradient-to-l from-primary to-transparent" />
    </section>
  );
};

export default ServicePageHero;
