"use client";
import React, { ChangeEvent, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onFileUploadSuccess?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true
    };
    
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      // console.error('Error compressing image:', error);
      return file;
    }
  };

  const convertToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      try {
        const selectedFile = e.target.files[0];
        const compressedFile = await compressImage(selectedFile);
        setFile(compressedFile);
        
        const base64String = await convertToBase64(compressedFile);
        setPreviewUrl(base64String);
      } catch (error) {
        // console.error('Error processing file:', error);
        alert('Error processing file');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpload = async () => {
    if (!previewUrl) {
      alert('Please select a file');
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      // Store base64 string in localStorage
      localStorage.setItem('uploadedImageBase64', previewUrl);

      // Create file metadata
      const fileMetadata = {
        originalName: file?.name || 'unknown',
        uploadedBy: 'user',
        createdAt: new Date().toISOString(),
        base64Data: previewUrl,
        cloudinaryId: '',
        url: ''
      };

      // Upload the file metadata and base64 data
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fileMetadata)
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      // Store the Cloudinary URL
      localStorage.setItem('cloudinaryImageUrl', data.url);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      // Complete the upload after a short delay
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress(100);
        setLoading(false);
        if (onFileUploadSuccess) {
          onFileUploadSuccess();
        }
      }, 500);

    } catch (err) {
      // console.error('Error uploading file:', err);
      alert('Error uploading file!');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-6">
        {/* File Input UI */}
        <div className="flex flex-col items-center space-y-4">
          <label 
            htmlFor="file-upload" 
            className="w-full cursor-pointer"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-teal-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {loading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500" />
                  <p className="mt-2 text-sm text-gray-500">Processing...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-teal-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or PDF (MAX. 10MB)</p>
                </div>
              )}
            </motion.div>
          </label>
          <input 
            id="file-upload" 
            type="file" 
            accept="image/*,.pdf"
            className="hidden" 
            onChange={handleFileChange}
          />

          {/* Preview Section */}
          {previewUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 w-full max-w-xs mx-auto"
            >
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-48 object-contain rounded-lg" 
                />
                <button
                  onClick={() => {
                    const cloudinaryUrl = localStorage.getItem('cloudinaryImageUrl');
                    if (cloudinaryUrl) {
                      window.open(cloudinaryUrl, '_blank');
                    } else {
                      // Fallback to base64 preview if Cloudinary URL is not available
                      const newWindow = window.open();
                      if (newWindow) {
                        newWindow.document.write(`
                          <html>
                            <head>
                              <title>Image Preview</title>
                              <style>
                                body {
                                  margin: 0;
                                  display: flex;
                                  justify-content: center;
                                  align-items: center;
                                  min-height: 100vh;
                                  background: #f3f4f6;
                                }
                                img {
                                  max-width: 100%;
                                  max-height: 100vh;
                                  object-fit: contain;
                                }
                              </style>
                            </head>
                            <body>
                              <img src="${previewUrl}" alt="Full size preview" />
                            </body>
                          </html>
                        `);
                      }
                    }
                  }}
                  className="absolute top-2 right-2 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition-colors"
                  title="View full image"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* Upload Progress */}
          {loading && (
            <div className="w-full">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-teal-500 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                {uploadProgress}% uploaded
              </p>
            </div>
          )}

          <button 
            onClick={handleUpload} 
            disabled={loading || !file} 
            className="w-full px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-teal-300 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Processing...' : 'Upload File'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
