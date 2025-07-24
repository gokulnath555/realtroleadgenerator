import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ selectedPlan, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    password: '',
    confirmPassword: ''
  });
  
  const [agreements, setAgreements] = useState({
    termsAccepted: false,
    marketingOptIn: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  const getPasswordStrength = (password) => {
    const validation = validatePassword(password);
    const score = Object.values(validation).filter(Boolean).length;
    
    if (score < 2) return { strength: 'Weak', color: 'text-error' };
    if (score < 4) return { strength: 'Medium', color: 'text-warning' };
    return { strength: 'Strong', color: 'text-success' };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAgreementChange = (field, checked) => {
    setAgreements(prev => ({ ...prev, [field]: checked }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const validation = validatePassword(formData.password);
      if (!validation.length) {
        newErrors.password = 'Password must be at least 8 characters long';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreements.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms of service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        selectedPlan,
        marketingOptIn: agreements.marketingOptIn
      });
    }
  };

  const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          error={errors.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          error={errors.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
          error={errors.phone}
          required
        />

        <Input
          label="Company Name"
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Enter your company name"
          error={errors.companyName}
          required
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Create a strong password"
            error={errors.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
          
          {formData.password && passwordStrength && (
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    passwordStrength.strength === 'Weak' ? 'bg-error w-1/3' :
                    passwordStrength.strength === 'Medium'? 'bg-warning w-2/3' : 'bg-success w-full'
                  }`}
                />
              </div>
              <span className={`text-xs font-medium ${passwordStrength.color}`}>
                {passwordStrength.strength}
              </span>
            </div>
          )}
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={agreements.termsAccepted}
          onChange={(e) => handleAgreementChange('termsAccepted', e.target.checked)}
          error={errors.termsAccepted}
          required
        />

        <Checkbox
          label="I would like to receive marketing emails and product updates"
          description="You can unsubscribe at any time"
          checked={agreements.marketingOptIn}
          onChange={(e) => handleAgreementChange('marketingOptIn', e.target.checked)}
        />
      </div>

      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="CreditCard"
        iconPosition="left"
        disabled={!agreements.termsAccepted}
      >
        Create Account & Subscribe
      </Button>
    </form>
  );
};

export default RegistrationForm;