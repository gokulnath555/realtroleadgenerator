import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Real Estate Agent",
      company: "Premier Properties",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      content: `Realtroleads has completely transformed how I manage my lead generation. The duplicate prevention feature alone has saved me countless hours, and the Google Sheets integration makes it so easy to share leads with my team.`,
      metrics: {
        label: "Lead Quality Increase",
        value: "85%"
      }
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Broker & Team Leader",
      company: "Rodriguez Realty Group",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      content: `As a team leader managing multiple agents, this platform has been a game-changer. The automated validation and organization features help us maintain data quality while scaling our operations efficiently.`,
      metrics: {
        label: "Time Saved Weekly",
        value: "12 hrs"
      }
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Independent Agent",
      company: "Chen Real Estate Services",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      content: `The mobile-responsive forms and real-time validation have made it so much easier to capture leads on the go. My conversion rate has improved significantly since switching to Realtroleads.`,
      metrics: {
        label: "Conversion Rate",
        value: "+47%"
      }
    }
  ];

  const stats = [
    {
      icon: "Users",
      value: "500+",
      label: "Active Users"
    },
    {
      icon: "TrendingUp",
      value: "94%",
      label: "Lead Accuracy"
    },
    {
      icon: "Clock",
      value: "10hrs",
      label: "Avg. Time Saved/Week"
    },
    {
      icon: "Star",
      value: "4.9/5",
      label: "Customer Rating"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Trusted by Real Estate Professionals
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how our platform is helping real estate professionals across the country generate more qualified leads and grow their business.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mx-auto mb-4">
                <Icon name={stat.icon} size={24} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card border border-border rounded-xl p-8 hover:shadow-elevation-2 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-primary">
                    {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="bg-muted rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">
                  {testimonial.metrics.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.metrics.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-16 border-t border-border">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Trusted & Secure Platform
            </h3>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {/* Security Badges */}
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} className="text-success" />
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="text-sm font-medium">SOC 2 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Database" size={20} className="text-success" />
              <span className="text-sm font-medium">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;