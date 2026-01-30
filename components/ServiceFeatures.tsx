import React from 'react';
import { Check } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface ServiceFeaturesProps {
  sectionTitle: string;
  sectionSubtitle: string;
  features: Feature[];
  image: string;
  imagePosition?: 'left' | 'right';
}

const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({
  sectionTitle,
  sectionSubtitle,
  features,
  image,
  imagePosition = 'right'
}) => {
  const contentOrder = imagePosition === 'right' ? 'order-1' : 'order-2';
  const imageOrder = imagePosition === 'right' ? 'order-2' : 'order-1';

  return (
    <section className="bg-dark py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={contentOrder}>
            <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">
              {sectionSubtitle}
            </h4>
            <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white uppercase italic leading-tight mb-8">
              {sectionTitle}
            </h2>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-orbitron text-lg font-bold text-white uppercase mb-2">
                      {feature.title}
                    </h4>
                    <p className="font-inter text-neutral-gray text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className={`${imageOrder} relative`}>
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={image}
                alt={sectionTitle}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-primary/30 rounded-3xl -z-10" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
