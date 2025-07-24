import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ user, onExportLeads, onUpgrade }) => {
  const canGenerateLeads = user?.leadsUsed < user?.leadsLimit;
  const isApproachingLimit = (user?.leadsUsed / user?.leadsLimit) >= 0.8;

  const quickActions = [
    {
      id: 'generate',
      title: 'Generate New Lead',
      description: 'Create a new lead entry',
      icon: 'UserPlus',
      color: 'primary',
      action: 'link',
      to: '/lead-generation-form',
      disabled: !canGenerateLeads
    },
    {
      id: 'export',
      title: 'Export to Google Sheets',
      description: 'Download your leads data',
      icon: 'Download',
      color: 'secondary',
      action: 'function',
      onClick: onExportLeads
    },
    {
      id: 'account',
      title: 'Account Settings',
      description: 'Manage your profile and billing',
      icon: 'Settings',
      color: 'secondary',
      action: 'link',
      to: '/account-management'
    }
  ];

  const getButtonVariant = (color, disabled) => {
    if (disabled) return 'outline';
    return color === 'primary' ? 'default' : 'outline';
  };

  return (
    <div className="space-y-6">
      {/* Upgrade Prompt */}
      {isApproachingLimit && user?.subscriptionTier === 'Free' && (
        <div className="bg-gradient-to-r from-warning/10 to-accent/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-warning/20 rounded-full">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground mb-1">
                Approaching Limit
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                You've used {user.leadsUsed} of {user.leadsLimit} leads this month. Upgrade for unlimited access.
              </p>
              <Button
                variant="default"
                size="sm"
                iconName="ArrowUp"
                iconPosition="left"
                onClick={onUpgrade}
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        </div>
        
        <div className="p-6 space-y-4">
          {quickActions.map((action) => (
            <div key={action.id} className="group">
              {action.action === 'link' ? (
                <Link 
                  to={action.to}
                  className={`block ${action.disabled ? 'pointer-events-none opacity-50' : ''}`}
                >
                  <div className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-smooth">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                      action.color === 'primary' ?'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                    }`}>
                      <Icon name={action.icon} size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-hover">
                        {action.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-hover" />
                  </div>
                </Link>
              ) : (
                <button
                  onClick={action.onClick}
                  className="w-full flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-smooth text-left"
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                    action.color === 'primary' ?'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={action.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-hover">
                      {action.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-hover" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Status */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Subscription</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              user?.subscriptionTier === 'Premium' ?'bg-success/10 text-success border border-success/20' :'bg-muted text-muted-foreground border border-border'
            }`}>
              {user?.subscriptionTier || 'Free'}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Monthly Leads</span>
              <span className="font-mono text-foreground">
                {user?.leadsUsed || 0}/{user?.leadsLimit || 10}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Next Reset</span>
              <span className="text-foreground">
                {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            {user?.subscriptionTier === 'Free' && (
              <div className="pt-3 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Crown"
                  iconPosition="left"
                  onClick={onUpgrade}
                  fullWidth
                >
                  Upgrade to Premium
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;