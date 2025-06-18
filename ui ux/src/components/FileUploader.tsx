import React, { useCallback, useState } from 'react';
import { Upload, File, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  selectedFiles: File[];
  onProcess: () => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  selectedFiles,
  onProcess
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  const allowedExtensions = ['.pdf', '.doc', '.docx'];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(
      file => allowedTypes.includes(file.type) || allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
    );
    if (files.length > 0) {
      onFilesSelected([...selectedFiles, ...files]);
    }
  }, [selectedFiles, onFilesSelected]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      file => allowedTypes.includes(file.type) || allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
    );
    if (files.length > 0) {
      onFilesSelected([...selectedFiles, ...files]);
    }
  }, [selectedFiles, onFilesSelected]);

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    onFilesSelected(updatedFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-0">
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-6 sm:p-12 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50/50 scale-105' 
            : 'border-slate-300 hover:border-blue-300 hover:bg-slate-50/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          title="Upload PDF, DOC, or DOCX files"
        />
        
        <div className="space-y-3 sm:space-y-4">
          <div className={`mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDragOver ? 'bg-blue-100 scale-110' : 'bg-slate-100'
          }`}>
            <Upload className={`h-6 w-6 sm:h-8 sm:w-8 transition-colors duration-300 ${
              isDragOver ? 'text-blue-600' : 'text-slate-600'
            }`} />
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
              {isDragOver ? 'Drop your files here' : 'Upload Resume Files'}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 px-2">
              Drag and drop PDF or Word files here, or click to browse
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Supports PDF, DOC, DOCX formats • Max 100 files per batch
            </p>
          </div>
        </div>
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow-lg p-4 sm:p-6 animate-fade-in border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
            <h4 className="text-base sm:text-lg font-semibold text-slate-900 text-center sm:text-left">
              Selected Files ({selectedFiles.length})
            </h4>
            <Button
              onClick={onProcess}
              className="w-full sm:w-auto bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700 text-white px-4 sm:px-6 py-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Play className="h-4 w-4" />
              <span>Process Resumes</span>
            </Button>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200 border border-slate-200"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="bg-red-100 p-2 rounded-lg flex-shrink-0">
                    <File className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900 truncate text-sm sm:text-base">
                      {file.name}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-slate-200 rounded-full transition-colors duration-200 flex-shrink-0 ml-2"
                  title="Remove file"
                >
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
