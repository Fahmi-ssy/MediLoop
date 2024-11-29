"use client";
import React, { ChangeEvent, useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create a preview URL for the selected file
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  // Clean up the preview URL when component unmounts or when a new file is selected
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || 'default_preset');
    formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'default_cloud_name');

    try {
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

      const res = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (data.secure_url) {
        setImageUrl(data.secure_url);
        alert('File uploaded successfully!');
      } else {
        alert('File upload failed!');
      }
    } catch (err) {
      setLoading(false);
      console.error('Error uploading file:', err);
      alert('Error uploading file!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600">Upload your prescriptions or medical reports</p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="w-full">
            <label 
              htmlFor="file-upload" 
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-teal-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-teal-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG or PDF (MAX. 10MB)</p>
              </div>
              <input 
                id="file-upload" 
                type="file" 
                accept="image/*,.pdf"
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Preview Section */}
          {previewUrl && !imageUrl && (
            <div className="mt-4 w-full max-w-xs mx-auto">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-48 object-contain" 
              />
            </div>
          )}

          <button 
            onClick={handleUpload} 
            disabled={loading || !file} 
            className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-teal-300 disabled:cursor-not-allowed font-medium"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : 'Upload File'}
          </button>
        </div>

        {imageUrl && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-teal-900">Uploaded Document:</h3>
            <div className="border rounded-lg overflow-hidden">
              <img src={imageUrl} alt="Uploaded" className="w-full h-auto max-h-96 object-contain bg-gray-100" />
              <div className="p-4 bg-gray-50 border-t">
                <a 
                  href={imageUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  View Full Document
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
