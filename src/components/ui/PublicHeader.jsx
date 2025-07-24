import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PublicHeader = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link 
          to="/landing-page" 
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
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <Link
              to="/landing-page"
              className={`text-sm font-medium transition-hover ${
                isActiveRoute('/landing-page')
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Home
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/user-registration">
              <Button variant="default" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-hover"
          aria-label="Toggle mobile menu"
        >
          <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-elevation-2 animate-slide-in">
          <nav className="px-4 py-4 space-y-3">
            <Link
              to="/landing-page"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-hover ${
                isActiveRoute('/landing-page')
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Home
            </Link>
            
            <div className="pt-3 border-t border-border space-y-2">
              <Link 
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                <Button variant="ghost" size="sm" fullWidth>
                  Sign In
                </Button>
              </Link>
              <Link 
                to="/user-registration"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                <Button variant="default" size="sm" fullWidth>
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;