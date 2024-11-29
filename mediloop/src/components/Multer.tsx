"use client";
import React, { ChangeEvent, useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

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
    <div className="file-upload-container">
      <div className="upload-card">
        <h1>File Upload</h1>    
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button onClick={handleUpload} disabled={loading} className="upload-button">
          {loading ? 'Uploading...' : 'Upload'}
        </button>

        {imageUrl && (
          <div className="image-preview">
            <h3>Uploaded Image:</h3>
            <div className="image-container">
              <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
              <div className="image-actions">
                <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="view-link">
                  View Full Image
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
