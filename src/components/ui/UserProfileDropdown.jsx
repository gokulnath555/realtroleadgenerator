import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      onLogout();
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-muted transition-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || 'User'}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            getInitials(user?.name || 'User')
          )}
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-md shadow-elevation-2 z-50 animate-scale-in">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'User'}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  getInitials(user?.name || 'User')
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-popover-foreground truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Subscription Status */}
          <div className="px-4 py-2 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Plan</span>
              <span className="text-xs font-medium text-accent">
                {user?.subscriptionTier || 'Free'}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-muted-foreground">Leads</span>
              <span className="text-xs font-mono text-foreground">
                {user?.leadsUsed || 0}/{user?.leadsLimit || 10}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              to="/account-management"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-hover"
            >
              <Icon name="Settings" size={16} />
              <span>Account Settings</span>
            </Link>
            
            <Link
              to="/user-dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-hover"
            >
              <Icon name="BarChart3" size={16} />
              <span>Dashboard</span>
            </Link>

            <button
              onClick={() => {
                setIsOpen(false);
                // Help functionality can be implemented here
              }}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-hover text-left"
            >
              <Icon name="HelpCircle" size={16} />
              <span>Help & Support</span>
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-border py-1">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-hover text-left"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;