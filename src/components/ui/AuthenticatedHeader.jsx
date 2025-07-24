import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import UserProfileDropdown from './UserProfileDropdown';
import SubscriptionStatusIndicator from './SubscriptionStatusIndicator';

const AuthenticatedHeader = ({ user, onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'View your dashboard and metrics'
    },
    {
      label: 'Generate Leads',
      path: '/lead-generation-form',
      icon: 'UserPlus',
      tooltip: 'Create new leads'
    },
    {
      label: 'Account',
      path: '/account-management',
      icon: 'Settings',
      tooltip: 'Manage your account and subscription'
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link 
          to="/user-dashboard" 
          className="flex items-center space-x-2 transition-hover hover:opacity-80"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Building2" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            Realtroleads
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-hover ${
                isActiveRoute(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item.tooltip}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Subscription Status */}
          <SubscriptionStatusIndicator user={user} />
          
          {/* User Profile Dropdown */}
          <UserProfileDropdown user={user} onLogout={onLogout} />

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-hover"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-elevation-2 animate-slide-in">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-hover ${
                  isActiveRoute(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default AuthenticatedHeader;