import React from 'react';
import Icon from '../../../components/AppIcon';

const PlanSummary = ({ selectedPlan }) => {
  const calculateTotal = () => {
    const subtotal = selectedPlan.price;
    const tax = subtotal * 0.08; // 8% tax
    return {
      subtotal,
      tax,
      total: subtotal + tax
    };
  };

  const pricing = calculateTotal();

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Plan Summary</h3>
        {selectedPlan.popular && (
          <span className="bg-accent text-accent-foreground px-2 py-1 text-xs font-medium rounded">
            Popular Choice
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* Plan Details */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-foreground">{selectedPlan.name} Plan</h4>
            <span className="text-lg font-bold text-foreground">
              ${selectedPlan.price}/month
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Up to {selectedPlan.leads} leads per month
          </p>
        </div>

        {/* Features List */}
        <div>
          <h5 className="font-medium text-foreground mb-3">What's included:</h5>
          <ul className="space-y-2">
            {selectedPlan.features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing Breakdown */}
        <div className="pt-4 border-t border-border space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">${pricing.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span className="text-foreground">${pricing.tax.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold pt-2 border-t border-border">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">${pricing.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Billing Info */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-primary font-medium mb-1">Billing Information</p>
              <p className="text-muted-foreground">
                You'll be charged ${pricing.total.toFixed(2)} today, then ${pricing.total.toFixed(2)} monthly. 
                Cancel anytime from your account settings.
              </p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={14} className="text-success" />
          <span>Secure payment processing</span>
        </div>
      </div>
    </div>
  );
};

export default PlanSummary;