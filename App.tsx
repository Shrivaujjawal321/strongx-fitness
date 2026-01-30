import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServicesCarousel from './components/ServicesCarousel';
import Stats from './components/Stats';
import Marquee from './components/Marquee';
import TransformationSection from './components/TransformationSection';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Trainers from './components/Trainers';
import Facilities from './components/Facilities';
import ClassSchedule from './components/ClassSchedule';
import ServicePageHero from './components/ServicePageHero';
import ServiceFeatures from './components/ServiceFeatures';
import AboutSection from './components/AboutSection';
import BranchLocations from './components/BranchLocations';
import { SERVICE_PAGE_DATA, BLOG_POSTS } from './constants';

// Admin imports
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import MembersPage from './pages/admin/MembersPage';
import PlansPage from './pages/admin/PlansPage';
import PaymentsPage from './pages/admin/PaymentsPage';
import StaffPage from './pages/admin/StaffPage';
import TrainersPage from './pages/admin/TrainersPage';

// Home Page
const HomePage: React.FC = () => (
  <main>
    <Hero />
    <Marquee text="Trained by StrongX" />
    <ServicesCarousel />
    <Stats />
    <AboutSection />
    <TransformationSection />
    <Trainers />
    <Testimonials />
    <Pricing />
    <Facilities />
    <section className="bg-dark py-24 text-center container mx-auto px-4">
      <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase mb-8 italic">Ready to transform?</h2>
      <p className="font-inter text-neutral-gray max-w-xl mx-auto mb-10">
        Join the StrongX family today and start your journey towards a stronger, healthier you.
      </p>
      <button className="bg-primary text-dark font-jakarta font-black uppercase text-sm tracking-widest px-12 py-6 rounded-xl hover:bg-primary-hover shadow-[0_0_50px_-10px_#f0dd35] transition-all">
        Join Now — First Class Free
      </button>
    </section>
  </main>
);

// About Page
const AboutPage: React.FC = () => (
  <main>
    {/* Hero */}
    <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-16">
      <div className="absolute inset-0">
        <img
          src="https://framerusercontent.com/images/CjTKhc1hqRGghfDwFauIOmxorlk.jpg?scale-down-to=2048"
          alt="About StrongX"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/80 to-dark" />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">About Us</h4>
        <h1 className="font-orbitron text-5xl md:text-7xl font-black text-white uppercase italic mb-6">About StrongX</h1>
        <p className="font-inter text-neutral-light text-lg max-w-2xl mx-auto opacity-80">
          Transforming bodies and minds since 2014. Premium fitness experiences for those who demand excellence.
        </p>
      </div>
    </section>

    <AboutSection />
    <Stats />
    <Trainers />
    <Testimonials />
    <BranchLocations />
  </main>
);

// Service Page Template
interface ServicePageProps {
  serviceKey: keyof typeof SERVICE_PAGE_DATA;
}

