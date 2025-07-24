import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsDashboard = () => {
  // Mock analytics data
  const performanceData = [
    { date: 'Jan 17', clicks: 12, submissions: 3 },
    { date: 'Jan 18', clicks: 19, submissions: 5 },
    { date: 'Jan 19', clicks: 8, submissions: 2 },
    { date: 'Jan 20', clicks: 25, submissions: 8 },
    { date: 'Jan 21', clicks: 15, submissions: 4 },
    { date: 'Jan 22', clicks: 30, submissions: 12 },
    { date: 'Jan 23', clicks: 22, submissions: 9 }
  ];

  const geographicData = [
    { city: 'Austin', leads: 15 },
    { city: 'Dallas', leads: 8 },
    { city: 'Houston', leads: 12 },
    { city: 'San Antonio', leads: 6 },
    { city: 'Fort Worth', leads: 4 }
  ];

  const totalClicks = performanceData.reduce((sum, day) => sum + day.clicks, 0);
  const totalSubmissions = performanceData.reduce((sum, day) => sum + day.submissions, 0);
  const conversionRate = totalClicks > 0 ? ((totalSubmissions / totalClicks) * 100).toFixed(1) : '0.0';

  const MetricCard = ({ title, value, subtitle, icon, color = 'primary' }) => (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 rounded-lg bg-${color}/10 flex items-center justify-center`}>
          <Icon name={icon} size={16} className={`text-${color}`} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Link Performance Analytics</h3>
        <p className="text-sm text-muted-foreground">
          Track how your shareable link is performing across different platforms.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Clicks"
          value={totalClicks}
          subtitle="Link visits"
          icon="MousePointer"
          color="primary"
        />
        <MetricCard
          title="Form Submissions"
          value={totalSubmissions}
          subtitle="Leads captured"
          icon="UserPlus"
          color="success"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          subtitle="Clicks to submissions"
          icon="TrendingUp"
          color="warning"
        />
        <MetricCard
          title="Unique Visitors"
          value="89"
          subtitle="Individual users"
          icon="Users"
          color="secondary"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-4">Daily Performance</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Clicks"
                />
                <Line 
                  type="monotone" 
                  dataKey="submissions" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Submissions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-4">Geographic Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={geographicData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  type="number"
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis 
                  type="category"
                  dataKey="city"
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                  width={80}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="leads" 
                  fill="hsl(var(--primary))" 
                  name="Leads"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-md font-medium text-foreground mb-4">Recent Activity</h4>
        <div className="space-y-3">
          {[
            { action: 'New lead submission', details: 'Jennifer Chen from Austin, TX', time: '2 hours ago', icon: 'UserPlus' },
            { action: 'Link clicked', details: 'Via Facebook post', time: '4 hours ago', icon: 'MousePointer' },
            { action: 'Form viewed', details: 'Mobile visitor from Dallas', time: '6 hours ago', icon: 'Eye' },
            { action: 'Link shared', details: 'Instagram story', time: '1 day ago', icon: 'Share2' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name={activity.icon} size={14} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.details}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;