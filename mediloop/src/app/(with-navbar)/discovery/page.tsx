// "use client";
// import React, { ChangeEvent, useState } from 'react';

// const FileUpload = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState('');

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     // Ensure that files is not null before accessing files[0]
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file');
//       return;
//     }

//     setLoading(true);

//     // Prepare form data to upload to Cloudinary
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || 'default_preset');  // Cloudinary upload preset
//     formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'default_cloud_name'); // Cloudinary cloud name

//     try {
//       // Construct the Cloudinary URL dynamically using the cloud name
//       const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      
//       const res = await fetch(cloudinaryUrl, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (data.secure_url) {
//         setImageUrl(data.secure_url); // The URL of the uploaded image
//         alert('File uploaded successfully!');
//       } else {
//         alert('File upload failed!');
//       }
//     } catch (err) {
//       setLoading(false);
//       console.error('Error uploading file:', err);
//       alert('Error uploading file!');
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? 'Uploading...' : 'Upload'}
//       </button>

//       {imageUrl && (
//         <div style={{ marginTop: '20px' }}>
//           <h3>Uploaded Image:</h3>
//           <div
//             style={{
//               border: '1px solid #ddd',
//               borderRadius: '8px',
//               padding: '16px',
//               width: 'fit-content',
//               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//               textAlign: 'center',
//               margin: '0 auto',
//             }}
//           >
//             <img
//               src={imageUrl}
//               alt="Uploaded"
//               width={300}
//               style={{
//                 maxWidth: '100%',
//                 borderRadius: '8px',
//                 marginBottom: '12px',
//               }}
//             />
//             <div
//               style={{
//                 padding: '8px',
//                 backgroundColor: '#f8f8f8',
//                 borderRadius: '8px',
//                 boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
//               }}
//             >
//               <a href={imageUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
//                 View Full Image
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;
