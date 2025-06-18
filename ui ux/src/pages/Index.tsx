import React, { useState, useEffect } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { ProcessingLoader } from '@/components/ProcessingLoader';
import { 
  FileText, 
  Users, 
  Target, 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Zap, 
  Building2, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Star,
  Globe,
  Award,
  Calculator,
  Mail,
  X
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [roiInputs, setROIInputs] = useState({
    monthlyResumes: 1000,
    avgTimePerResume: 15,
    hourlyRate: 75
  });

  useEffect(() => {
    const timer = setTimeout(() => setStatsAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setShowResults(false);
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock results for demonstration
    const mockResults = files.map((file, index) => ({
      id: index,
      filename: file.name,
      name: `Candidate ${index + 1}`,
      email: `candidate${index + 1}@email.com`,
      phone: `+1234567890${index}`,
      experience: `${2 + index} years`,
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
      software: ['VS Code', 'Git', 'Docker', 'AWS'],
      domain: 'Full Stack Development',
      score: Math.floor(Math.random() * 30) + 70
    }));
    
    setResults(mockResults);
    setIsProcessing(false);
    setShowResults(true);
  };

  const handleReset = () => {
    setFiles([]);
    setResults([]);
    setShowResults(false);
    setIsProcessing(false);
  };

  const calculateROI = () => {
    const manualCostPerMonth = roiInputs.monthlyResumes * (roiInputs.avgTimePerResume / 60) * roiInputs.hourlyRate;
    const techcruitCostPerMonth = roiInputs.monthlyResumes * 20; // Growth plan pricing ₹20/resume
    const monthlySavings = manualCostPerMonth - techcruitCostPerMonth;
    const annualSavings = monthlySavings * 12;
    const roiPercentage = ((monthlySavings / techcruitCostPerMonth) * 100);
    
    return {
      manualCost: manualCostPerMonth,
      techcruitCost: techcruitCostPerMonth,
      monthlySavings,
      annualSavings,
      roiPercentage
    };
  };

  const handleScheduleDemo = () => {
    setShowContactModal(true);
  };

  const handleRequestROI = () => {
    setShowROICalculator(!showROICalculator);
  };

  const roiData = calculateROI();

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 bg-[size:20px_20px] opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-4 py-2 text-sm font-medium">
                <Award className="w-4 h-4 mr-2" />
                Enterprise AI Recruitment Platform
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Scale Your Talent Acquisition with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 animate-gradient-x">
                Enterprise AI
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Trusted by Fortune 500 companies to process <strong>10,000+ resumes daily</strong> with 99.7% accuracy. 
              Reduce hiring time by 80% and costs by 60%.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12 opacity-70">
              <div className="text-slate-500 dark:text-slate-400 font-medium">Trusted by leading enterprises:</div>
              <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 font-semibold">
                <Building2 className="w-5 h-5" />
                <span>Fortune 500</span>
              </div>
              <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 font-semibold">
                <Shield className="w-5 h-5" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 font-semibold">
                <Globe className="w-5 h-5" />
                <span>Global Scale</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Metrics */}
      <div className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Enterprise Performance Metrics
          </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Proven results that deliver measurable ROI to your organization
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { 
                value: '10,000+', 
                label: 'Resumes/Day', 
                icon: FileText, 
                color: 'text-blue-600 dark:text-blue-400',
                bgColor: 'bg-blue-100 dark:bg-blue-900/30'
              },
              { 
                value: '99.7%', 
                label: 'Accuracy Rate', 
                icon: Target, 
                color: 'text-emerald-600 dark:text-emerald-400',
                bgColor: 'bg-emerald-100 dark:bg-emerald-900/30'
              },
              { 
                value: '80%', 
                label: 'Time Reduction', 
                icon: Clock, 
                color: 'text-purple-600 dark:text-purple-400',
                bgColor: 'bg-purple-100 dark:bg-purple-900/30'
              },
              { 
                value: '$2.5M', 
                label: 'Annual Savings', 
                icon: DollarSign, 
                color: 'text-orange-600 dark:text-orange-400',
                bgColor: 'bg-orange-100 dark:bg-orange-900/30'
              }
            ].map((stat, index) => (
              <Card key={index} className={`text-center p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${statsAnimated ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-0">
                  <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Calculator */}
      {showROICalculator && !showResults && !isProcessing && (
        <div className="py-16 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                    <Calculator className="w-6 h-6 mr-2 inline" />
                    ROI Calculator
                  </CardTitle>
                  <Button
                    onClick={() => setShowROICalculator(false)}
                    variant="ghost"
                    size="sm"
                    className="p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Monthly Resume Volume
                    </label>
                    <input
                      type="number"
                      value={roiInputs.monthlyResumes}
                      onChange={(e) => setROIInputs({...roiInputs, monthlyResumes: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Enter monthly resume volume"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Minutes per Resume (Manual)
                    </label>
                    <input
                      type="number"
                      value={roiInputs.avgTimePerResume}
                      onChange={(e) => setROIInputs({...roiInputs, avgTimePerResume: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Minutes per resume"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Hourly Rate (₹)
                    </label>
                    <input
                      type="number"
                      value={roiInputs.hourlyRate}
                      onChange={(e) => setROIInputs({...roiInputs, hourlyRate: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Hourly rate"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      ₹{roiData.manualCost.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Manual Cost/Month</div>
                  </div>
            <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ₹{roiData.techcruitCost.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Techcruit Cost/Month</div>
            </div>
            <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">
                      ₹{roiData.monthlySavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Monthly Savings</div>
            </div>
            <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {roiData.roiPercentage.toFixed(0)}%
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">ROI</div>
                  </div>
            </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg bg-white dark:bg-slate-800 shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                  Hello, How can we help you?
                </CardTitle>
                <Button
                  onClick={() => setShowContactModal(false)}
                  variant="ghost"
                  size="sm"
                  className="p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                
                <Button
                  type="button"
                  className="w-full bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 py-3 rounded-lg font-semibold text-base"
                >
                  Submit
                </Button>
              </form>
              
              <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  You can also send us a mail at{' '}
                  <a 
                    href="mailto:info@techmarqx.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    info@techmarqx.com
                  </a>
                  {' '}and our team will get back to you at the earliest
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

        {/* Processing State */}
        {isProcessing && (
        <div className="py-16">
          <ProcessingLoader filesCount={files.length} />
        </div>
        )}

        {/* Results Display */}
        {showResults && !isProcessing && (
        <div className="py-16">
          <ResultsDisplay results={results} onReset={handleReset} />
        </div>
        )}

      {/* Interactive Demo Section */}
        {!isProcessing && !showResults && (
        <div className="py-16 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Experience Enterprise AI in Action
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Upload sample resumes and see how our enterprise-grade AI processes them with precision and speed
              </p>
            </div>
            
          <div className="animate-fade-in">
            <FileUploader 
              onFilesSelected={handleFilesSelected} 
              selectedFiles={files}
              onProcess={handleProcess}
            />
            </div>
          </div>
        </div>
      )}

      {/* Enterprise Features */}
      {!showResults && !isProcessing && (
        <div className="py-16 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Enterprise-Grade Capabilities
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Built for the demanding requirements of large organizations with advanced security, scalability, and integration capabilities
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Enterprise Security',
                  description: 'SOC 2 Type II certified with end-to-end encryption, GDPR compliance, and advanced threat protection.',
                  color: 'text-blue-600 dark:text-blue-400',
                  bgColor: 'bg-blue-100 dark:bg-blue-900/30'
                },
                {
                  icon: TrendingUp,
                  title: 'Advanced Analytics',
                  description: 'Real-time dashboards, predictive hiring insights, and comprehensive reporting for data-driven decisions.',
                  color: 'text-emerald-600 dark:text-emerald-400',
                  bgColor: 'bg-emerald-100 dark:bg-emerald-900/30'
                },
                {
                  icon: Zap,
                  title: 'Lightning Fast Processing',
                  description: 'Process thousands of resumes simultaneously with sub-second response times and 99.9% uptime SLA.',
                  color: 'text-purple-600 dark:text-purple-400',
                  bgColor: 'bg-purple-100 dark:bg-purple-900/30'
                },
                {
                  icon: Users,
                  title: 'Team Collaboration',
                  description: 'Multi-user workspaces, role-based permissions, and seamless integration with your existing HR systems.',
                  color: 'text-orange-600 dark:text-orange-400',
                  bgColor: 'bg-orange-100 dark:bg-orange-900/30'
                },
                {
                  icon: Building2,
                  title: 'White-Label Solution',
                  description: 'Custom branding, API integration, and deployment options to match your enterprise infrastructure.',
                  color: 'text-indigo-600 dark:text-indigo-400',
                  bgColor: 'bg-indigo-100 dark:bg-indigo-900/30'
                },
                {
                  icon: Star,
                  title: 'Dedicated Support',
                  description: '24/7 enterprise support, dedicated account manager, and custom training for your team.',
                  color: 'text-pink-600 dark:text-pink-400',
                  bgColor: 'bg-pink-100 dark:bg-pink-900/30'
                }
              ].map((feature, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          </div>
        )}

      {/* Why Choose Us Section */}
        {!showResults && !isProcessing && (
        <div className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Why Choose Techcruit AI?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                The most affordable and advanced AI recruitment solution in the market
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: DollarSign,
                  title: 'Unbeatable Pricing',
                  description: 'Starting at just ₹15/resume - 70% cheaper than competitors. No hidden fees, no setup costs.',
                  highlight: 'Lowest in Market',
                  color: 'text-emerald-600 dark:text-emerald-400',
                  bgColor: 'bg-emerald-100 dark:bg-emerald-900/30'
                },
                {
                  icon: Zap,
                  title: 'Lightning Fast Processing',
                  description: 'Process 1000+ resumes in under 15 minutes. Bulk upload and instant results with 99.7% accuracy.',
                  highlight: 'Industry Leading Speed',
                  color: 'text-blue-600 dark:text-blue-400',
                  bgColor: 'bg-blue-100 dark:bg-blue-900/30'
                },
                {
                  icon: Target,
                  title: 'Advanced AI Filtering',
                  description: 'Smart filtering by skills, experience, location, and domain. Fresher vs experienced candidate detection.',
                  highlight: 'Unique Feature',
                  color: 'text-purple-600 dark:text-purple-400',
                  bgColor: 'bg-purple-100 dark:bg-purple-900/30'
                },
                {
                  icon: FileText,
                  title: 'Multiple Export Formats',
                  description: 'Export in Excel, PDF, and Word formats. Branded reports with your company logo.',
                  highlight: 'Professional Output',
                  color: 'text-orange-600 dark:text-orange-400',
                  bgColor: 'bg-orange-100 dark:bg-orange-900/30'
                },
                {
                  icon: Mail,
                  title: 'Automated Email Delivery',
                  description: 'Auto-send processed results to your team. No manual downloading or sharing required.',
                  highlight: 'Workflow Automation',
                  color: 'text-pink-600 dark:text-pink-400',
                  bgColor: 'bg-pink-100 dark:bg-pink-900/30'
                },
                {
                  icon: CheckCircle,
                  title: 'No Setup Required',
                  description: 'Start immediately with zero setup. No contracts, no commitments. Pay only for what you use.',
                  highlight: 'Instant Access',
                  color: 'text-indigo-600 dark:text-indigo-400',
                  bgColor: 'bg-indigo-100 dark:bg-indigo-900/30'
                }
              ].map((feature, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <Badge className={`text-xs font-semibold ${feature.color.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')} text-white`}>
                        {feature.highlight}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Interviews Coming Soon */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">🚀 Coming Soon: AI Interviews</h3>
              </div>
              <p className="text-lg opacity-90 max-w-4xl mx-auto leading-relaxed">
                Techcruit's AI Interview feature revolutionizes the way you assess candidates by enabling you to conduct intelligent, automated interviews. Whether you're managing multiple applicants in the Workflow or working on a single candidate from the Application Details page, it provides a seamless, efficient solution.
              </p>
              <Badge className="mt-4 bg-white/20 text-white border-white/30">
                Beta Access Available Soon
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* ROI Section */}
      {!showResults && !isProcessing && (
        <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Calculate Your ROI with Techcruit AI
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Companies using Techcruit AI save an average of $2.5M annually while reducing time-to-hire by 80%
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">₹50K</div>
                <div className="text-lg opacity-90">Cost per bad hire avoided</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">15 days</div>
                <div className="text-lg opacity-90">Reduction in time-to-hire</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">300%</div>
                <div className="text-lg opacity-90">Increase in qualified candidates</div>
              </div>
            </div>
            
            {/* Free Trial Highlight */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-white/30">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">🎉 FREE TRIAL OFFER</div>
                <div className="text-lg opacity-90">Get your first 10 resumes screened at no cost!</div>
                <div className="text-sm opacity-80 mt-2">No credit card required • Full feature access</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleScheduleDemo}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
              >
                Let's Connect
              </Button>
              <Button 
                onClick={handleRequestROI}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105 bg-transparent"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Request ROI Calculator
              </Button>
            </div>
            </div>
          </div>
        )}
    </Layout>
  );
};

export default Index;
