import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PublicHeader from '../../components/ui/PublicHeader';
import RealtorBranding from './components/RealtorBranding';
import PublicLeadForm from './components/PublicLeadForm';
import SuccessMessage from './components/SuccessMessage';
import { validateTokenFormat, extractRealtorIdFromToken } from '../../utils/tokenUtils';
import Icon from '../../components/AppIcon';

const PublicLeadCaptureForm = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [leadData, setLeadData] = useState(null);
  const [tokenError, setTokenError] = useState(null);
  const [realtorData, setRealtorData] = useState(null);
  const [customizations, setCustomizations] = useState(null);

  const token = searchParams.get('token');
  const isPreview = searchParams.get('preview') === 'true';

  // Mock realtor data - in real app, this would be fetched from backend based on token
  const mockRealtorData = {
    name: "Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    company: "Johnson Realty Group",
    phone: "(555) 123-4567",
    email: "sarah.johnson@realty.com",
    license: "TX-1234567"
  };

  const mockCustomizations = {
    welcomeMessage: "Looking to sell your property? I'd love to help you get the best value for your home. With over 10 years of experience in the local market, I provide personalized service and expert guidance throughout the entire selling process.",
    showPhoto: true,
    showContactInfo: true,
    primaryColor: "#3b82f6",
    customTitle: "Get Your Free Property Valuation"
  };

  useEffect(() => {
    if (!token) {
      setTokenError("No token provided. This link appears to be invalid.");
      return;
    }

    if (!validateTokenFormat(token)) {
      setTokenError("Invalid token format. This link appears to be corrupted.");
      return;
    }

    // In real app, fetch realtor data and customizations based on token
    const realtorId = extractRealtorIdFromToken(token);
    if (!realtorId) {
      setTokenError("Unable to identify realtor from token.");
      return;
    }

    // Simulate API call to fetch realtor data
    setTimeout(() => {
      setRealtorData(mockRealtorData);
      setCustomizations(mockCustomizations);
    }, 500);
  }, [token]);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to save lead
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would save to backend with realtor association
      const leadWithToken = {
        ...formData,
        token,
        realtorId: extractRealtorIdFromToken(token),
        submittedAt: new Date().toISOString()
      };
      
      console.log('Saving lead:', leadWithToken);
      
      setLeadData(formData);
      setShowSuccess(true);
      
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    // In real app, might redirect to a thank you page
    window.location.href = '/';
  };

  // Error state
  if (tokenError) {
    return (
      <div className="min-h-screen bg-background">
        <PublicHeader />
        
        <main className="pt-16">
          <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-8">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="AlertTriangle" size={32} className="text-error" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-4">Invalid Link</h1>
              <p className="text-muted-foreground mb-6">{tokenError}</p>
              
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Please contact your real estate agent for a valid link, or visit our homepage.
                </p>
                <div>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="text-primary hover:text-primary/80 underline"
                  >
                    Go to Homepage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Loading state
  if (!realtorData) {
    return (
      <div className="min-h-screen bg-background">
        <PublicHeader />
        
        <main className="pt-16">
          <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your personalized form...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <PublicHeader />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Preview Banner */}
          {isPreview && (
            <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg flex items-center space-x-2">
              <Icon name="Eye" size={16} className="text-warning" />
              <span className="text-warning font-medium">Preview Mode - This is how your form appears to potential leads</span>
            </div>
          )}

          {/* Realtor Branding */}
          <RealtorBranding 
            realtor={realtorData} 
            customizations={customizations}
          />

          {/* Main Content */}
          {showSuccess ? (
            <SuccessMessage
              leadData={leadData}
              realtorData={realtorData}
              onClose={handleSuccessClose}
            />
          ) : (
            <PublicLeadForm
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
              customizations={customizations}
            />
          )}

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border text-center">
            <div className="space-y-4">
              {/* Testimonial */}
              <div className="bg-card/50 rounded-lg p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                  ))}
                </div>
                <blockquote className="text-foreground italic mb-3">
                  "{realtorData.name} helped us sell our home for 15% above asking price. Professional, knowledgeable, and always responsive to our needs."
                </blockquote>
                <cite className="text-sm text-muted-foreground">- Recent Client</cite>
              </div>

              {/* Privacy & Security */}
              <div className="text-xs text-muted-foreground space-y-2">
                <div className="flex items-center justify-center space-x-4">
                  <span>🔒 SSL Encrypted</span>
                  <span>📞 No Spam Calls</span>
                  <span>✉️ Unsubscribe Anytime</span>
                </div>
                <p>
                  Your privacy is important to us. We will never share your information with third parties.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default PublicLeadCaptureForm;