import React, { useState } from 'react';
import { Download, RefreshCw, User, Mail, Phone, Calendar, Code, Monitor, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ResumeResult {
  id: number;
  filename: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  skills: string[];
  software: string[];
  domain: string;
  score: number;
}

interface ResultsDisplayProps {
  results: ResumeResult[];
  onReset: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, onReset }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<ResumeResult | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleExport = async () => {
    setDownloading(true);
    try {
      const response = await fetch('http://localhost:5000/api/download-excel');
      if (!response.ok) throw new Error('Failed to download Excel file.');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resumes_data.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Excel file downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download Excel file.');
    } finally {
      setDownloading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-100 border-emerald-200';
    if (score >= 80) return 'text-blue-700 bg-blue-100 border-blue-200';
    if (score >= 70) return 'text-amber-700 bg-amber-100 border-amber-200';
    return 'text-red-700 bg-red-100 border-red-200';
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in px-2 sm:px-0">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Analysis Complete! 🎉
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Successfully processed {results.length} resume{results.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              onClick={handleExport}
              disabled={downloading}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span>{downloading ? 'Exporting...' : 'Export to Excel'}</span>
            </Button>
            
            <Button
              onClick={onReset}
              variant="outline"
              className="w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Process New Batch</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Candidates List */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {results.map((result, index) => (
            <Card 
              key={result.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-slate-200 ${
                selectedCandidate?.id === result.id ? 'ring-2 ring-blue-500 bg-blue-50/50' : 'bg-white'
              }`}
              onClick={() => setSelectedCandidate(result)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-2 rounded-full flex-shrink-0">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base sm:text-lg font-semibold text-slate-900 truncate">{result.name}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 truncate">{result.filename}</p>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getScoreColor(result.score)} flex-shrink-0 text-center border`}>
                    {result.score}% Match
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{result.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{result.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>{result.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
                    <Target className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{result.domain}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {result.skills.slice(0, 4).map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs bg-slate-100 text-slate-700 border-slate-200">
                        {skill}
                      </Badge>
                    ))}
                    {result.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
                        +{result.skills.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed View */}
        <div className="lg:col-span-1">
          {selectedCandidate ? (
            <Card className="sticky top-4 sm:top-24 border-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-base sm:text-lg text-slate-900">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Candidate Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 flex items-center justify-center">
                    <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 truncate">{selectedCandidate.name}</h3>
                  <p className="text-sm sm:text-base text-slate-600 truncate">{selectedCandidate.domain}</p>
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-2 ${getScoreColor(selectedCandidate.score)} border`}>
                    <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    {selectedCandidate.score}% Match
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center text-sm sm:text-base">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                      Contact Information
                    </h4>
                    <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                      <p className="truncate">{selectedCandidate.email}</p>
                      <p className="truncate">{selectedCandidate.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center text-sm sm:text-base">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                      Experience
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600">{selectedCandidate.experience}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center text-sm sm:text-base">
                      <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedCandidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-slate-100 text-slate-700 border-slate-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center text-sm sm:text-base">
                      <Monitor className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                      Software
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedCandidate.software.map((software, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-slate-300 text-slate-600">
                          {software}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-4 sm:top-24 border-slate-200">
              <CardContent className="p-6 sm:p-8 text-center">
                <User className="h-12 w-12 sm:h-16 sm:w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">Select a Candidate</h3>
                <p className="text-sm sm:text-base text-slate-600">Click on any candidate card to view detailed information</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
