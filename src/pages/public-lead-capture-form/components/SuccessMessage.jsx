import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessMessage = ({ leadData, realtorData, onClose }) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-8">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Thank You, {leadData?.fullName}!
        </h2>
        
        <p className="text-lg text-muted-foreground mb-6">
          Your information has been successfully submitted. I'll review your property details and get back to you within 24 hours with a personalized consultation.
        </p>

        {/* Next Steps */}
        <div className="bg-muted/30 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">What Happens Next?</h3>
          
          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">1</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Property Analysis</p>
                <p className="text-sm text-muted-foreground">I'll research your property and local market conditions</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">2</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Personal Contact</p>
                <p className="text-sm text-muted-foreground">I'll call or email you to schedule a consultation</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">3</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Market Valuation</p>
                <p className="text-sm text-muted-foreground">Receive your free, detailed property valuation report</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted-foreground mb-4">
            Have questions or want to discuss immediately?
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {realtorData?.phone || '(555) 123-4567'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {realtorData?.email || 'sarah.johnson@realty.com'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-8">
          <Button
            variant="outline"
            onClick={() => window.location.href = `tel:${realtorData?.phone || '5551234567'}`}
            iconName="Phone"
            iconPosition="left"
            className="sm:flex-1"
          >
            Call Now
          </Button>
          
          <Button
            variant="default"
            onClick={onClose}
            iconName="Home"
            iconPosition="left"
            className="sm:flex-1"
          >
            Done
          </Button>
        </div>

        {/* Social Proof */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning fill-current" />
              <span>5.0 Rating</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>200+ Happy Clients</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Award" size={12} />
              <span>Local Expert</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;