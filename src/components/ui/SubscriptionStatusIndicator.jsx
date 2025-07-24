import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const SubscriptionStatusIndicator = ({ user }) => {
  const [showDetails, setShowDetails] = useState(false);

  const leadsUsed = user?.leadsUsed || 0;
  const leadsLimit = user?.leadsLimit || 10;
  const subscriptionTier = user?.subscriptionTier || 'Free';
  const usagePercentage = (leadsUsed / leadsLimit) * 100;

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

  const handleUpgrade = () => {
    // Navigate to upgrade page or open upgrade modal
    window.location.href = '/account-management?tab=subscription';
  };

  return (
    <div className="hidden sm:flex items-center space-x-3">
      {/* Desktop View */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={16} className="text-muted-foreground" />
          <span className="text-sm font-mono text-foreground">
            {leadsUsed}/{leadsLimit}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getProgressColor()}`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          />
        </div>

        {/* Status Indicator */}
        <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
          {usagePercentage >= 90 ? (
            <Icon name="AlertTriangle" size={14} />
          ) : usagePercentage >= 75 ? (
            <Icon name="AlertCircle" size={14} />
          ) : (
            <Icon name="CheckCircle" size={14} />
          )}
        </div>
      </div>

      {/* Upgrade Button (shown when approaching limit) */}
      {usagePercentage >= 75 && subscriptionTier === 'Free' && (
        <Button
          variant="outline"
          size="xs"
          onClick={handleUpgrade}
          className="text-xs"
        >
          Upgrade
        </Button>
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="sm:hidden p-1 rounded-md hover:bg-muted transition-hover"
        aria-label="Toggle subscription details"
      >
        <Icon name="Info" size={16} className="text-muted-foreground" />
      </button>

      {/* Mobile Details Dropdown */}
      {showDetails && (
        <div className="absolute top-16 right-4 w-64 bg-popover border border-border rounded-md shadow-elevation-2 z-50 animate-scale-in sm:hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-popover-foreground">
                Current Plan
              </span>
              <span className="text-sm font-medium text-accent">
                {subscriptionTier}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Leads Used</span>
                <span className="text-xs font-mono text-foreground">
                  {leadsUsed}/{leadsLimit}
                </span>
              </div>
              
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getProgressColor()}`}
                  style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                />
              </div>
              
              {usagePercentage >= 75 && (
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUpgrade}
                    fullWidth
                  >
                    Upgrade Plan
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionStatusIndicator;