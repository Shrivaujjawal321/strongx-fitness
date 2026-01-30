import React from 'react';
import { Play, Award, Users, Clock, Target } from 'lucide-react';

const AboutSection: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Every program is designed with measurable outcomes in mind.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'A supportive environment where everyone belongs.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'World-class facilities and certified trainers.'
    },
    {
      icon: Clock,
      title: 'Dedication',
      description: 'Open extended hours to fit your busy lifestyle.'
    }
  ];

  return (
    <section className="bg-dark py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://framerusercontent.com/images/CjTKhc1hqRGghfDwFauIOmxorlk.jpg?scale-down-to=2048"
                alt="StrongX Facility"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-dark/30" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-primary flex items-center justify-center group hover:scale-110 transition-transform shadow-[0_0_40px_-10px_#f0dd35]">
                  <Play size={32} className="text-dark fill-dark ml-1" />
                </button>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-8 -right-8 bg-dark-card border border-neutral-border/30 rounded-2xl p-6 shadow-2xl">
              <div className="font-orbitron text-5xl font-black text-primary">10+</div>
              <div className="font-jakarta text-neutral-gray text-sm uppercase tracking-widest">Years of<br />Excellence</div>
            </div>
          </div>

          {/* Content Section */}
          <div>
            <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">About Us</h4>
            <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase italic leading-tight mb-6">
              Let's Transform<br />
              <span className="text-primary">Your Fitness</span> Journey
            </h2>

            <p className="font-inter text-neutral-light text-lg leading-relaxed opacity-80 mb-8">
              Founded in 2014, StrongX has been at the forefront of the fitness revolution.
              With a commitment to excellence and a passion for transformation, we've helped
              over 100,000 clients achieve their fitness goals.
            </p>

            <p className="font-inter text-neutral-gray text-base leading-relaxed mb-10">
              Our state-of-the-art facilities, expert trainers, and innovative programs create
              the perfect environment for you to push your limits and discover your true potential.
              Whether you're a beginner or an elite athlete, StrongX is your partner in fitness.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <value.icon size={24} className="text-primary" />
                  </div>
                  <h4 className="font-orbitron text-white font-bold uppercase mb-2">{value.title}</h4>
                  <p className="font-inter text-neutral-gray text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
