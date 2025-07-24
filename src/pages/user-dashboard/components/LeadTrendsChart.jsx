import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';


const LeadTrendsChart = ({ data, period = '7d' }) => {
  const [chartType, setChartType] = useState('line');
  const [selectedPeriod, setSelectedPeriod] = useState(period);

  const periodOptions = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const chartData = data || [
    { date: 'Jan 17', leads: 2, conversions: 1 },
    { date: 'Jan 18', leads: 4, conversions: 2 },
    { date: 'Jan 19', leads: 1, conversions: 0 },
    { date: 'Jan 20', leads: 6, conversions: 3 },
    { date: 'Jan 21', leads: 3, conversions: 2 },
    { date: 'Jan 22', leads: 5, conversions: 4 },
    { date: 'Jan 23', leads: 8, conversions: 5 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-elevation-2 p-3">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.dataKey}:</span>
              <span className="font-medium text-foreground">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Lead Generation Trends</h3>
          <p className="text-sm text-muted-foreground">Track your lead generation performance over time</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Period Selector */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            {periodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedPeriod(option.value)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-smooth ${
                  selectedPeriod === option.value
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          {/* Chart Type Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-md transition-smooth ${
                chartType === 'line' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="Line Chart"
            >
              <Icon name="TrendingUp" size={16} />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-md transition-smooth ${
                chartType === 'bar' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="Bar Chart"
            >
              <Icon name="BarChart3" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="h-80" aria-label="Lead Generation Trends Chart">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'var(--color-success)', strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="leads" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="conversions" fill="var(--color-success)" radius={[2, 2, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-sm text-muted-foreground">Total Leads</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-sm text-muted-foreground">Conversions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadTrendsChart;