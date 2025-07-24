import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PublicLeadForm = ({ onSubmit, isLoading, customizations }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    city: '',
    propertyType: '',
    sellingTimeline: '',
    estimatedValue: '',
    notes: ''
  });

  const propertyTypeOptions = [
    { value: '', label: 'Select Property Type' },
    { value: 'single-family', label: 'Single Family Home' },
    { value: 'condo', label: 'Condominium' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'multi-family', label: 'Multi-Family' },
    { value: 'land', label: 'Land/Lot' },
    { value: 'commercial', label: 'Commercial Property' },
    { value: 'other', label: 'Other' }
  ];

  const sellingTimelineOptions = [
    { value: '', label: 'Select Timeline' },
    { value: 'immediately', label: 'Immediately (ASAP)' },
    { value: '1-3-months', label: '1-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: '6-12-months', label: '6-12 months' },
    { value: '12-plus-months', label: '12+ months' },
    { value: 'just-exploring', label: 'Just exploring options' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format phone number as user types
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedPhone }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user makes selection
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email address is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (formData.phone.replace(/[^\d]/g, '').length < 10) newErrors.phone = 'Please enter a valid phone number';
    }

    if (step === 2) {
      if (!formData.propertyAddress.trim()) newErrors.propertyAddress = 'Property address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
      if (!formData.sellingTimeline) newErrors.sellingTimeline = 'Selling timeline is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(1)) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(2)) {
      onSubmit(formData);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {/* Step 1 */}
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            {currentStep > 1 ? <Icon name="Check" size={16} /> : '1'}
          </div>
          <span className="ml-2 text-sm font-medium text-foreground">Contact Info</span>
        </div>
        
        {/* Connector */}
        <div className={`w-8 h-0.5 ${currentStep > 1 ? 'bg-primary' : 'bg-muted'}`} />
        
        {/* Step 2 */}
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            2
          </div>
          <span className="ml-2 text-sm font-medium text-foreground">Property Details</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Form Title */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {customizations?.customTitle || 'Get Your Free Property Valuation'}
        </h3>
        <p className="text-muted-foreground">
          Complete this quick form and I'll get back to you within 24 hours
        </p>
      </div>

      <StepIndicator />

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">Let's Start With Your Contact Information</h4>
              <p className="text-sm text-muted-foreground">
                I'll use this information to provide you with a personalized consultation
              </p>
            </div>

            <Input
              label="Full Name"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              error={errors.fullName}
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              required
              description="I'll send you a detailed market analysis"
            />

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
              required
              description="For follow-up discussion about your property"
            />

            <div className="pt-4">
              <Button
                type="button"
                onClick={handleNext}
                variant="default"
                size="lg"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
              >
                Continue to Property Details
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">Tell Me About Your Property</h4>
              <p className="text-sm text-muted-foreground">
                This helps me provide the most accurate valuation and advice
              </p>
            </div>

            <Input
              label="Property Address"
              type="text"
              name="propertyAddress"
              placeholder="Enter your property address"
              value={formData.propertyAddress}
              onChange={handleInputChange}
              error={errors.propertyAddress}
              required
            />

            <Input
              label="City"
              type="text"
              name="city"
              placeholder="Enter city name"
              value={formData.city}
              onChange={handleInputChange}
              error={errors.city}
              required
            />

            <Select
              label="Property Type"
              options={propertyTypeOptions}
              value={formData.propertyType}
              onChange={(value) => handleSelectChange('propertyType', value)}
              error={errors.propertyType}
              required
              placeholder="Choose your property type"
            />

            <Select
              label="When Are You Looking to Sell?"
              options={sellingTimelineOptions}
              value={formData.sellingTimeline}
              onChange={(value) => handleSelectChange('sellingTimeline', value)}
              error={errors.sellingTimeline}
              required
              placeholder="Select your timeline"
            />

            <Input
              label="Estimated Property Value (Optional)"
              type="text"
              name="estimatedValue"
              placeholder="e.g., $350,000"
              value={formData.estimatedValue}
              onChange={handleInputChange}
              description="Your best guess - I'll provide the accurate market value"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                name="notes"
                placeholder="Any special circumstances, features, or questions about your property..."
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
              <Button
                type="button"
                onClick={handleBack}
                variant="outline"
                iconName="ArrowLeft"
                iconPosition="left"
                className="sm:w-auto"
              >
                Back
              </Button>
              
              <Button
                type="submit"
                variant="default"
                size="lg"
                loading={isLoading}
                iconName="Send"
                iconPosition="left"
                className="flex-1"
              >
                {isLoading ? 'Submitting...' : 'Get My Free Consultation'}
              </Button>
            </div>
          </div>
        )}
      </form>

      {/* Trust Signals */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={12} />
            <span>Your information is secure</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>No spam guarantee</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>Response within 24 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLeadForm;