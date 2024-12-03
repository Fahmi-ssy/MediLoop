"use client";

import React from "react";
import { Product } from "@/types";
import { useState, useEffect } from "react";
import AdminCardProduct from "@/components/adminCardProduct";
import Link from "next/link";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/products", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      {/* Add New Product and Register Admin Buttons */}
      
      {/* Pencarian */}
      <div className="flex justify-center items-center mt-8">
      </div>
      <div className="relative py-12 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-teal-100"></div>
        <div className="relative z-10 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-teal-900 mb-2">All Products</h1>
          <div className="h-1 w-24 bg-teal-500 rounded"></div>
        </div>
      </div>
      <div className="flex justify-end gap-4 p-4 mb-4">
        <Link href="/adminDashboard/add">
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
            Add New Product
          </button>
        </Link>
      </div>
      


      {/* Add Products button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-4">
          <Link
            href="/adminDashboard/add"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Product
          </Link>
        </div>
      </div>

      {/* Display All Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-10 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-40">
        {products.map((product, index) => (
          <AdminCardProduct
            product={product}
            key={product._id?.toString() || index}
          />
        ))}
      </div>
    </div>
    
  );
}
