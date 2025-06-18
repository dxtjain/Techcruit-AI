import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Upload, Brain, FileText, Star, TrendingUp, Users, DollarSign } from 'lucide-react';
import Layout from '../components/Layout';

interface AnalysisResult {
  filename: string;
  analysis: string;
  scores: {
    technical_skills: number;
    experience_relevance: number;
    communication: number;
    leadership: number;
    overall_fit: number;
  };
  recommendations: string[];
  salary_estimate: {
    min: number;
    max: number;
    currency: string;
  };
}

const AIAnalysis = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/ai/analyze', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Analysis failed');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">AI Analysis</h1>
          <p className="text-slate-600 dark:text-slate-400">Advanced AI-powered resume analysis with detailed insights and recommendations</p>
        </div>
        
        {/* Upload Section */}
        <Card className="mb-8 hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Brain className="w-5 h-5" />
              Advanced Resume Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-200">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="ai-upload"
                />
                <label
                  htmlFor="ai-upload"
                  className="cursor-pointer flex flex-col items-center space-y-4"
                >
                  <FileText className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                  <div>
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                      Upload a resume for AI analysis
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Get detailed insights and recommendations
                    </p>
                  </div>
                </label>
              </div>

              {file && (
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-slate-900 dark:text-white">{file.name}</span>
                  </div>
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={analyzing}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    {analyzing ? 'Analyzing...' : 'Start AI Analysis'}
                  </Button>
                </div>
              )}

              {error && (
                <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {result && (
          <div className="space-y-6">
            {/* Score Overview */}
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <Star className="w-5 h-5" />
                  Analysis Scores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {Object.entries(result.scores).map(([key, value]) => (
                    <div key={key} className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-md transition-all duration-200 border border-slate-200 dark:border-slate-600">
                      <div className={`text-3xl font-bold ${getScoreColor(value)}`}>
                        {value}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                      <div className={`text-xs mt-1 ${getScoreColor(value)}`}>
                        {getScoreLabel(value)}
                      </div>
                      <Progress value={value} className="mt-2 h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Salary Estimate */}
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <DollarSign className="w-5 h-5" />
                  Salary Estimate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-green-50 dark:bg-green-900/50 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">
                    ${result.salary_estimate.min.toLocaleString()} - ${result.salary_estimate.max.toLocaleString()} {result.salary_estimate.currency}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    Estimated salary range based on skills and experience
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <TrendingUp className="w-5 h-5" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/50 rounded-lg border border-blue-200 dark:border-blue-700">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="text-slate-700 dark:text-slate-300">{rec}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <Brain className="w-5 h-5" />
                  Detailed AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={result.analysis}
                  readOnly
                  className="min-h-64 font-mono text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  placeholder="AI analysis will appear here..."
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Comparison Tool - Mock UI */}
        <Card className="mt-8 hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Users className="w-5 h-5" />
              Resume Comparison Tool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-slate-500 dark:text-slate-400 mb-4">
                Compare multiple resumes side by side with AI-powered insights
              </div>
              <Button variant="outline" disabled className="text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600">
                Select Resumes to Compare
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Advanced AI Features - Coming Soon */}
        <Card className="mt-8 hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">Advanced AI Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Next-Generation AI Analysis
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Sentiment analysis, skill gap detection, career path recommendations, and predictive hiring success
              </p>
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
                <span className="font-medium">Coming Soon</span>
    </div>
  </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
);
};

export default AIAnalysis; 