"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, AreaChart, Area, Cell
} from 'recharts';

// Types
interface CaseData {
  month: string;
  cases: number;
  resolved: number;
  pending: number;
  urgent: number;
  routine: number;
  high: number;
  medium: number;
  low: number;
}

interface HourlyData {
  hour: string;
  incidents: number;
}

interface CaseType {
  name: string;
  value: number;
  description: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

interface PieDataItem {
  name: string;
  value: number;
  description: string;
}

interface ActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: PieDataItem;
  percent: number;
  value: number;
}

// Constants
const COLORS = {
  orange: '#ff9f43',
  green: '#38b2ac',
  blue: '#4299e1',
  red: '#f56565',
  purple: '#9f7aea',
  lightGreen: '#68d391',
  lightBlue: '#90cdf4',
  lightOrange: '#fbd38d'
};

// System Constants
const CURRENT_USER = "rishyym0927";
const CURRENT_DATE_TIME = "2025-02-15 15:41:55";

// Dummy Data
const dummyData: CaseData[] = [
  { month: 'Jan', cases: 400, resolved: 240, pending: 160, urgent: 80, routine: 320, high: 150, medium: 180, low: 70 },
  { month: 'Feb', cases: 300, resolved: 190, pending: 110, urgent: 60, routine: 240, high: 100, medium: 140, low: 60 },
  { month: 'Mar', cases: 550, resolved: 300, pending: 250, urgent: 120, routine: 430, high: 200, medium: 250, low: 100 },
  { month: 'Apr', cases: 450, resolved: 280, pending: 170, urgent: 90, routine: 360, high: 170, medium: 200, low: 80 },
  { month: 'May', cases: 600, resolved: 400, pending: 200, urgent: 150, routine: 450, high: 220, medium: 280, low: 100 },
  { month: 'Jun', cases: 520, resolved: 350, pending: 170, urgent: 110, routine: 410, high: 190, medium: 230, low: 100 },
  { month: 'Jul', cases: 680, resolved: 420, pending: 260, urgent: 170, routine: 510, high: 250, medium: 300, low: 130 },
  { month: 'Aug', cases: 720, resolved: 470, pending: 250, urgent: 190, routine: 530, high: 270, medium: 320, low: 130 }
];

const dummy24HourData: HourlyData[] = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  incidents: Math.floor(Math.random() * 50) + 10
}));

const dummyCaseTypes: CaseType[] = [
  { name: 'Murder', value: 350, description: 'Serious Crime' },
  { name: 'Road Accident', value: 450, description: 'Road Accident And Crash' },
  { name: 'Emergency', value: 300, description: 'Emergency Request' },
  { name: 'Stampede', value: 400, description: 'Crowd Management' }
];

// Utility functions
const formatDateTime = (dateTime: string): string => {
  const date = new Date(dateTime);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

// Custom Components
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props: any) => {
  const {
    cx, cy, innerRadius, fill, payload, percent, value
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-4} textAnchor="middle" fill={fill} className="text-lg font-semibold">
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={20} textAnchor="middle" fill="#666" className="text-sm">
        {`${value} cases`}
      </text>
      <text x={cx} y={cy} dy={40} textAnchor="middle" fill="#999" className="text-xs">
        {`(${(percent * 100).toFixed(1)}%)`}
      </text>
      <circle cx={cx} cy={cy} r={innerRadius} fill="none" />
    </g>
  );
};


// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [data, setData] = useState<CaseData[]>(dummyData);
  const [caseTypes, setCaseTypes] = useState<CaseType[]>(dummyCaseTypes);
  const [hourlyData, setHourlyData] = useState<HourlyData[]>(dummy24HourData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [casesResponse, typesResponse, hourlyResponse] = await Promise.all([
          axios.get<CaseData[]>('/api/cases'),
          axios.get<CaseType[]>('/api/case-types'),
          axios.get<HourlyData[]>('/api/hourly-incidents')
        ]);

        setData(casesResponse.data);
        setCaseTypes(typesResponse.data);
        setHourlyData(hourlyResponse.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to fetch data. Using dummy data instead.');
        setData(dummyData);
        setCaseTypes(dummyCaseTypes);
        setHourlyData(dummy24HourData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
      {error && (
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
          {error}
        </div>
      )}

      {/* Header Section with Updated User Info */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Cases Analytics Dashboard</h1>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">User:</span> {CURRENT_USER}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Last Updated:</span> {formatDateTime(CURRENT_DATE_TIME)}
            </p>
          </div>
        </div>
        <p className="text-gray-600">Comprehensive overview of case management metrics and trends</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'Total Cases', value: data.reduce((acc, curr) => acc + curr.cases, 0), color: 'bg-orange-100 text-orange-600' },
          { title: 'Resolved', value: data.reduce((acc, curr) => acc + curr.resolved, 0), color: 'bg-green-100 text-green-600' },
          { title: 'Pending', value: data.reduce((acc, curr) => acc + curr.pending, 0), color: 'bg-blue-100 text-blue-600' },
          { title: 'Urgent', value: data.reduce((acc, curr) => acc + curr.urgent, 0), color: 'bg-red-100 text-red-600' }
        ].map((item, index) => (
          <div key={index} className={`p-6 rounded-lg ${item.color} shadow-sm`}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-2xl font-bold mt-2">{item.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="space-y-6">
        {/* 24-Hour Incident Timeline */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">24-Hour Incident Timeline</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="incidents"
                  stroke={COLORS.purple}
                  fill={COLORS.purple}
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cases Timeline */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Cases Timeline</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cases"
                  stroke={COLORS.orange}
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke={COLORS.green}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Priority Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Priority Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="high" fill={COLORS.orange} />
                  <Bar dataKey="medium" fill={COLORS.blue} />
                  <Bar dataKey="low" fill={COLORS.green} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Case Categories */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Case Categories</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={caseTypes}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                  >
                    {caseTypes.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={Object.values(COLORS)[index % Object.values(COLORS).length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">{caseTypes[activeIndex].description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;