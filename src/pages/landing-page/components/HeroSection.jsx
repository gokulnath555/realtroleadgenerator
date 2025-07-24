import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon name="TrendingUp" size={16} />
              <span>Trusted by 500+ Real Estate Professionals</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Generate Quality
              <span className="text-primary block">Real Estate Leads</span>
              Automatically
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Streamline your lead generation process with our automated system. Capture, validate, and organize qualified leads while preventing duplicates and managing your monthly limits.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link to="/user-registration">
                <Button 
                  variant="default" 
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  Start Free Trial
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="w-full sm:w-auto"
                onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
              >
                View Pricing
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-success" />
                <span>Bank-Level Security</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-elevation-2 p-8 border border-border">
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Real estate professional using lead generation dashboard"
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
              />
              
              {/* Floating Stats Cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-elevation-2 p-4 border border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-medium">+47 New Leads</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-elevation-2 p-4 border border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={16} className="text-primary" />
                  <span className="text-sm font-medium">94% Accuracy</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Lead validation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;