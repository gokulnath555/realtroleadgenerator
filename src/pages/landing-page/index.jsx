import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PublicHeader from '../../components/ui/PublicHeader';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

const LandingPage = () => {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Add event listeners for smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Cleanup event listeners
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Realtroleads - Automated Real Estate Lead Generation Platform</title>
        <meta 
          name="description" 
          content="Streamline your real estate lead generation with our automated platform. Capture, validate, and organize qualified leads with duplicate prevention and Google Sheets integration. Trusted by 500+ professionals." 
        />
        <meta name="keywords" content="real estate leads, lead generation, real estate CRM, property leads, automated lead capture" />
        <meta property="og:title" content="Realtroleads - Automated Real Estate Lead Generation" />
        <meta property="og:description" content="Generate quality real estate leads automatically with our comprehensive platform designed for real estate professionals." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://realtroleads.com/landing-page" />
      </Helmet>

      {/* Header */}
      <PublicHeader />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* Testimonials Section */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;