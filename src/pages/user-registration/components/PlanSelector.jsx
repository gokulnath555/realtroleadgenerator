import React from 'react';
import Icon from '../../../components/AppIcon';

const PlanSelector = ({ selectedPlan, onPlanChange }) => {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      leads: 50,
      features: [
        'Up to 50 leads per month',
        'Basic lead validation',
        'Email notifications',
        'Standard support'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 79,
      leads: 200,
      features: [
        'Up to 200 leads per month',
        'Advanced lead validation',
        'Priority email notifications',
        'Google Sheets integration',
        'Priority support',
        'Lead analytics dashboard'
      ],
      popular: true
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Choose Your Plan</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => onPlanChange(plan)}
            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedPlan.id === plan.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-2 left-4 bg-accent text-accent-foreground px-2 py-1 text-xs font-medium rounded">
                Most Popular
              </div>
            )}
            
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-foreground">{plan.name}</h4>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedPlan.id === plan.id
                  ? 'border-primary bg-primary' :'border-muted-foreground'
              }`}>
                {selectedPlan.id === plan.id && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
            
            <div className="mb-3">
              <span className="text-2xl font-bold text-foreground">${plan.price}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            
            <div className="text-sm text-muted-foreground mb-3">
              {plan.leads} leads per month
            </div>
            
            <ul className="space-y-1">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanSelector;