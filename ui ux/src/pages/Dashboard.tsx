import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Target, 
  Clock, 
  DollarSign, 
  Award, 
  Building2, 
  Zap,
  BarChart3,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Star
} from 'lucide-react';
import Layout from '../components/Layout';

interface DashboardStats {
  resumesProcessed: number;
  topSkills: [string, number][];
  recentUploads: { name: string; date: string }[];
  skillsDistribution: Record<string, number>;
  experienceLevels: { Junior: number; Mid: number; Senior: number };
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metricsAnimated, setMetricsAnimated] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
    const timer = setTimeout(() => setMetricsAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Mock enterprise metrics for demonstration
  const enterpriseMetrics = {
    monthlyProcessed: 45230,
    costSavings: 2400000,
    timeReduction: 85,
    accuracy: 99.7,
    clientSatisfaction: 98.5,
    systemUptime: 99.97
  };

  const trendData = [
    { month: 'Jan', resumes: 8420, savings: 185000 },
    { month: 'Feb', resumes: 12800, savings: 280000 },
    { month: 'Mar', resumes: 18600, savings: 410000 },
    { month: 'Apr', resumes: 25200, savings: 560000 },
    { month: 'May', resumes: 32400, savings: 715000 },
    { month: 'Jun', resumes: 45230, savings: 998000 }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
              <div className="text-xl text-slate-600 dark:text-slate-300">Loading enterprise analytics...</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Executive Summary Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Badge className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 px-4 py-2">
              <BarChart3 className="w-4 h-4 mr-2" />
              Executive Dashboard
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Enterprise Analytics Center
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Real-time insights and performance metrics for data-driven talent acquisition decisions
          </p>
        </div>

        {error && (
          <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 text-red-700 dark:text-red-200">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {[
            {
              title: 'Monthly Volume',
              value: enterpriseMetrics.monthlyProcessed.toLocaleString(),
              icon: FileText,
              trend: '+23%',
              trendUp: true,
              color: 'blue',
              description: 'Resumes processed this month'
            },
            {
              title: 'Cost Savings',
              value: `$${(enterpriseMetrics.costSavings / 1000000).toFixed(1)}M`,
              icon: DollarSign,
              trend: '+45%',
              trendUp: true,
              color: 'emerald',
              description: 'Annual savings achieved'
            },
            {
              title: 'Time Reduction',
              value: `${enterpriseMetrics.timeReduction}%`,
              icon: Clock,
              trend: '+8%',
              trendUp: true,
              color: 'purple',
              description: 'Faster than manual processing'
            },
            {
              title: 'AI Accuracy',
              value: `${enterpriseMetrics.accuracy}%`,
              icon: Target,
              trend: '+0.3%',
              trendUp: true,
              color: 'orange',
              description: 'Precision in data extraction'
            },
            {
              title: 'Client Satisfaction',
              value: `${enterpriseMetrics.clientSatisfaction}%`,
              icon: Star,
              trend: '+2%',
              trendUp: true,
              color: 'pink',
              description: 'Enterprise client rating'
            },
            {
              title: 'System Uptime',
              value: `${enterpriseMetrics.systemUptime}%`,
              icon: CheckCircle,
              trend: '0%',
              trendUp: true,
              color: 'green',
              description: 'Platform availability'
            }
          ].map((metric, index) => (
            <Card 
              key={index} 
              className={`enterprise-hover border-0 shadow-lg ${metricsAnimated ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${metric.color}-100 dark:bg-${metric.color}-900/30`}>
                    <metric.icon className={`w-6 h-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
                  </div>
                  <div className={`flex items-center text-sm font-medium ${
                    metric.trendUp ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {metric.trendUp ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {metric.trend}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className={`text-2xl font-bold text-${metric.color}-600 dark:text-${metric.color}-400`}>
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                    {metric.title}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {metric.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Volume Trend Chart */}
          <Card className="enterprise-hover border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-white">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Processing Volume Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendData.map((item, index) => (
                  <div key={item.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-300 w-12">
                        {item.month}
                      </div>
                      <div className="flex-1">
                        <Progress 
                          value={(item.resumes / 50000) * 100} 
                          className="h-3"
                        />
                      </div>
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white min-w-20 text-right">
                      {item.resumes.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cost Savings Chart */}
          <Card className="enterprise-hover border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-white">
                <DollarSign className="w-5 h-5 mr-2 text-emerald-600" />
                Monthly Cost Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendData.map((item, index) => (
                  <div key={item.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-300 w-12">
                        {item.month}
                      </div>
                      <div className="flex-1">
                        <Progress 
                          value={(item.savings / 1000000) * 100} 
                          className="h-3"
                        />
                      </div>
                    </div>
                    <div className="text-sm font-bold text-emerald-600 min-w-20 text-right">
                      ${(item.savings / 1000).toFixed(0)}K
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Analysis & Experience Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Skills */}
          <Card className="enterprise-hover border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-white">
                <Zap className="w-5 h-5 mr-2 text-purple-600" />
                In-Demand Skills Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.topSkills?.slice(0, 8).map(([skill, count], index) => (
                  <div key={skill} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <Badge variant="secondary" className="text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                        {skill}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-600 transition-all duration-500"
                          style={{ 
                            width: stats.topSkills.length > 0 ? `${(count / stats.topSkills[0][1]) * 100}%` : '0%' 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white min-w-8">
                        {count}
                      </span>
                    </div>
                  </div>
                )) || (
                  <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No skills data available</p>
                    <p className="text-sm">Upload resumes to see skill analysis</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Experience Levels */}
          <Card className="enterprise-hover border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-white">
                <Users className="w-5 h-5 mr-2 text-orange-600" />
                Experience Level Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {stats?.experienceLevels && Object.entries(stats.experienceLevels).map(([level, count], index) => {
                  const total = Object.values(stats.experienceLevels).reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? (count / total) * 100 : 0;
                  const colors = {
                    Junior: { bg: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-100 dark:bg-emerald-900/30' },
                    Mid: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-100 dark:bg-blue-900/30' },
                    Senior: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-100 dark:bg-purple-900/30' }
                  };
                  
                  return (
                    <div key={level} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${colors[level as keyof typeof colors].bg}`}></div>
                          <span className="font-medium text-slate-900 dark:text-white">{level} Level</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="font-bold text-slate-900 dark:text-white">{count}</span>
                          <span className="text-slate-500">({percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full ${colors[level as keyof typeof colors].bg} transition-all duration-700`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Uploads */}
          <Card className="enterprise-hover border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-white">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Recent Processing Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats?.recentUploads?.length ? (
                <div className="space-y-3">
                  {stats.recentUploads.map((upload, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors group">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white truncate max-w-48">
                            {upload.name}
      </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            Processed on {upload.date}
      </div>
    </div>
  </div>
                      <Badge className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200">
                        ✓ Complete
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-slate-500 dark:text-slate-400 py-12">
                  <Building2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium mb-2">Ready for Enterprise Processing</p>
                  <p className="text-sm">Upload resumes to begin advanced AI analysis</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="enterprise-hover border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-white">
                <Award className="w-5 h-5 mr-2 text-emerald-600" />
                System Health & Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: 'API Response Time', value: '125ms', status: 'excellent', color: 'emerald' },
                  { label: 'Processing Queue', value: '0 pending', status: 'optimal', color: 'blue' },
                  { label: 'Error Rate', value: '0.003%', status: 'excellent', color: 'emerald' },
                  { label: 'Data Security', value: 'SOC 2 Compliant', status: 'verified', color: 'purple' },
                  { label: 'System Load', value: '23%', status: 'low', color: 'emerald' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <Badge className={`bg-${item.color}-100 dark:bg-${item.color}-900/50 text-${item.color}-800 dark:text-${item.color}-200`}>
                        {item.value}
                      </Badge>
                      <CheckCircle className={`w-4 h-4 text-${item.color}-600`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 