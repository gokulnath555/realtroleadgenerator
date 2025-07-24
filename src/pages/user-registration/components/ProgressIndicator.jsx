import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, label: 'Account Details', icon: 'User' },
    { id: 2, label: 'Plan Selection', icon: 'CreditCard' },
    { id: 3, label: 'Confirmation', icon: 'CheckCircle' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  step.id < currentStep
                    ? 'bg-success border-success text-white'
                    : step.id === currentStep
                    ? 'bg-primary border-primary text-white' :'bg-background border-muted-foreground text-muted-foreground'
                }`}
              >
                {step.id < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-all ${
                  step.id < currentStep ? 'bg-success' : 'bg-muted'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;