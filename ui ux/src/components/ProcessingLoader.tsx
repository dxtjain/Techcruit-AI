
import React from 'react';
import { Loader2, FileText, Brain, CheckCircle } from 'lucide-react';

interface ProcessingLoaderProps {
  filesCount: number;
}

export const ProcessingLoader: React.FC<ProcessingLoaderProps> = ({ filesCount }) => {
  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-0">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 animate-fade-in border border-slate-100">
        <div className="text-center mb-6 sm:mb-8">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-slate-700" />
            </div>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            Processing Your Resumes
          </h3>
          <p className="text-sm sm:text-base text-slate-600 px-2">
            Our AI is analyzing {filesCount} resume{filesCount !== 1 ? 's' : ''} and extracting key information
          </p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 flex-shrink-0" />
            <div className="min-w-0">
              <h4 className="font-semibold text-emerald-900 text-sm sm:text-base">Files Uploaded</h4>
              <p className="text-xs sm:text-sm text-emerald-700">Successfully received {filesCount} PDF files</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="relative flex-shrink-0">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-blue-900 text-sm sm:text-base">Extracting Text</h4>
              <p className="text-xs sm:text-sm text-blue-700">Converting PDF content to readable text</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="relative flex-shrink-0">
              <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-600 rounded-full animate-ping"></div>
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-amber-900 text-sm sm:text-base">AI Analysis</h4>
              <p className="text-xs sm:text-sm text-amber-700">Parsing and structuring resume data</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
          <div className="bg-gradient-to-r from-slate-700 to-slate-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
        </div>
        
        <p className="text-center text-xs sm:text-sm text-slate-500">
          This usually takes 1-3 minutes depending on file size and complexity
        </p>
      </div>
    </div>
  );
};
