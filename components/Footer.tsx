import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark pt-24 pb-12 border-t border-neutral-border/20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Newsletter Section */}
        <div className="bg-dark-card rounded-3xl p-8 md:p-12 border border-neutral-border/20 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-orbitron text-2xl md:text-3xl font-black text-white uppercase mb-2">Join Our Newsletter</h3>
              <p className="font-inter text-neutral-gray">Get exclusive fitness tips, offers, and updates delivered to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 bg-dark border border-neutral-border/30 rounded-xl px-5 py-4 text-white outline-none focus:border-primary transition-all text-sm"
              />
              <button className="bg-primary text-dark p-4 rounded-xl hover:bg-primary-hover transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="font-orbitron text-3xl font-black text-white tracking-tighter inline-block">
              STRONG<span className="text-primary">X</span>
            </Link>
            <p className="font-inter text-neutral-gray text-sm leading-relaxed max-w-xs">
              Transforming bodies and minds since 2014. Premium fitness experiences for those who demand excellence.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Youtube, href: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-dark-card border border-neutral-border/30 flex items-center justify-center text-white hover:bg-primary hover:text-dark hover:border-primary transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-orbitron text-white text-lg font-bold uppercase mb-8">Quick Links</h4>
            <ul className="space-y-4 font-jakarta text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'About us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contact us', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-neutral-gray hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-orbitron text-white text-lg font-bold uppercase mb-8">Services</h4>
            <ul className="space-y-4 font-jakarta text-sm">
              {[
                { name: 'Gym Membership', path: '/gym' },
                { name: 'Yoga Classes', path: '/yoga' },
                { name: 'Kickfit Training', path: '/kickfit' },
                { name: 'Group-X Classes', path: '/group-x' },
                { name: 'Swimming Pool', path: '/swimming' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-neutral-gray hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-orbitron text-white text-lg font-bold uppercase mb-8">Contact Us</h4>
            <ul className="space-y-6 font-jakarta text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-neutral-gray">123 Fitness Ave, Elite District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span className="text-neutral-gray">+259 (0) 256 215</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span className="text-neutral-gray">contact@strongx.com</span>
              </li>
            </ul>

            {/* Opening Hours */}
            <div className="mt-8 p-4 bg-dark-card rounded-xl border border-neutral-border/20">
              <p className="font-jakarta text-xs text-neutral-gray uppercase tracking-widest mb-2">Opening Hours</p>
              <p className="font-orbitron text-primary font-bold">6:00 AM - 10:00 PM</p>
              <p className="font-jakarta text-neutral-gray text-xs mt-1">Monday - Sunday</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-border/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-jakarta text-neutral-gray uppercase tracking-widest">
          <p>&copy; {currentYear} STRONGX FITNESS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
