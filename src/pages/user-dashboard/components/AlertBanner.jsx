import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertBanner = ({ type, title, message, action, onAction, onDismiss, dismissible = true }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  const getAlertStyles = () => {
    switch (type) {
      case 'warning':
        return {
          container: 'bg-warning/10 border-warning/20 text-warning-foreground',
          icon: 'AlertTriangle',
          iconColor: 'text-warning'
        };
      case 'error':
        return {
          container: 'bg-error/10 border-error/20 text-error-foreground',
          icon: 'AlertCircle',
          iconColor: 'text-error'
        };
      case 'success':
        return {
          container: 'bg-success/10 border-success/20 text-success-foreground',
          icon: 'CheckCircle',
          iconColor: 'text-success'
        };
      case 'info':
      default:
        return {
          container: 'bg-primary/10 border-primary/20 text-primary-foreground',
          icon: 'Info',
          iconColor: 'text-primary'
        };
    }
  };

  if (!isVisible) return null;

  const styles = getAlertStyles();

  return (
    <div className={`border rounded-lg p-4 ${styles.container}`}>
      <div className="flex items-start space-x-3">
        <div className={`flex items-center justify-center w-6 h-6 ${styles.iconColor}`}>
          <Icon name={styles.icon} size={20} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground mb-1">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
          
          {action && onAction && (
            <div className="mt-3">
              <Button
                variant={type === 'error' ? 'destructive' : 'default'}
                size="sm"
                onClick={onAction}
              >
                {action}
              </Button>
            </div>
          )}
        </div>
        
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="flex items-center justify-center w-6 h-6 text-muted-foreground hover:text-foreground transition-hover"
            aria-label="Dismiss alert"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertBanner;