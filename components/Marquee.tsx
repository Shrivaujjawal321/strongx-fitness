import React from 'react';

interface MarqueeProps {
  text: string;
  reverse?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({ text, reverse = false }) => {
  const items = [...Array(12)].map((_, i) => (
    <span key={i} className="font-orbitron text-2xl md:text-4xl lg:text-5xl font-black text-dark uppercase px-6 flex items-center whitespace-nowrap">
      {text}
      <span className="mx-6 text-4xl md:text-5xl lg:text-6xl opacity-50">&#x2022;</span>
    </span>
  ));

  return (
    <div className="bg-primary py-4 overflow-hidden border-y-2 border-dark/20 relative">
      {/* Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

      {/* Scrolling Content */}
      <div className={`flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {items}
        {items}
      </div>
    </div>
  );
};

export default Marquee;
