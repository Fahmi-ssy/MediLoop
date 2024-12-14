"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    usage: "",
    image: "/default-product.png",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for negative price
    if (product.price < 0) {
      toast.error("Price cannot be negative", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboardProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        toast.success("Product added successfully!", {
          position: "top-right",
          autoClose: 1500,
        });
        
        // Clear the form
        setProduct({
          name: "",
          price: 0,
          description: "",
          usage: "",
          image: "/default-product.png",
        });

        // Wait for the toast to show before redirecting
        setTimeout(() => {
          router.push("/adminDashboard");
        }, 1500);
      } else {
        toast.error("Failed to add product", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch (error) {
      toast.error("Failed to add product. Please try again", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="mb-8">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="mt-2 text-sm text-gray-600">Fill in the details to add a new product to your inventory</p>
          </div>
          
          <div className="flex justify-center">
            <Link
              href="/adminDashboard/importCSV"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Insert Bulk Product
            </Link>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 outline-none text-black"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 outline-none text-black"
              placeholder="Enter product description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usage Instructions
            </label>
            <textarea
              name="usage"
              value={product.usage}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 outline-none text-black"
              placeholder="Enter usage instructions"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (Rp)
            </label>
            <input
              type="text"
              name="price"
              value={product.price.toLocaleString('id-ID')}
              onChange={(e) => {
                const value = e.target.value.replace(/\./g, '');
                if (/^\d*$/.test(value)) {
                  setProduct(prev => ({
                    ...prev,
                    price: Number(value)
                  }));
                }
              }}
              min="0"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 outline-none text-black"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <div className="flex items-center space-x-4">
              {product.image && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt="Product preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    
                    // Create FormData
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('upload_preset', 'mediloop'); // Create this preset in your Cloudinary dashboard
                    
                    try {
                      // Upload to Cloudinary
                      const response = await fetch(
                        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                        {
                          method: 'POST',
                          body: formData,
                        }
                      );
                      
                      const data = await response.json();
                      
                      if (data.secure_url) {
                        setProduct(prev => ({
                          ...prev,
                          image: data.secure_url
                        }));
                      }
                    } catch (error) {
                      toast.error("Failed to upload image", {
                        position: "top-right",
                        autoClose: 1500,
                      });
                    }
                  }
                }}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-teal-50 file:text-teal-700
                  hover:file:bg-teal-100
                  cursor-pointer
                "
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Upload a product image (PNG, JPG up to 5MB)
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push("/adminDashboard")}
              className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
} 
