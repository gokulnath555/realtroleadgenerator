import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LeadViewModal = ({ lead, isOpen, onClose, onUpdateStatus }) => {
  if (!isOpen || !lead) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPropertyType = (type) => {
    return type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'qualified':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const statusOptions = [
    { value: 'new', label: 'New', icon: 'Plus' },
    { value: 'contacted', label: 'Contacted', icon: 'Phone' },
    { value: 'qualified', label: 'Qualified', icon: 'CheckCircle' },
    { value: 'closed', label: 'Closed', icon: 'Archive' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-elevation-2 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Lead Details</h2>
            <p className="text-sm text-muted-foreground">View and manage lead information</p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-hover"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Lead Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="text-lg font-medium text-foreground">{lead.fullName}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <div className="flex items-center space-x-2">
                  <p className="text-foreground">{lead.email}</p>
                  <button
                    onClick={() => window.open(`mailto:${lead.email}`, '_blank')}
                    className="text-primary hover:text-primary/80 transition-hover"
                    title="Send email"
                  >
                    <Icon name="Mail" size={16} />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                <div className="flex items-center space-x-2">
                  <p className="text-foreground">{lead.phone}</p>
                  <button
                    onClick={() => window.open(`tel:${lead.phone}`, '_blank')}
                    className="text-primary hover:text-primary/80 transition-hover"
                    title="Call number"
                  >
                    <Icon name="Phone" size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Property Type</label>
                <p className="text-foreground">{formatPropertyType(lead.propertyType)}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Selling Timeline</label>
                <p className="text-foreground">{lead.sellingTimeline}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date Added</label>
                <p className="text-foreground">{formatDate(lead.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Property Address */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">Property Address</label>
            <div className="flex items-start space-x-2 mt-1">
              <p className="text-foreground flex-1">{lead.propertyAddress}, {lead.city}</p>
              <button
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(lead.propertyAddress + ', ' + lead.city)}`, '_blank')}
                className="text-primary hover:text-primary/80 transition-hover"
                title="View on map"
              >
                <Icon name="MapPin" size={16} />
              </button>
            </div>
          </div>

          {/* Notes */}
          {lead.notes && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Notes</label>
              <div className="mt-1 p-3 bg-muted rounded-lg">
                <p className="text-foreground whitespace-pre-wrap">{lead.notes}</p>
              </div>
            </div>
          )}

          {/* Status Management */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-3 block">Lead Status</label>
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(lead.status)}`}>
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </span>
              
              <div className="flex items-center space-x-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onUpdateStatus(lead.id, option.value)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-hover ${
                      lead.status === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                    title={`Mark as ${option.label}`}
                  >
                    <Icon name={option.icon} size={14} />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="default"
            iconName="Mail"
            iconPosition="left"
            onClick={() => window.open(`mailto:${lead.email}?subject=Regarding your property inquiry`, '_blank')}
          >
            Contact Lead
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeadViewModal;