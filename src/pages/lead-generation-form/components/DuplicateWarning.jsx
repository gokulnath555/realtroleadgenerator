import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DuplicateWarning = ({ duplicateLead, onProceed, onCancel }) => {
  if (!duplicateLead) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-2 max-w-md w-full">
        <div className="p-6">
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Duplicate Lead Detected
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                A lead with this email address already exists in your account:
              </p>
              
              <div className="bg-muted rounded-md p-3 mb-4">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium text-foreground">{duplicateLead.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-foreground">{duplicateLead.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Added:</span>
                    <span className="font-medium text-foreground">
                      {new Date(duplicateLead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Would you like to proceed anyway? This will create a duplicate entry and count toward your monthly limit.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-muted/50 border-t border-border rounded-b-lg">
          <Button
            variant="ghost"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="warning"
            onClick={onProceed}
            iconName="AlertTriangle"
            iconPosition="left"
          >
            Proceed Anyway
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DuplicateWarning;