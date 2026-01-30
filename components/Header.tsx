import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Clock, Mail, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about' },
    { name: 'Services', path: '/services', dropdown: true },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact us', path: '/contact' },
  ];

  const serviceLinks = [
    { name: 'Gym', path: '/gym' },
    { name: 'Yoga', path: '/yoga' },
    { name: 'Kickfit', path: '/kickfit' },
    { name: 'Group-X', path: '/group-x' },
    { name: 'Swimming', path: '/swimming' },
  ];

  const isServicePage = serviceLinks.some(s => location.pathname === s.path);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/95 backdrop-blur-md py-4 border-b border-neutral-border/30' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="font-orbitron text-2xl md:text-3xl font-black text-white tracking-tighter hover:text-primary transition-colors">
          STRONG<span className="text-primary text-4xl">X</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.dropdown ? (
                <>
                  <button
                    className={`font-jakarta font-medium text-sm uppercase tracking-wider flex items-center gap-1 transition-colors ${
                      location.pathname === link.path || isServicePage ? 'text-primary' : 'text-white hover:text-primary'
                    }`}
                  >
                    {link.name}
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                  <div className="absolute top-full left-0 mt-4 w-48 bg-dark-card border border-neutral-border/30 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl overflow-hidden">
                    <div className="py-2">
                      {serviceLinks.map(item => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`block px-5 py-3 text-sm font-jakarta transition-colors ${
                            location.pathname === item.path
                              ? 'bg-primary text-dark'
                              : 'text-neutral-light hover:bg-primary hover:text-dark'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to={link.path}
                  className={`font-jakarta font-medium text-sm uppercase tracking-wider flex items-center gap-1 transition-colors ${
                    location.pathname === link.path ? 'text-primary' : 'text-white hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden sm:block font-jakarta font-bold text-xs uppercase tracking-widest bg-primary text-dark px-6 py-3 rounded hover:bg-primary-hover shadow-[0_0_20px_-5px_#f0dd35] transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Try for FREE
          </Link>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-40 bg-dark transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 overflow-y-auto">
          <div className="space-y-6 mb-auto">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      className="flex items-center justify-between w-full font-orbitron text-3xl font-extrabold text-white"
                    >
                      {link.name}
                      <ChevronDown
                        size={24}
                        className={`transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${servicesDropdownOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                      <div className="pl-4 space-y-3 border-l-2 border-primary/30">
                        {serviceLinks.map(item => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`block font-jakarta text-xl ${
                              location.pathname === item.path ? 'text-primary' : 'text-neutral-gray'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`block font-orbitron text-3xl font-extrabold ${
                      location.pathname === link.path ? 'text-primary' : 'text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="pb-12 border-t border-neutral-border/30 pt-8 mt-8">
            <p className="font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-6">Contact Info</p>
            <div className="space-y-4">
              <p className="text-white flex items-center gap-3">
                <Clock size={18} className="text-primary" />
                6 a.m - 9 p.m (Mon - Sun)
              </p>
              <p className="text-white flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                contact@strongx.com
              </p>
              <p className="text-white flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                +259 (0) 256 215
              </p>
            </div>

            <div className="mt-8">
              <Link
                to="/contact"
                className="block w-full text-center font-jakarta font-bold text-xs uppercase tracking-widest bg-primary text-dark px-6 py-4 rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                Try for FREE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
