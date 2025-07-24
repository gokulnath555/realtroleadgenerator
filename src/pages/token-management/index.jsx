import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import TokenHeader from './components/TokenHeader';
import CustomizationPanel from './components/CustomizationPanel';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SharingTools from './components/SharingTools';
import { generateRealtorToken, generateShareableUrl } from '../../utils/tokenUtils';

const TokenManagement = () => {
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Mock user data - in real app, this would come from auth context
  const [user] = useState({
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@realty.com",
    subscriptionTier: "Premium",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });

  // Token state
  const [tokenData, setTokenData] = useState(() => {
    // Check if token exists in localStorage
    const saved = localStorage.getItem(`token_${user.id}`);
    if (saved) {
      return JSON.parse(saved);
    }
    // Generate new token if none exists
    return generateRealtorToken(user.id, user.name);
  });

  const shareableUrl = generateShareableUrl(tokenData.token);

  // Save token to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`token_${user.id}`, JSON.stringify(tokenData));
  }, [tokenData, user.id]);

  const handleRegenerateToken = () => {
    const newToken = generateRealtorToken(user.id, user.name);
    setTokenData(newToken);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCopyUrl = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleSaveCustomizations = (customizations) => {
    // In real app, save to backend
    console.log('Saving customizations:', customizations);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handlePreview = () => {
    // Open preview in new tab
    window.open(`/public-lead-capture-form?token=${tokenData.token}&preview=true`, '_blank');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader user={user} onLogout={handleLogout} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <button
              onClick={() => navigate('/user-dashboard')}
              className="hover:text-foreground transition-hover"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground font-medium">Token Management</span>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                    <Icon name="Link" size={24} className="text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">Token Management</h1>
                </div>
                <p className="text-muted-foreground">
                  Generate and manage your unique shareable links for lead capture across social media platforms.
                </p>
              </div>
              
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/user-dashboard')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={handlePreview}
                  iconName="Eye"
                  iconPosition="left"
                >
                  Preview Form
                </Button>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-success font-medium">Changes saved successfully!</span>
            </div>
          )}

          {/* Token Header */}
          <div className="mb-8">
            <TokenHeader
              token={tokenData.token}
              shareableUrl={shareableUrl}
              onRegenerateToken={handleRegenerateToken}
              onCopyUrl={handleCopyUrl}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Customization */}
            <div className="lg:col-span-1">
              <CustomizationPanel
                onSave={handleSaveCustomizations}
                onPreview={handlePreview}
              />
            </div>

            {/* Right Column - Analytics */}
            <div className="lg:col-span-2">
              <AnalyticsDashboard />
            </div>
          </div>

          {/* Sharing Tools */}
          <div className="mb-8">
            <SharingTools
              realtorName={user.name}
              shareableUrl={shareableUrl}
            />
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex flex-col space-y-3">
            <Button
              variant="outline"
              onClick={() => navigate('/user-dashboard')}
              iconName="ArrowLeft"
              iconPosition="left"
              fullWidth
            >
              Back to Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={handlePreview}
              iconName="Eye"
              iconPosition="left"
              fullWidth
            >
              Preview Form
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TokenManagement;