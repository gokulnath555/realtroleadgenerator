import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individual agents getting started",
      monthlyPrice: 29,
      yearlyPrice: 290,
      leadLimit: 50,
      popular: false,
      features: [
        "Up to 50 leads per month",
        "Basic lead validation",
        "Email duplicate detection",
        "Google Sheets export",
        "Email support",
        "Mobile-responsive forms",
        "Basic analytics dashboard",
        "SSL security"
      ],
      limitations: [
        "No phone support",
        "Limited customization",
        "Basic reporting only"
      ]
    },
    {
      name: "Premium",
      description: "Ideal for teams and high-volume agents",
      monthlyPrice: 79,
      yearlyPrice: 790,
      leadLimit: 200,
      popular: true,
      features: [
        "Up to 200 leads per month",
        "Advanced lead validation",
        "Email & phone duplicate detection",
        "Google Sheets integration",
        "Priority email & phone support",
        "Custom form branding",
        "Advanced analytics & reporting",
        "API access",
        "Team collaboration tools",
        "Lead scoring system",
        "Automated follow-up reminders",
        "Export to multiple formats"
      ],
      limitations: []
    }
  ];

  const getCurrentPrice = (plan) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    return monthlyCost - yearlyCost;
  };

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the plan that fits your business needs. All plans include our core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-lg p-1 border border-border shadow-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'monthly' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                billingCycle === 'yearly' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-success text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl border-2 p-8 lg:p-10 transition-all duration-300 hover:shadow-elevation-2 ${
                plan.popular
                  ? 'border-primary shadow-elevation-1 scale-105'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-foreground">
                      ${getCurrentPrice(plan)}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-success mt-2">
                      Save ${getSavings(plan)} per year
                    </p>
                  )}
                </div>

                {/* Lead Limit */}
                <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span className="text-sm font-medium">
                    {plan.leadLimit} leads per month
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Check" size={16} className="text-success mr-2" />
                  What's included:
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} className="text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-foreground mb-4 flex items-center">
                      <Icon name="X" size={16} className="text-muted-foreground mr-2" />
                      Not included:
                    </h4>
                    <ul className="space-y-3">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="flex items-start space-x-3">
                          <Icon name="X" size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Link to="/user-registration" className="block">
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Get Started with {plan.name}
                </Button>
              </Link>

              {/* Money Back Guarantee */}
              <div className="text-center mt-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Shield" size={14} className="text-success" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl p-8 border border-border shadow-sm max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Need a custom solution?
            </h3>
            <p className="text-muted-foreground mb-6">
              For agencies with higher volume requirements or custom integrations, we offer enterprise solutions tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" iconName="Phone" iconPosition="left">
                Schedule a Call
              </Button>
              <Button variant="ghost" iconName="Mail" iconPosition="left">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;