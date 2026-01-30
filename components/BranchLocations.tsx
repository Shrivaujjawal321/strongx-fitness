import React, { useState } from 'react';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  coordinates: { lat: number; lng: number };
}

const branches: Branch[] = [
  {
    id: '1',
    name: 'StrongX Downtown',
    address: '123 Fitness Ave, Elite District, NY 10001',
    phone: '+1 (212) 555-0123',
    hours: '5:00 AM - 11:00 PM',
    image: 'https://framerusercontent.com/images/HMTwzPqouk51Ut8on7XFa2caXg.jpg',
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: '2',
    name: 'StrongX Midtown',
    address: '456 Power Street, Business Hub, NY 10018',
    phone: '+1 (212) 555-0456',
    hours: '6:00 AM - 10:00 PM',
    image: 'https://framerusercontent.com/images/LCCMMGLq0ltGKumFa9u0MHb5o.jpg',
    coordinates: { lat: 40.7549, lng: -73.9840 }
  },
  {
    id: '3',
    name: 'StrongX Brooklyn',
    address: '789 Strength Blvd, Williamsburg, NY 11211',
    phone: '+1 (718) 555-0789',
    hours: '5:30 AM - 10:30 PM',
    image: 'https://framerusercontent.com/images/DOzktr1SJvtZ2JWlN1robGanA.jpg',
    coordinates: { lat: 40.7081, lng: -73.9571 }
  },
  {
    id: '4',
    name: 'StrongX Upper East',
    address: '321 Wellness Lane, Upper East Side, NY 10021',
    phone: '+1 (212) 555-0321',
    hours: '6:00 AM - 11:00 PM',
    image: 'https://framerusercontent.com/images/X2PF52ZKTyEMOTn1egiIerQNy8.jpg',
    coordinates: { lat: 40.7735, lng: -73.9565 }
  }
];

const BranchLocations: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0]);

  return (
    <section className="bg-dark-card py-24 border-y border-neutral-border/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">Locations</h4>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase italic">All Branches</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Placeholder */}
          <div className="relative rounded-3xl overflow-hidden h-[500px] border border-neutral-border/20">
            <img
              src={selectedBranch.image}
              alt={selectedBranch.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />

            {/* Selected Branch Info Overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="font-orbitron text-2xl font-black text-white uppercase mb-2">{selectedBranch.name}</h3>
              <p className="font-jakarta text-neutral-light text-sm flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                {selectedBranch.address}
              </p>
            </div>

            {/* Branch Markers */}
            <div className="absolute top-8 right-8 flex gap-2">
              {branches.map((branch, index) => (
                <button
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-orbitron font-bold text-sm transition-all ${
                    selectedBranch.id === branch.id
                      ? 'bg-primary text-dark'
                      : 'bg-dark/80 text-white border border-neutral-border hover:border-primary'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Branch Cards */}
          <div className="space-y-4">
            {branches.map((branch) => (
              <div
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`p-6 rounded-2xl cursor-pointer transition-all ${
                  selectedBranch.id === branch.id
                    ? 'bg-dark border-2 border-primary'
                    : 'bg-dark border border-neutral-border/20 hover:border-neutral-border/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-orbitron text-lg font-bold text-white uppercase mb-3">{branch.name}</h4>

                    <div className="space-y-2">
                      <p className="font-jakarta text-neutral-gray text-sm flex items-center gap-2">
                        <MapPin size={14} className="text-primary flex-shrink-0" />
                        {branch.address}
                      </p>
                      <p className="font-jakarta text-neutral-gray text-sm flex items-center gap-2">
                        <Phone size={14} className="text-primary flex-shrink-0" />
                        {branch.phone}
                      </p>
                      <p className="font-jakarta text-neutral-gray text-sm flex items-center gap-2">
                        <Clock size={14} className="text-primary flex-shrink-0" />
                        {branch.hours}
                      </p>
                    </div>
                  </div>

                  <button className="w-10 h-10 rounded-full border border-neutral-border flex items-center justify-center text-white hover:bg-primary hover:text-dark hover:border-primary transition-all flex-shrink-0">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchLocations;