const ServicePage: React.FC<ServicePageProps> = ({ serviceKey }) => {
  const data = SERVICE_PAGE_DATA[serviceKey];

  return (
    <main>
      <ServicePageHero
        title={data.title}
        subtitle={data.subtitle}
        description={data.heroDescription}
        backgroundImage={data.heroImage}
      />

      <Marquee text={`${data.title} at StrongX`} />

      <ServiceFeatures
        sectionTitle={data.featuresSectionTitle}
        sectionSubtitle={data.featuresSectionSubtitle}
        features={data.features}
        image={data.featuresImage}
        imagePosition="right"
      />

      <section className="bg-dark-card py-24 border-y border-neutral-border/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">{data.benefitsSubtitle}</h4>
            <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase italic">{data.benefitsTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Build Strength', desc: 'Develop functional strength that translates to everyday life.' },
              { title: 'Burn Calories', desc: 'High-intensity sessions that maximize calorie burn.' },
              { title: 'Improve Health', desc: 'Boost cardiovascular health and overall well-being.' }
            ].map((benefit, idx) => (
              <div key={idx} className="text-center p-8 bg-dark rounded-2xl border border-neutral-border/20 hover:border-primary/30 transition-all">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <span className="font-orbitron text-2xl font-black text-primary">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-orbitron text-lg font-bold text-white uppercase mb-3">{benefit.title}</h3>
                <p className="font-inter text-neutral-gray text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TransformationSection />
      <ClassSchedule serviceFilter={data.title} />
      <Facilities />
      <Pricing />
    </main>
  );
};

// Blog Page
const BlogPage: React.FC = () => (
  <main>
    {/* Hero */}
    <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-16">
      <div className="absolute inset-0 bg-dark-card" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">Blog</h4>
        <h1 className="font-orbitron text-5xl md:text-7xl font-black text-white uppercase italic mb-6">Our Latest Blogs</h1>
        <p className="font-inter text-neutral-gray max-w-xl mx-auto">
          Expert insights, training tips, and wellness advice from the StrongX team.
        </p>
      </div>
    </section>

    {/* Blog Grid */}
    <section className="bg-dark py-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* Featured Post */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-dark-card rounded-3xl overflow-hidden border border-neutral-border/20 hover:border-primary/30 transition-all group cursor-pointer">
            <div className="h-[400px] overflow-hidden">
              <img
                src={BLOG_POSTS[0].image}
                alt={BLOG_POSTS[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="font-jakarta text-primary text-xs font-bold uppercase tracking-widest mb-4">{BLOG_POSTS[0].category}</span>
              <h2 className="font-orbitron text-2xl md:text-3xl font-black text-white uppercase mb-4 group-hover:text-primary transition-colors">
                {BLOG_POSTS[0].title}
              </h2>
              <p className="font-inter text-neutral-gray mb-6">{BLOG_POSTS[0].excerpt}</p>
              <div className="flex items-center gap-4">
                <span className="font-jakarta text-neutral-gray text-sm">{BLOG_POSTS[0].author}</span>
                <span className="text-neutral-border">|</span>
                <span className="font-jakarta text-neutral-gray text-sm">{BLOG_POSTS[0].date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(1).map((post) => (
            <div
              key={post.id}
              className="bg-dark-card rounded-2xl overflow-hidden border border-neutral-border/20 hover:border-primary/30 transition-all group cursor-pointer"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="font-jakarta text-primary text-xs font-bold uppercase tracking-widest">{post.category}</span>
                <h3 className="font-orbitron text-lg font-bold text-white uppercase mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="font-inter text-neutral-gray text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-neutral-gray">
                  <span className="font-jakarta">{post.author}</span>
                  <span className="font-jakarta">{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

// Contact Page
const ContactPage: React.FC = () => (
  <main>
    {/* Hero */}
    <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-16">
      <div className="absolute inset-0 bg-dark-card" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">Contact Us</h4>
        <h1 className="font-orbitron text-5xl md:text-7xl font-black text-white uppercase italic mb-6">Get in Touch</h1>
        <p className="font-inter text-neutral-gray max-w-xl mx-auto">
          Happy to help! Let us know your questions or feedback.
        </p>
      </div>
    </section>

    {/* Contact Form Section */}
    <section className="bg-dark py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-dark-card p-8 rounded-2xl border border-neutral-border/20">
                <h3 className="font-orbitron text-primary text-lg font-bold uppercase mb-6">Our Main Office</h3>
                <div className="space-y-4">
                  <p className="font-inter text-white">123 Fitness Ave, Elite District, NY 10001</p>
                  <p className="font-jakarta text-neutral-gray text-sm uppercase tracking-wider">Mon-Sun: 6am - 10pm</p>
                </div>
              </div>

              <div className="bg-dark-card p-8 rounded-2xl border border-neutral-border/20">
                <h3 className="font-orbitron text-primary text-lg font-bold uppercase mb-6">Contact Info</h3>
                <div className="space-y-4">
                  <p className="font-inter text-white">+259 (0) 256 215</p>
                  <p className="font-inter text-white">contact@strongx.com</p>
                </div>
              </div>

              <div className="bg-dark-card p-8 rounded-2xl border border-neutral-border/20">
                <h3 className="font-orbitron text-primary text-lg font-bold uppercase mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  {['Instagram', 'Facebook', 'Twitter', 'YouTube'].map((social) => (
                    <button
                      key={social}
                      className="px-4 py-2 bg-dark border border-neutral-border/30 rounded-lg text-white text-sm font-jakarta hover:border-primary hover:text-primary transition-all"
                    >
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-dark-card p-8 md:p-12 rounded-3xl border border-neutral-border/20">
              <h3 className="font-orbitron text-2xl font-black text-white uppercase mb-8">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">Your Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white outline-none focus:border-primary transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">Your Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white outline-none focus:border-primary transition-all text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white outline-none focus:border-primary transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">Subject</label>
                  <select className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white outline-none focus:border-primary transition-all text-sm">
                    <option>General Inquiry</option>
                    <option>Membership</option>
                    <option>Personal Training</option>
                    <option>Corporate Packages</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">Your Message</label>
                  <textarea
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white outline-none focus:border-primary transition-all text-sm resize-none"
                  />
                </div>
                <button className="w-full bg-primary text-dark font-jakarta font-black uppercase tracking-[0.2em] text-sm py-5 rounded-xl hover:bg-primary-hover transition-all shadow-[0_0_30px_-10px_#f0dd35]">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <BranchLocations />
  </main>
);

// Services Overview Page
const ServicesPage: React.FC = () => (
  <main>
    {/* Hero */}
    <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-16">
      <div className="absolute inset-0 bg-dark-card" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">Our Services</h4>
        <h1 className="font-orbitron text-5xl md:text-7xl font-black text-white uppercase italic mb-6">What We Offer</h1>
        <p className="font-inter text-neutral-gray max-w-xl mx-auto">
          Comprehensive fitness solutions designed to help you achieve your goals.
        </p>
      </div>
    </section>

    <ServicesCarousel />
    <Stats />
    <Trainers />
    <Pricing />
    <Facilities />
  </main>
);

// Layout wrapper for public pages
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Admin routes don't use the public layout
  if (isAdminRoute) {
    return (
      <AuthProvider>
        <Routes>
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/members"
            element={
              <ProtectedRoute>
                <MembersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/plans"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'SUPER_ADMIN']}>
                <PlansPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <ProtectedRoute>
                <PaymentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/staff"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'SUPER_ADMIN']}>
                <StaffPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/trainers"
            element={
              <ProtectedRoute>
                <TrainersPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    );
  }

  // Public routes
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/gym" element={<ServicePage serviceKey="gym" />} />
        <Route path="/yoga" element={<ServicePage serviceKey="yoga" />} />
        <Route path="/kickfit" element={<ServicePage serviceKey="kickfit" />} />
        <Route path="/group-x" element={<ServicePage serviceKey="group-x" />} />
        <Route path="/swimming" element={<ServicePage serviceKey="swimming" />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </PublicLayout>
  );
};

export default App;
