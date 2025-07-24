import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const CustomizationPanel = ({ onSave, onPreview }) => {
  const [customizations, setCustomizations] = useState({
    welcomeMessage: 'Looking to sell your property? I\'d love to help you get the best value for your home.',
    companyLogo: null,
    showPhoto: true,
    showContactInfo: true,
    primaryColor: '#3b82f6',
    customTitle: 'Get Your Free Property Valuation'
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomizations(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name, checked) => {
    setCustomizations(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setCustomizations(prev => ({
        ...prev,
        companyLogo: URL.createObjectURL(file)
      }));
      setIsUploading(false);
    }, 1500);
  };

  const handleSave = () => {
    onSave(customizations);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Customize Your Lead Form</h3>
          <p className="text-sm text-muted-foreground">
            Personalize how your lead capture form appears to potential sellers.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onPreview}
          iconName="Eye"
          iconPosition="left"
        >
          Preview
        </Button>
      </div>

      <div className="space-y-6">
        {/* Welcome Message */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Welcome Message
          </label>
          <textarea
            name="welcomeMessage"
            value={customizations.welcomeMessage}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            placeholder="Enter a personalized welcome message..."
          />
        </div>

        {/* Custom Title */}
        <Input
          label="Form Title"
          name="customTitle"
          value={customizations.customTitle}
          onChange={handleInputChange}
          placeholder="Enter a compelling form title"
        />

        {/* Company Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Company Logo
          </label>
          <div className="flex items-center space-x-4">
            {customizations.companyLogo ? (
              <div className="w-16 h-16 rounded-lg border border-border overflow-hidden">
                <img
                  src={customizations.companyLogo}
                  alt="Company Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <Icon name="Building2" size={24} className="text-muted-foreground" />
              </div>
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <label htmlFor="logo-upload">
                <Button
                  as="span"
                  variant="outline"
                  size="sm"
                  loading={isUploading}
                  iconName="Upload"
                  iconPosition="left"
                  className="cursor-pointer"
                >
                  {isUploading ? 'Uploading...' : 'Upload Logo'}
                </Button>
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG up to 2MB. Recommended: 200x200px
              </p>
            </div>
          </div>
        </div>

        {/* Display Options */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Display Options
          </label>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showPhoto"
                checked={customizations.showPhoto}
                onChange={(e) => handleCheckboxChange('showPhoto', e.target.checked)}
              />
              <label htmlFor="showPhoto" className="text-sm text-foreground">
                Show my profile photo
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showContactInfo"
                checked={customizations.showContactInfo}
                onChange={(e) => handleCheckboxChange('showContactInfo', e.target.checked)}
              />
              <label htmlFor="showContactInfo" className="text-sm text-foreground">
                Display contact information
              </label>
            </div>
          </div>
        </div>

        {/* Primary Color */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Primary Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              name="primaryColor"
              value={customizations.primaryColor}
              onChange={handleInputChange}
              className="w-12 h-10 rounded border border-border cursor-pointer"
            />
            <Input
              name="primaryColor"
              value={customizations.primaryColor}
              onChange={handleInputChange}
              placeholder="#3b82f6"
              className="flex-1 font-mono"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-border">
          <Button
            onClick={handleSave}
            variant="default"
            iconName="Save"
            iconPosition="left"
            fullWidth
          >
            Save Customizations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;