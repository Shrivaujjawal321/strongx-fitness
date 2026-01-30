import React from 'react';
import { Check, X } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: { text: string; included: boolean }[];
  featured?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    period: 'month',
    description: 'Perfect for beginners starting their fitness journey',
    features: [
      { text: 'Access to Gym Equipment', included: true },
      { text: 'Locker Room Access', included: true },
      { text: 'Free WiFi', included: true },
      { text: 'Group Classes', included: false },
      { text: 'Personal Trainer', included: false },
      { text: 'Swimming Pool', included: false },
      { text: 'Sauna & Spa', included: false },
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 79,
    period: 'month',
    description: 'Most popular choice for dedicated fitness enthusiasts',
    featured: true,
    features: [
      { text: 'Access to Gym Equipment', included: true },
      { text: 'Locker Room Access', included: true },
      { text: 'Free WiFi', included: true },
      { text: 'All Group Classes', included: true },
      { text: '2 PT Sessions/Month', included: true },
      { text: 'Swimming Pool', included: true },
      { text: 'Sauna & Spa', included: false },
    ]
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 149,
    period: 'month',
    description: 'Ultimate experience with unlimited access to everything',
    features: [
      { text: 'Access to Gym Equipment', included: true },
      { text: 'Locker Room Access', included: true },
      { text: 'Free WiFi', included: true },
      { text: 'All Group Classes', included: true },
      { text: 'Unlimited PT Sessions', included: true },
      { text: 'Swimming Pool', included: true },
      { text: 'Sauna & Spa', included: true },
    ]
  }
];

const Pricing: React.FC = () => {
  return (
    <section className="bg-dark-card py-24 border-y border-neutral-border/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">Pricing</h4>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase italic mb-4">Choose Your Plan</h2>
          <p className="font-inter text-neutral-gray max-w-xl mx-auto">
            Flexible membership options designed to fit your lifestyle and fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 transition-all hover:-translate-y-2 ${
                plan.featured
                  ? 'bg-dark border-2 border-primary shadow-[0_0_40px_-10px_#f0dd35]'
                  : 'bg-dark border border-neutral-border/20'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-dark font-jakarta font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-orbitron text-xl font-bold text-white uppercase mb-2">{plan.name}</h3>
                <p className="font-jakarta text-neutral-gray text-sm mb-6">{plan.description}</p>

                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-orbitron text-5xl md:text-6xl font-black text-primary">${plan.price}</span>
                  <span className="font-jakarta text-neutral-gray text-sm">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-primary" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-neutral-border/20 flex items-center justify-center flex-shrink-0">
                        <X size={12} className="text-neutral-border" />
                      </div>
                    )}
                    <span className={`font-jakarta text-sm ${feature.included ? 'text-white' : 'text-neutral-border'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-jakarta font-bold text-sm uppercase tracking-widest transition-all ${
                  plan.featured
                    ? 'bg-primary text-dark hover:bg-primary-hover'
                    : 'border border-neutral-border text-white hover:border-primary hover:text-primary'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
