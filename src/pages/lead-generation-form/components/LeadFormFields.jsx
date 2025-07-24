import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LeadFormFields = ({ formData, errors, onChange, onSelectChange }) => {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Lead Information */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span>Lead Information</span>
          </h3>
          
          <div className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              placeholder="Enter lead's full name"
              value={formData.fullName}
              onChange={onChange}
              error={errors.fullName}
              required
              className="w-full"
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={onChange}
              error={errors.email}
              required
              description="We'll check for duplicates automatically"
              className="w-full"
            />

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={onChange}
              error={errors.phone}
              required
              description="Include area code for best results"
              className="w-full"
            />

            <Input
              label="Property Address"
              type="text"
              name="propertyAddress"
              placeholder="Enter property street address"
              value={formData.propertyAddress}
              onChange={onChange}
              error={errors.propertyAddress}
              required
              className="w-full"
            />

            <Input
              label="City"
              type="text"
              name="city"
              placeholder="Enter city name"
              value={formData.city}
              onChange={onChange}
              error={errors.city}
              required
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Right Column - Property Details */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span>Property Details</span>
          </h3>
          
          <div className="space-y-4">
            <Select
              label="Property Type"
              options={propertyTypeOptions}
              value={formData.propertyType}
              onChange={(value) => onSelectChange('propertyType', value)}
              error={errors.propertyType}
              required
              placeholder="Choose property type"
              className="w-full"
            />

            <Select
              label="Selling Timeline"
              options={sellingTimelineOptions}
              value={formData.sellingTimeline}
              onChange={(value) => onSelectChange('sellingTimeline', value)}
              error={errors.sellingTimeline}
              required
              placeholder="When do they want to sell?"
              className="w-full"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Additional Notes
                <span className="text-muted-foreground font-normal ml-1">(Optional)</span>
              </label>
              <textarea
                name="notes"
                placeholder="Any additional information about the lead or property..."
                value={formData.notes}
                onChange={onChange}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Include any special circumstances, urgency, or preferences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadFormFields;