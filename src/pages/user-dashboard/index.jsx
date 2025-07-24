import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import MetricsCard from './components/MetricsCard';
import RecentLeadsTable from './components/RecentLeadsTable';
import QuickActionsPanel from './components/QuickActionsPanel';
import LeadTrendsChart from './components/LeadTrendsChart';
import AlertBanner from './components/AlertBanner';
import LeadViewModal from './components/LeadViewModal';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [selectedLead, setSelectedLead] = useState(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);

  // Mock user data
  const [user] = useState({
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@realestate.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    subscriptionTier: "Free",
    leadsUsed: 8,
    leadsLimit: 10,
    joinedDate: "2024-01-15",
    lastLogin: new Date().toISOString()
  });

  // Mock leads data
  const [leads] = useState([
    {
      id: 1,
      fullName: "Michael Rodriguez",
      email: "michael.r@email.com",
      phone: "(555) 123-4567",
      propertyAddress: "123 Oak Street",
      city: "Austin, TX",
      propertyType: "singleFamily",
      sellingTimeline: "Within 3 months",
      notes: "Looking to sell quickly due to job relocation. Property is in excellent condition with recent renovations.",
      status: "new",
      createdAt: "2025-01-23T10:30:00Z"
    },
    {
      id: 2,
      fullName: "Jennifer Chen",
      email: "j.chen@email.com",
      phone: "(555) 234-5678",
      propertyAddress: "456 Pine Avenue",
      city: "Austin, TX",
      propertyType: "condo",
      sellingTimeline: "Within 6 months",
      notes: "First-time seller, needs guidance through the process. Condo has great city views.",
      status: "contacted",
      createdAt: "2025-01-22T14:15:00Z"
    },
    {
      id: 3,
      fullName: "David Thompson",
      email: "david.thompson@email.com",
      phone: "(555) 345-6789",
      propertyAddress: "789 Maple Drive",
      city: "Austin, TX",
      propertyType: "townhouse",
      sellingTimeline: "Within 1 month",
      notes: "Urgent sale needed. Property requires some minor repairs but priced competitively.",
      status: "qualified",
      createdAt: "2025-01-21T09:45:00Z"
    },
    {
      id: 4,
      fullName: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "(555) 456-7890",
      propertyAddress: "321 Elm Street",
      city: "Austin, TX",
      propertyType: "singleFamily",
      sellingTimeline: "Within 6 months",
      notes: "Inherited property, looking for fair market value. Needs some updating but good bones.",
      status: "new",
      createdAt: "2025-01-20T16:20:00Z"
    },
    {
      id: 5,
      fullName: "Robert Kim",
      email: "robert.kim@email.com",
      phone: "(555) 567-8901",
      propertyAddress: "654 Cedar Lane",
      city: "Austin, TX",
      propertyType: "luxury",
      sellingTimeline: "Within 3 months",
      notes: "High-end property with premium finishes. Owner is motivated seller due to relocation.",
      status: "closed",
      createdAt: "2025-01-19T11:10:00Z"
    }
  ]);

  // Mock chart data
  const chartData = [
    { date: 'Jan 17', leads: 2, conversions: 1 },
    { date: 'Jan 18', leads: 4, conversions: 2 },
    { date: 'Jan 19', leads: 1, conversions: 0 },
    { date: 'Jan 20', leads: 6, conversions: 3 },
    { date: 'Jan 21', leads: 3, conversions: 2 },
    { date: 'Jan 22', leads: 5, conversions: 4 },
    { date: 'Jan 23', leads: 8, conversions: 5 }
  ];

  // Calculate metrics
  const usagePercentage = (user.leadsUsed / user.leadsLimit) * 100;
  const remainingLeads = user.leadsLimit - user.leadsUsed;
  const daysUntilReset = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).getDate() - new Date().getDate();

  // Initialize alerts based on user status
  useEffect(() => {
    const newAlerts = [];

    if (usagePercentage >= 90) {
      newAlerts.push({
        id: 'limit-warning',
        type: 'warning',
        title: 'Lead Limit Almost Reached',
        message: `You've used ${user.leadsUsed} of ${user.leadsLimit} leads this month. Consider upgrading to continue generating leads.`,
        action: 'Upgrade Now',
        onAction: handleUpgrade
      });
    } else if (usagePercentage >= 75) {
      newAlerts.push({
        id: 'approaching-limit',
        type: 'info',
        title: 'Approaching Lead Limit',
        message: `You have ${remainingLeads} leads remaining this month. Plan ahead or upgrade for unlimited access.`,
        action: 'View Plans',
        onAction: handleUpgrade
      });
    }

    setAlerts(newAlerts);
  }, [user.leadsUsed, user.leadsLimit, remainingLeads, usagePercentage]);

  const handleLogout = () => {
    // Clear user session and redirect to login
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setIsLeadModalOpen(true);
  };

  const handleUpdateLeadStatus = (leadId, newStatus) => {
    // In a real app, this would update the lead in the backend
    console.log(`Updating lead ${leadId} status to ${newStatus}`);
    setIsLeadModalOpen(false);
  };

  const handleExportLeads = () => {
    // Mock export functionality
    const csvContent = leads.map(lead => 
      `${lead.fullName},${lead.email},${lead.phone},${lead.propertyType},${lead.status}`
    ).join('\n');
    
    const blob = new Blob([`Name,Email,Phone,Property Type,Status\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleUpgrade = () => {
    navigate('/account-management?tab=subscription');
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader user={user} onLogout={handleLogout} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {user.name}. Here's your lead generation overview.
            </p>
          </div>

          {/* Alerts */}
          {alerts.length > 0 && (
            <div className="mb-8 space-y-4">
              {alerts.map((alert) => (
                <AlertBanner
                  key={alert.id}
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                  action={alert.action}
                  onAction={alert.onAction}
                  onDismiss={() => handleDismissAlert(alert.id)}
                />
              ))}
            </div>
          )}

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricsCard
              title="Current Plan"
              value={user.subscriptionTier}
              subtitle="Active subscription"
              icon="Crown"
              color={user.subscriptionTier === 'Premium' ? 'success' : 'secondary'}
            />
            <MetricsCard
              title="Leads This Month"
              value={user.leadsUsed}
              subtitle={`of ${user.leadsLimit} limit`}
              icon="Users"
              color="primary"
              progress={usagePercentage}
              showProgress={true}
            />
            <MetricsCard
              title="Remaining Leads"
              value={remainingLeads}
              subtitle="Available this month"
              icon="UserPlus"
              color={remainingLeads <= 2 ? 'warning' : 'success'}
            />
            <MetricsCard
              title="Next Reset"
              value={`${daysUntilReset} days`}
              subtitle="Until monthly reset"
              icon="Calendar"
              color="secondary"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Leads Table */}
            <div className="lg:col-span-2">
              <RecentLeadsTable
                leads={leads.slice(0, 5)}
                onViewLead={handleViewLead}
                onExportLeads={handleExportLeads}
              />
            </div>

            {/* Quick Actions Panel */}
            <div className="lg:col-span-1">
              <QuickActionsPanel
                user={user}
                onExportLeads={handleExportLeads}
                onUpgrade={handleUpgrade}
              />
            </div>
          </div>

          {/* Lead Trends Chart */}
          <div className="mb-8">
            <LeadTrendsChart data={chartData} />
          </div>
        </div>
      </main>

      {/* Lead View Modal */}
      <LeadViewModal
        lead={selectedLead}
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onUpdateStatus={handleUpdateLeadStatus}
      />
    </div>
  );
};

export default UserDashboard;