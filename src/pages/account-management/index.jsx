import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import ProfileTab from './components/ProfileTab';
import SubscriptionTab from './components/SubscriptionTab';
import BillingTab from './components/BillingTab';

const AccountManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  // Mock user data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = {
          id: 'user_001',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@realestate.com',
          phone: '+1 (555) 123-4567',
          company: 'Johnson Realty Group',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          subscriptionTier: 'Premium',
          leadsUsed: 45,
          leadsLimit: 1000,
          joinDate: '2024-03-15',
          lastLogin: new Date().toISOString()
        };
        
        setUser(mockUser);
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Check URL parameters for tab selection
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab && ['profile', 'subscription', 'billing'].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const handleUpdateProfile = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleUpdateSubscription = (subscriptionData) => {
    setUser(prev => ({
      ...prev,
      subscriptionTier: subscriptionData.tier,
      leadsLimit: subscriptionData.tier === 'Free' ? 10 : 
                   subscriptionData.tier === 'Starter' ? 100 : 1000
    }));
    setSuccessMessage(`Subscription updated to ${subscriptionData.tier} plan!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleUpdatePaymentMethod = (paymentData) => {
    // Handle payment method updates
    console.log('Payment method updated:', paymentData);
    setSuccessMessage('Payment method updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Manage your personal information'
    },
    {
      id: 'subscription',
      label: 'Subscription',
      icon: 'CreditCard',
      description: 'View and manage your plan'
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: 'Receipt',
      description: 'Payment methods and history'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AuthenticatedHeader user={user} onLogout={handleLogout} />
        <div className="pt-16">
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-muted-foreground">Loading account information...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader user={user} onLogout={handleLogout} />
      
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name="Settings" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Account Management</h1>
                <p className="text-muted-foreground">
                  Manage your profile, subscription, and billing information
                </p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <p className="text-sm text-success font-medium">{successMessage}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab.icon} size={18} />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{tab.label}</div>
                        <div className={`text-xs ${
                          activeTab === tab.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                        }`}>
                          {tab.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Account Summary */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-sm font-medium text-foreground mb-3">Account Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Plan</span>
                      <span className="font-medium text-foreground">{user?.subscriptionTier}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Leads Used</span>
                      <span className="font-medium text-foreground">
                        {user?.leadsUsed}/{user?.leadsLimit}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Member Since</span>
                      <span className="font-medium text-foreground">
                        {new Date(user?.joinDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-lg">
                {/* Mobile Tab Navigation */}
                <div className="lg:hidden border-b border-border">
                  <div className="flex overflow-x-auto">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon name={tab.icon} size={16} />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'profile' && (
                    <ProfileTab 
                      user={user} 
                      onUpdateProfile={handleUpdateProfile}
                    />
                  )}
                  
                  {activeTab === 'subscription' && (
                    <SubscriptionTab 
                      user={user} 
                      onUpdateSubscription={handleUpdateSubscription}
                    />
                  )}
                  
                  {activeTab === 'billing' && (
                    <BillingTab 
                      user={user} 
                      onUpdatePaymentMethod={handleUpdatePaymentMethod}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;