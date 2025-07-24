import React from 'react';
import Icon from '../../../components/AppIcon';

const RealtorBranding = ({ realtor, customizations }) => {
  // Mock realtor data - in real app, this would be fetched based on token
  const defaultRealtor = {
    name: "Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    company: "Johnson Realty Group",
    phone: "(555) 123-4567",
    email: "sarah.johnson@realty.com",
    license: "TX-1234567"
  };

  const realtorData = realtor || defaultRealtor;
  const showPhoto = customizations?.showPhoto !== false;
  const showContactInfo = customizations?.showContactInfo !== false;

  return (
    <div className="text-center mb-8">
      {/* Company Logo */}
      {customizations?.companyLogo && (
        <div className="mb-4">
          <img
            src={customizations.companyLogo}
            alt="Company Logo"
            className="h-16 mx-auto"
          />
        </div>
      )}

      {/* Realtor Photo */}
      {showPhoto && (
        <div className="mb-4">
          <img
            src={realtorData.photo}
            alt={realtorData.name}
            className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
          />
        </div>
      )}

      {/* Realtor Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {realtorData.name}
        </h2>
        <p className="text-lg text-muted-foreground mb-1">
          {realtorData.company}
        </p>
        {realtorData.license && (
          <p className="text-sm text-muted-foreground">
            License #{realtorData.license}
          </p>
        )}
      </div>

      {/* Contact Information */}
      {showContactInfo && (
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 mb-6">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Phone" size={16} />
            <span className="text-sm">{realtorData.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Mail" size={16} />
            <span className="text-sm">{realtorData.email}</span>
          </div>
        </div>
      )}

      {/* Welcome Message */}
      <div className="mb-8">
        <p className="text-lg text-foreground leading-relaxed max-w-2xl mx-auto">
          {customizations?.welcomeMessage || 
            "Looking to sell your property? I'd love to help you get the best value for your home. Fill out the form below to get started with your free consultation."}
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap items-center justify-center space-x-4 space-y-2 mb-8">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="Shield" size={14} />
          <span>Licensed Professional</span>
        </div>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>Quick Response</span>
        </div>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="Award" size={14} />
          <span>Local Expert</span>
        </div>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="Lock" size={14} />
          <span>Secure & Private</span>
        </div>
      </div>
    </div>
  );
};

export default RealtorBranding;