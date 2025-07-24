import React from 'react';

const FormValidation = {
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  },

  validatePhone: (phone) => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phone) return 'Phone number is required';
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return 'Please enter a valid phone number (e.g., 555-123-4567)';
    }
    return '';
  },

  validateRequired: (value, fieldName) => {
    if (!value || value.trim() === '') {
      return `${fieldName} is required`;
    }
    return '';
  },

  validateForm: (formData) => {
    const errors = {};

    // Required field validations
    errors.fullName = FormValidation.validateRequired(formData.fullName, 'Full name');
    errors.email = FormValidation.validateEmail(formData.email);
    errors.phone = FormValidation.validatePhone(formData.phone);
    errors.propertyAddress = FormValidation.validateRequired(formData.propertyAddress, 'Property address');
    errors.city = FormValidation.validateRequired(formData.city, 'City');
    errors.propertyType = FormValidation.validateRequired(formData.propertyType, 'Property type');
    errors.sellingTimeline = FormValidation.validateRequired(formData.sellingTimeline, 'Selling timeline');

    // Remove empty error messages
    Object.keys(errors).forEach(key => {
      if (!errors[key]) delete errors[key];
    });

    return errors;
  },

  formatPhoneNumber: (value) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length >= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    } else if (phoneNumber.length >= 3) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return phoneNumber;
    }
  }
};

export default FormValidation;