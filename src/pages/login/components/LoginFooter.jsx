import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const LoginFooter = () => {
  return (
    <div className="mt-8 text-center space-y-4">
      {/* Registration CTA */}
      <div className="p-6 bg-muted/50 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground mb-3">
          New to our platform?
        </p>
        <Link to="/user-registration">
          <Button variant="outline" size="sm">
            Start your free trial
          </Button>
        </Link>
      </div>

      {/* Demo Credentials Info */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
          <div className="text-left">
            <p className="text-xs font-medium text-primary mb-1">
              Demo Credentials Available
            </p>
            <p className="text-xs text-muted-foreground">
              Use demo@realtroleads.com with password Demo789! to explore the platform
            </p>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
        <div className="w-3 h-3 bg-success rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
        <span>Secured with SSL encryption</span>
      </div>
    </div>
  );
};

export default LoginFooter;