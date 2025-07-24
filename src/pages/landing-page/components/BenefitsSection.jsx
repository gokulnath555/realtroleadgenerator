import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: "Target",
      title: "Automated Lead Capture",
      description: "Streamline your lead generation process with our intelligent capture system that automatically validates and organizes incoming leads.",
      features: [
        "Real-time form validation",
        "Smart data organization",
        "Instant lead notifications",
        "Mobile-optimized forms"
      ]
    },
    {
      icon: "Shield",
      title: "Duplicate Prevention",
      description: "Never waste time on duplicate leads again. Our advanced system detects and prevents duplicate entries across your entire database.",
      features: [
        "Email duplicate detection",
        "Phone number validation",
        "Cross-reference checking",
        "Clean database maintenance"
      ]
    },
    {
      icon: "FileSpreadsheet",
      title: "Google Sheets Integration",
      description: "Seamlessly export your leads to Google Sheets for easy sharing, analysis, and integration with your existing workflow.",
      features: [
        "One-click export",
        "Automated formatting",
        "Real-time synchronization",
        "Custom field mapping"
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Real Estate Professionals Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive lead generation platform is designed specifically for real estate professionals who need reliable, efficient, and scalable solutions.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="group">
              <div className="bg-card border border-border rounded-xl p-8 h-full hover:shadow-elevation-2 transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon name={benefit.icon} size={32} className="text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Feature List */}
                <ul className="space-y-3">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-muted px-6 py-3 rounded-full">
            <Icon name="Users" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              Join 500+ real estate professionals already using our platform
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;