import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import LeadProgressIndicator from './components/LeadProgressIndicator';
import LeadFormFields from './components/LeadFormFields';
import DuplicateWarning from './components/DuplicateWarning';
import SuccessModal from './components/SuccessModal';
import FormValidation from './components/FormValidation';

const LeadGenerationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [duplicateLead, setDuplicateLead] = useState(null);
  const [errors, setErrors] = useState({});

  // Mock user data - in real app, this would come from auth context
  const [user] = useState({
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@realty.com",
    subscriptionTier: "Premium",
    leadsUsed: 23,
    leadsLimit: 100,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });

  // Mock existing leads for duplicate detection
  const [existingLeads] = useState([
    {
      id: 1,
      fullName: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      createdAt: "2025-01-15T10:30:00Z"
    },
    {
      id: 2,
      fullName: "Mary Johnson",
      email: "mary.johnson@email.com",
      phone: "(555) 987-6543",
      createdAt: "2025-01-20T14:20:00Z"
    }
  ]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    city: '',
    propertyType: '',
    sellingTimeline: '',
    notes: ''
  });

  // Check if user has reached their limit
  const hasReachedLimit = user.leadsUsed >= user.leadsLimit;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format phone number as user types
    if (name === 'phone') {
      const formattedPhone = FormValidation.formatPhoneNumber(value);
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

  const checkForDuplicates = (email) => {
    return existingLeads.find(lead => 
      lead.email.toLowerCase() === email.toLowerCase()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user has reached limit
    if (hasReachedLimit) {
      alert('You have reached your monthly lead limit. Please upgrade your plan or wait for next month.');
      return;
    }

    // Validate form
    const validationErrors = FormValidation.validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check for duplicates
    const duplicate = checkForDuplicates(formData.email);
    if (duplicate && !showDuplicateWarning) {
      setDuplicateLead(duplicate);
      setShowDuplicateWarning(true);
      return;
    }

    // Submit the form
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would be an API call to save the lead
      console.log('Submitting lead:', formData);
      
      // Show success modal
      setShowSuccessModal(true);
      setShowDuplicateWarning(false);
      setDuplicateLead(null);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        propertyAddress: '',
        city: '',
        propertyType: '',
        sellingTimeline: '',
        notes: ''
      });
      setErrors({});
      
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('There was an error submitting your lead. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDuplicateProceed = () => {
    setShowDuplicateWarning(false);
    setDuplicateLead(null);
    handleSubmit({ preventDefault: () => {} });
  };

  const handleDuplicateCancel = () => {
    setShowDuplicateWarning(false);
    setDuplicateLead(null);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
  };

  const handleGenerateAnother = () => {
    setShowSuccessModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDashboard = () => {
    navigate('/user-dashboard');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader user={user} onLogout={handleLogout} />
      
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <button
              onClick={() => navigate('/user-dashboard')}
              className="hover:text-foreground transition-hover"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground font-medium">Generate Lead</span>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name="UserPlus" size={24} className="text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Generate New Lead</h1>
            </div>
            <p className="text-muted-foreground">
              Capture and validate new lead information for your real estate business.
            </p>
          </div>

          {/* Progress Indicator */}
          <LeadProgressIndicator
            leadsUsed={user.leadsUsed}
            leadsLimit={user.leadsLimit}
            subscriptionTier={user.subscriptionTier}
          />

          {/* Lead Generation Form */}
          <div className="bg-card border border-border rounded-lg shadow-elevation-1">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">Lead Information</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Fill in all required fields to generate a new lead
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <LeadFormFields
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
                onSelectChange={handleSelectChange}
              />

              {/* Form Actions */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-border">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate('/user-dashboard')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Dashboard
                </Button>

                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        propertyAddress: '',
                        city: '',
                        propertyType: '',
                        sellingTimeline: '',
                        notes: ''
                      });
                      setErrors({});
                    }}
                  >
                    Clear Form
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="default"
                    loading={isLoading}
                    disabled={hasReachedLimit}
                    iconName="UserPlus"
                    iconPosition="left"
                  >
                    {isLoading ? 'Submitting...' : 'Submit Lead'}
                  </Button>
                </div>
              </div>

              {hasReachedLimit && (
                <div className="flex items-start space-x-2 p-4 bg-error/10 border border-error/20 rounded-md mt-4">
                  <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-error">Monthly Limit Reached</p>
                    <p className="text-error/80 mt-1">
                      You've used all {user.leadsLimit} leads for this month. 
                      <button
                        type="button"
                        onClick={() => navigate('/account-management')}
                        className="underline hover:no-underline ml-1"
                      >
                        Upgrade your plan
                      </button> for unlimited access.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      {/* Duplicate Warning Modal */}
      <DuplicateWarning
        duplicateLead={duplicateLead}
        onProceed={handleDuplicateProceed}
        onCancel={handleDuplicateCancel}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        leadData={formData}
        onClose={handleSuccessClose}
        onGenerateAnother={handleGenerateAnother}
        onViewDashboard={handleViewDashboard}
      />
    </div>
  );
};

export default LeadGenerationForm;