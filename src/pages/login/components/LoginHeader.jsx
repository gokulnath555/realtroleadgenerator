import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link 
        to="/landing-page" 
        className="inline-flex items-center space-x-2 mb-6 transition-hover hover:opacity-80"
      >
        <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
          <Icon name="Building2" size={24} color="white" />
        </div>
        <span className="text-2xl font-semibold text-foreground">
          Realtroleads
        </span>
      </Link>

      {/* Welcome Text */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome Back
        </h1>
        <p className="text-muted-foreground">
          Sign in to your account to access your lead generation tools
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;