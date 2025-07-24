import React from 'react';
import Icon from '../../../components/AppIcon';

const LeadProgressIndicator = ({ leadsUsed, leadsLimit, subscriptionTier }) => {
  const usagePercentage = (leadsUsed / leadsLimit) * 100;
  const remainingLeads = leadsLimit - leadsUsed;

  const getStatusColor = () => {
    if (usagePercentage >= 90) return 'text-error';
    if (usagePercentage >= 75) return 'text-warning';
    return 'text-success';
  };

  const getProgressColor = () => {
    if (usagePercentage >= 90) return 'bg-error';
    if (usagePercentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  const getStatusIcon = () => {
    if (usagePercentage >= 90) return 'AlertTriangle';
    if (usagePercentage >= 75) return 'AlertCircle';
    return 'CheckCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Users" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Monthly Lead Quota</h3>
            <p className="text-sm text-muted-foreground">
              {subscriptionTier} Plan - Resets on the 1st of each month
            </p>
          </div>
        </div>
        <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
          <Icon name={getStatusIcon()} size={20} />
          <span className="text-sm font-medium">
            {remainingLeads} remaining
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Leads Used</span>
          <span className="font-mono text-foreground">
            {leadsUsed} / {leadsLimit}
          </span>
        </div>

        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          />
        </div>

        {usagePercentage >= 90 && (
          <div className="flex items-start space-x-2 p-3 bg-error/10 border border-error/20 rounded-md">
            <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-error">Quota Almost Exceeded</p>
              <p className="text-error/80 mt-1">
                You have {remainingLeads} lead{remainingLeads !== 1 ? 's' : ''} remaining this month. 
                Consider upgrading your plan for unlimited access.
              </p>
            </div>
          </div>
        )}

        {usagePercentage >= 75 && usagePercentage < 90 && (
          <div className="flex items-start space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-md">
            <Icon name="AlertCircle" size={16} className="text-warning mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-warning">Approaching Limit</p>
              <p className="text-warning/80 mt-1">
                You're using {Math.round(usagePercentage)}% of your monthly quota.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadProgressIndicator;