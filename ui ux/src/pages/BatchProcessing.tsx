import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Upload, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import Layout from '../components/Layout';

interface BatchResult {
  filename: string;
  status: 'success' | 'processed' | 'error';
  message?: string;
}

interface BatchHistory {
  id: number;
  date: string;
  filesCount: number;
  status: string;
  duration: string;
}

const BatchProcessing = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<BatchResult[]>([]);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<BatchHistory[]>([]);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    fetchBatchHistory();
  }, []);

  const fetchBatchHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/batch/history');
      if (response.ok) {
        const data = await response.json();
        setHistory(data.history);
      }
    } catch (error) {
      console.error('Failed to fetch batch history:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setResults([]);
    setSummary(null);
  };

  const handleBatchProcess = async () => {
    if (!files || files.length === 0) return;

    setProcessing(true);
    setProgress(0);
    setResults([]);

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      const response = await fetch('http://localhost:5000/api/batch/process', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
        setSummary(data.summary);
        fetchBatchHistory(); // Refresh history
      } else {
        const error = await response.json();
        console.error('Batch processing failed:', error);
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'processed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      'completed': 'default',
      'partial': 'secondary',
      'failed': 'destructive'
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Batch Processing</h1>
          <p className="text-slate-600 dark:text-slate-400">Process multiple resumes simultaneously with advanced AI analysis</p>
        </div>
        
        {/* Upload Section */}
        <Card className="mb-8 hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Upload className="w-5 h-5" />
              Upload Resumes for Batch Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-200">
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="batch-upload"
                />
                <label
                  htmlFor="batch-upload"
                  className="cursor-pointer flex flex-col items-center space-y-4"
                >
                  <FileText className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                  <div>
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                      Click to select PDF files
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Maximum 20 files per batch
                    </p>
                  </div>
                </label>
              </div>

              {files && files.length > 0 && (
                <div className="space-y-2">
                  <p className="font-medium text-slate-900 dark:text-white">{files.length} files selected:</p>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {Array.from(files).map((file, index) => (
                      <div key={index} className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {file.name}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleBatchProcess} 
                    disabled={processing}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    {processing ? 'Processing...' : 'Start Batch Processing'}
                  </Button>
                </div>
              )}

              {processing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-700 dark:text-slate-300">Processing resumes...</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results.length > 0 && (
          <Card className="mb-8 hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Processing Results</CardTitle>
            </CardHeader>
            <CardContent>
              {summary && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg border border-blue-200 dark:border-blue-700">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{summary.total}</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Total Files</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/50 rounded-lg border border-green-200 dark:border-green-700">
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">{summary.processed}</div>
                    <div className="text-sm text-green-600 dark:text-green-400">Processed</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/50 rounded-lg border border-red-200 dark:border-red-700">
                    <div className="text-2xl font-bold text-red-700 dark:text-red-300">{summary.errors}</div>
                    <div className="text-sm text-red-600 dark:text-red-400">Errors</div>
                  </div>
                </div>
              )}

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {results.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-md transition-all duration-200 border border-slate-200 dark:border-slate-600">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(result.status)}
                      <span className="font-medium text-slate-900 dark:text-white">{result.filename}</span>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      {result.message || result.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* History Section */}
        <Card className="mb-8 hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">Processing History</CardTitle>
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              <div className="space-y-3">
                {history.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-md transition-all duration-200 border border-slate-200 dark:border-slate-600">
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-slate-600 dark:text-slate-300">{item.date}</div>
                      <div className="font-medium text-slate-900 dark:text-white">{item.filesCount} files</div>
                      {getStatusBadge(item.status)}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">{item.duration}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                No batch processing history found
              </div>
            )}
          </CardContent>
        </Card>

        {/* Advanced Features - Coming Soon */}
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">Advanced Batch Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Enterprise Batch Processing
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Scheduled processing, custom workflows, bulk exports, and API integrations
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

export default BatchProcessing; 