import React from 'react';
import Image from '../../../components/AppImage';

const SocialProofSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Real Estate Agent",
      company: "Century 21",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      quote: "Realtroleads has transformed my business. I've generated 50+ qualified leads in just 2 months."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Broker",
      company: "RE/MAX",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      quote: "The lead quality is exceptional. My conversion rate has increased by 40% since using this platform."
    }
  ];

  const companyLogos = [
    { name: "Century 21", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=40&fit=crop" },
    { name: "RE/MAX", logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=120&h=40&fit=crop" },
    { name: "Coldwell Banker", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=40&fit=crop" }
  ];

  return (
    <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-primary/5 to-accent/5 p-12">
      <div className="h-full flex flex-col justify-center space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Trusted by Real Estate Professionals
          </h2>
          <p className="text-muted-foreground">
            Join thousands of agents generating quality leads daily
          </p>
        </div>

        {/* Testimonials */}
        <div className="space-y-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card p-6 rounded-lg shadow-elevation-1 border border-border">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <blockquote className="text-sm text-foreground mb-3">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Logos */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-4">
            Trusted by professionals at leading real estate companies
          </p>
          <div className="flex items-center justify-center space-x-6 opacity-60">
            {companyLogos.map((company, index) => (
              <div key={index} className="h-8 w-20 bg-muted rounded flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">10K+</div>
            <div className="text-xs text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">250K+</div>
            <div className="text-xs text-muted-foreground">Leads Generated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">98%</div>
            <div className="text-xs text-muted-foreground">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofSection;