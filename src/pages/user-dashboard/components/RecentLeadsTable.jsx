import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentLeadsTable = ({ leads, onViewLead, onExportLeads }) => {
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'createdAt') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPropertyType = (type) => {
    return type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Leads</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          onClick={onExportLeads}
        >
          Export
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('fullName')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-hover"
                >
                  <span>Lead Name</span>
                  <Icon 
                    name={sortField === 'fullName' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('propertyType')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-hover"
                >
                  <span>Property Type</span>
                  <Icon 
                    name={sortField === 'propertyType' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-hover"
                >
                  <span>Date Added</span>
                  <Icon 
                    name={sortField === 'createdAt' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedLeads.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full">
                      <Icon name="Users" size={32} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-foreground">No leads yet</p>
                      <p className="text-sm text-muted-foreground">Start generating leads to see them here</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              sortedLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-border hover:bg-muted/30 transition-hover">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">{lead.fullName}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">
                      {formatPropertyType(lead.propertyType)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(lead.createdAt)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewLead(lead)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLeadsTable;