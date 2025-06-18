import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Check, 
  Star, 
  Rocket, 
  Building, 
  Users, 
  Zap, 
  Crown, 
  Shield,
  Calculator,
  Phone,
  Mail,
  Clock,
  Target,
  Award,
  TrendingUp,
  X
} from 'lucide-react';
import Layout from '../components/Layout';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  unit: string;
  resumeLimit: string;
  features: string[];
  popular?: boolean;
  enterprise?: boolean;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  savings?: string;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  icon: React.ReactNode;
  category: 'security' | 'analytics' | 'integration';
}

const Pricing = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [roiInputs, setROIInputs] = useState({
    monthlyResumes: 1000,
    avgTimePerResume: 15,
    hourlyRate: 75
  });

  useEffect(() => {
    fetchPricingData();
  }, []);

  const fetchPricingData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pricing/plans', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPlans(data.plans);
        setAddOns(data.addOns);
      } else {
        // Fallback to default data
        setDefaultPricing();
      }
    } catch (error) {
      console.error('Failed to fetch pricing:', error);
      setDefaultPricing();
    } finally {
      setLoading(false);
    }
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

  const setDefaultPricing = () => {
    const defaultPlans: PricingPlan[] = [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Perfect for small teams and startups',
        price: 15,
        currency: 'INR',
        unit: 'per resume',
        resumeLimit: 'Up to 100 resumes',
        savings: 'Basic screening package',
        features: [
          'Basic resume screening',
          'AI-powered skills extraction',
          'Excel export',
          'Email support',
          'Standard processing speed'
        ],
        icon: <Rocket className="w-8 h-8" />,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      },
      {
        id: 'growth',
        name: 'Growth',
        description: 'Best for growing companies',
        price: 20,
        currency: 'INR',
        unit: 'per resume',
        resumeLimit: 'Up to 500 resumes',
        savings: 'Filtered, All formats',
        features: [
          'Advanced AI filtering (Skills, Experience, Location)',
          'Batch processing up to 1000 resumes',
          'All export formats (Excel, PDF, Word)',
          'Email auto-delivery',
          'Priority support',
          'Custom filters',
          'Fresher/Experienced filtering'
        ],
        popular: true,
        enterprise: false,
        icon: <Building className="w-8 h-8" />,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-300'
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'For large organizations (1000-20,000 resumes)',
        price: 0,
        currency: 'INR',
        unit: 'custom pricing',
        resumeLimit: '1000-20,000 resumes',
        savings: 'Full automation + email delivery',
        features: [
          'Full automation suite',
          'Unlimited bulk processing',
          'Advanced AI filtering',
          'White-label solution',
          'Dedicated account manager',
          'Custom integrations',
          'Branded reports with your logo',
          'Priority processing',
          'API access',
          'Training sessions'
        ],
        enterprise: true,
        icon: <Crown className="w-8 h-8" />,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-300'
      }
    ];

    const defaultAddOns: AddOn[] = [
      {
        id: 'skills-filter',
        name: 'Advanced Skills & Education Filter',
        description: 'Filter by specific skills, education levels, and experience criteria',
        price: 499,
        currency: 'INR',
        icon: <Shield className="w-6 h-6" />,
        category: 'analytics'
      },
      {
        id: 'email-delivery',
        name: 'Email Auto-Delivery',
        description: 'Automated email delivery of processed results to your team',
        price: 299,
        currency: 'INR',
        icon: <Mail className="w-6 h-6" />,
        category: 'integration'
      },
      {
        id: 'branded-reports',
        name: 'Branded Reports (With Your Logo)',
        description: 'Custom branded reports with your company logo and styling',
        price: 999,
        currency: 'INR',
        icon: <Award className="w-6 h-6" />,
        category: 'security'
      }
    ];

    setPlans(defaultPlans);
    setAddOns(defaultAddOns);
  };

  const handleSelectPlan = (planId: string) => {
    if (planId === 'enterprise' || planId === 'global') {
      setShowContactModal(true);
    } else {
      setSelectedPlan(planId);
      // Here you would typically redirect to payment form
      console.log('Selected plan:', planId);
    }
  };

  const handleScheduleDemo = () => {
    setShowContactModal(true);
  };

  const handleContactSales = () => {
    setShowContactModal(true);
  };

  const roiData = calculateROI();

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
              <div className="text-xl text-slate-600 dark:text-slate-300">Loading enterprise pricing...</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Building className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Enterprise AI Recruitment Platform
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            Transparent pricing designed for scalability. From growing companies to Fortune 500 enterprises.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 opacity-80">
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
              <Shield className="w-5 h-5" />
              <span className="font-medium">SOC 2 Certified</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
              <Award className="w-5 h-5" />
              <span className="font-medium">99.99% Uptime</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
              <Users className="w-5 h-5" />
              <span className="font-medium">Fortune 500 Trusted</span>
            </div>
          </div>
        </div>

        {/* ROI Calculator Toggle */}
        <div className="text-center">
          <Button
            onClick={() => setShowROICalculator(!showROICalculator)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Your ROI
          </Button>
        </div>

        {/* ROI Calculator */}
        {showROICalculator && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-slate-900 dark:text-white">
                ROI Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="monthlyResumes" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Monthly Resume Volume
                  </label>
                  <input
                    id="monthlyResumes"
                    type="number"
                    value={roiInputs.monthlyResumes}
                    onChange={(e) => setROIInputs({...roiInputs, monthlyResumes: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="Enter monthly resume volume"
                  />
                </div>
                <div>
                  <label htmlFor="avgTimePerResume" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Minutes per Resume (Manual)
                  </label>
                  <input
                    id="avgTimePerResume"
                    type="number"
                    value={roiInputs.avgTimePerResume}
                    onChange={(e) => setROIInputs({...roiInputs, avgTimePerResume: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="Minutes per resume"
                  />
                </div>
                <div>
                                      <label htmlFor="hourlyRate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Hourly Rate (₹)
                    </label>
                  <input
                    id="hourlyRate"
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
        )}

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={plan.id} 
              className={`relative enterprise-hover border-0 shadow-xl ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''} ${plan.enterprise ? 'bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-semibold">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className={`mx-auto w-16 h-16 ${plan.bgColor} dark:bg-slate-700 rounded-xl flex items-center justify-center mb-4`}>
                  <div className={plan.color}>
                    {plan.id === 'starter' && <Rocket className="w-8 h-8" />}
                    {plan.id === 'growth' && <Building className="w-8 h-8" />}
                    {plan.id === 'enterprise' && <Crown className="w-8 h-8" />}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                  {plan.name}
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center">
                  {plan.price > 0 ? (
                    <>
                      <div className="text-4xl font-bold text-slate-900 dark:text-white">
                        ₹{plan.price}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">{plan.unit}</div>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl font-bold text-slate-900 dark:text-white">
                        Custom
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">Enterprise pricing</div>
                    </>
                  )}
                  <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-2">
                    {plan.savings}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 ${
                    plan.popular 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900'
                  }`}
                >
                  {plan.enterprise ? 'Contact Sales' : 'Get Started'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>



        {/* Enterprise Contact Section */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 dark:from-slate-800 dark:to-blue-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Recruitment Process?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Join Fortune 500 companies using Techcruit AI to reduce hiring costs by 85% and time-to-hire by 80%
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <div className="text-2xl font-bold mb-2">48 Hours</div>
              <div className="opacity-90">Implementation Time</div>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <div className="text-2xl font-bold mb-2">99.7%</div>
              <div className="opacity-90">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <div className="text-2xl font-bold mb-2">24/7</div>
              <div className="opacity-90">Enterprise Support</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleScheduleDemo}
              className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Phone className="w-5 h-5 mr-2" />
              Let's Connect
            </Button>
            <Button 
              onClick={handleContactSales}
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 bg-transparent"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Sales
            </Button>
          </div>
        </div>

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
      </div>
    </Layout>
  );
};

export default Pricing; 