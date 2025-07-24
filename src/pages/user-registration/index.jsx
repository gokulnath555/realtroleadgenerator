import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicHeader from '../../components/ui/PublicHeader';
import PlanSelector from './components/PlanSelector';
import RegistrationForm from './components/RegistrationForm';
import PlanSummary from './components/PlanSummary';
import ProgressIndicator from './components/ProgressIndicator';
import Icon from '../../components/AppIcon';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({
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
  });

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const handleRegistrationSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call for registration and payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration data:', formData);
      
      // Redirect to dashboard after successful registration
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Start Your Real Estate Lead Generation Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of real estate professionals who trust Realtroleads to grow their business with qualified leads.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="max-w-md mx-auto mb-12">
            <ProgressIndicator currentStep={1} />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
                {/* Plan Selection */}
                <div className="mb-8">
                  <PlanSelector 
                    selectedPlan={selectedPlan}
                    onPlanChange={handlePlanChange}
                  />
                </div>

                {/* Registration Form */}
                <div className="border-t border-border pt-8">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Create Your Account
                  </h2>
                  <RegistrationForm
                    selectedPlan={selectedPlan}
                    onSubmit={handleRegistrationSubmit}
                    isLoading={isLoading}
                  />
                </div>

                {/* Login Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Plan Summary */}
            <div className="lg:col-span-1">
              <PlanSummary selectedPlan={selectedPlan} />
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground text-center mb-6">
                Trusted by Real Estate Professionals
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg mx-auto mb-3">
                    <Icon name="Shield" size={24} className="text-success" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Secure & Compliant</h4>
                  <p className="text-sm text-muted-foreground">
                    Bank-level security with SSL encryption and GDPR compliance
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
                    <Icon name="Users" size={24} className="text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">5,000+ Agents</h4>
                  <p className="text-sm text-muted-foreground">
                    Join thousands of successful real estate professionals
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-3">
                    <Icon name="Clock" size={24} className="text-accent" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">24/7 Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Get help whenever you need it with our dedicated support team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegistration;