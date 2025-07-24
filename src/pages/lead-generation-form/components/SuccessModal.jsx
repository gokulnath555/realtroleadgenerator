import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, leadData, onClose, onGenerateAnother, onViewDashboard }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-2 max-w-lg w-full">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Lead Successfully Generated!
            </h2>
            <p className="text-muted-foreground">
              Your new lead has been captured and added to your account.
            </p>
          </div>

          {/* Lead Summary */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">Lead Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium text-foreground">{leadData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-foreground">{leadData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium text-foreground">{leadData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Property:</span>
                <span className="font-medium text-foreground">
                  {leadData.propertyType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timeline:</span>
                <span className="font-medium text-foreground">
                  {leadData.sellingTimeline?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium text-foreground">{leadData.city}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-primary mb-1">What's Next?</p>
                <ul className="text-primary/80 space-y-1">
                  <li>• Lead data has been saved to your account</li>
                  <li>• You can view all leads in your dashboard</li>
                  <li>• Export data to Google Sheets anytime</li>
                  <li>• Monthly reports will include this lead</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-muted/50 border-t border-border rounded-b-lg">
          <Button
            variant="ghost"
            onClick={onViewDashboard}
            iconName="BarChart3"
            iconPosition="left"
          >
            View Dashboard
          </Button>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="default"
              onClick={onGenerateAnother}
              iconName="Plus"
              iconPosition="left"
            >
              Generate Another
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;