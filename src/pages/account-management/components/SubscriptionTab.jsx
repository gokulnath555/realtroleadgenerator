import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubscriptionTab = ({ user, onUpdateSubscription }) => {
  const [selectedPlan, setSelectedPlan] = useState(user?.subscriptionTier || 'Free');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      id: 'Free',
      name: 'Free Plan',
      price: { monthly: 0, yearly: 0 },
      features: [
        '10 leads per month',
        'Basic lead validation',
        'Email notifications',
        'Standard support'
      ],
      limitations: [
        'Limited customization',
        'No priority support',
        'Basic analytics'
      ],
      popular: false
    },
    {
      id: 'Starter',
      name: 'Starter Plan',
      price: { monthly: 29, yearly: 290 },
      features: [
        '100 leads per month',
        'Advanced lead validation',
        'Priority email notifications',
        'Google Sheets integration',
        'Lead export functionality',
        'Email support'
      ],
      limitations: [
        'Limited customization options'
      ],
      popular: true
    },
    {
      id: 'Premium',
      name: 'Premium Plan',
      price: { monthly: 79, yearly: 790 },
      features: [
        'Unlimited leads per month',
        'Advanced lead validation',
        'Real-time notifications',
        'Full Google Sheets integration',
        'Advanced lead export',
        'Custom lead fields',
        'Priority support',
        'Advanced analytics',
        'API access'
      ],
      limitations: [],
      popular: false
    }
  ];

  const currentPlan = plans.find(plan => plan.id === user?.subscriptionTier) || plans[0];
  const newPlan = plans.find(plan => plan.id === selectedPlan);

  const handlePlanChange = (planId) => {
    setSelectedPlan(planId);
  };

  const handleUpgrade = () => {
    if (selectedPlan === user?.subscriptionTier) {
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmPlanChange = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onUpdateSubscription({
        tier: selectedPlan,
        billingCycle,
        effectiveDate: new Date().toISOString()
      });
      
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Failed to update subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUsagePercentage = () => {
    const used = user?.leadsUsed || 0;
    const limit = user?.leadsLimit || 10;
    return Math.min((used / limit) * 100, 100);
  };

  const getNextBillingDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      <div className="p-6 bg-card border border-border rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Current Subscription</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm font-medium text-success">Active</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Plan</p>
            <p className="text-lg font-semibold text-foreground">{currentPlan.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Monthly Price</p>
            <p className="text-lg font-semibold text-foreground">
              ${currentPlan.price.monthly}/month
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Next Billing</p>
            <p className="text-lg font-semibold text-foreground">{getNextBillingDate()}</p>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Leads Used This Month</span>
            <span className="text-sm font-mono text-foreground">
              {user?.leadsUsed || 0}/{user?.leadsLimit || 10}
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${getUsagePercentage()}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Resets on the 1st of each month
          </p>
        </div>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex items-center justify-center space-x-4 p-4 bg-muted/30 rounded-lg">
        <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
          Monthly
        </span>
        <button
          onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
          className="relative w-12 h-6 bg-muted rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <div className={`absolute top-1 left-1 w-4 h-4 bg-primary rounded-full transition-transform ${
            billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'
          }`} />
        </button>
        <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
          Yearly
        </span>
        {billingCycle === 'yearly' && (
          <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded-full">
            Save 17%
          </span>
        )}
      </div>

      {/* Plan Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative p-6 border rounded-lg transition-all cursor-pointer ${
              selectedPlan === plan.id
                ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
            } ${plan.popular ? 'ring-2 ring-accent' : ''}`}
            onClick={() => handlePlanChange(plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-4">
              <h4 className="text-lg font-semibold text-foreground mb-2">{plan.name}</h4>
              <div className="text-3xl font-bold text-foreground">
                ${plan.price[billingCycle]}
                <span className="text-sm font-normal text-muted-foreground">
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
              {plan.limitations.map((limitation, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="X" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{limitation}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedPlan === plan.id
                  ? 'border-primary bg-primary' :'border-muted-foreground'
              }`}>
                {selectedPlan === plan.id && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full m-0.5" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={() => setSelectedPlan(user?.subscriptionTier || 'Free')}
          disabled={selectedPlan === user?.subscriptionTier}
        >
          Reset
        </Button>
        <Button
          variant="default"
          onClick={handleUpgrade}
          disabled={selectedPlan === user?.subscriptionTier}
          iconName={selectedPlan === 'Free' ? 'ArrowDown' : 'ArrowUp'}
          iconPosition="left"
        >
          {selectedPlan === 'Free' ? 'Downgrade' : 'Upgrade'} Plan
        </Button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-card border border-border rounded-lg shadow-elevation-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full">
                <Icon name="CreditCard" size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Confirm Plan Change</h3>
            </div>
            
            <div className="space-y-4 mb-6">
              <p className="text-sm text-muted-foreground">
                You are about to change from <strong>{currentPlan.name}</strong> to <strong>{newPlan?.name}</strong>.
              </p>
              
              <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">New Plan:</span>
                  <span className="text-sm font-medium text-foreground">{newPlan?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Price:</span>
                  <span className="text-sm font-medium text-foreground">
                    ${newPlan?.price[billingCycle]}/{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Effective:</span>
                  <span className="text-sm font-medium text-foreground">Immediately</span>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Changes will be reflected in your next billing cycle. You can cancel or modify your subscription at any time.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
                disabled={isLoading}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={confirmPlanChange}
                loading={isLoading}
                fullWidth
              >
                Confirm Change
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionTab;