import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileTab = ({ user, onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Password validation only if changing password
    if (showPasswordSection) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required';
      }

      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company
      };

      if (showPasswordSection && formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      onUpdateProfile(updateData);
      
      // Reset password fields
      if (showPasswordSection) {
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        setShowPasswordSection(false);
      }
    } catch (error) {
      setErrors({ submit: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 p-6 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full text-xl font-semibold">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || 'User'}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            user?.name?.charAt(0)?.toUpperCase() || 'U'
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {user?.name || 'User Profile'}
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage your personal information and account settings
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
            <Icon name="User" size={18} />
            <span>Basic Information</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
              required
            />
            
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              required
            />
            
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
              required
            />
            
            <Input
              label="Company Name"
              name="company"
              type="text"
              placeholder="Enter your company name"
              value={formData.company}
              onChange={handleInputChange}
              description="Optional - Your real estate company or agency"
            />
          </div>
        </div>

        {/* Password Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
              <Icon name="Lock" size={18} />
              <span>Password</span>
            </h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPasswordSection(!showPasswordSection)}
            >
              {showPasswordSection ? 'Cancel' : 'Change Password'}
            </Button>
          </div>

          {showPasswordSection && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                placeholder="Enter your current password"
                value={formData.currentPassword}
                onChange={handleInputChange}
                error={errors.currentPassword}
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="New Password"
                  name="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  error={errors.newPassword}
                  description="Minimum 8 characters"
                  required
                />
                
                <Input
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  required
                />
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error">{errors.submit}</p>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileTab;