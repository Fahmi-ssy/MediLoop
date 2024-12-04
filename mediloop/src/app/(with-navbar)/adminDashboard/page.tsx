"use client";

import React from "react";
import { Product } from "@/types";
import { useState, useEffect } from "react";
import AdminCardProduct from "@/components/adminCardProduct";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboardProduct?page=${page}&limit=10&query=${query}`,
        { 
          credentials: 'include',
          cache: "no-store" 
        }
      );
      const newProducts: Product[] = await res.json();

      if (page === 1) {
        setProducts(newProducts);
      } else {
        setProducts((prevProducts) => {
          const existingIds = new Set(prevProducts.map((product) => product._id));
          const uniqueNewProducts = newProducts.filter(
            (product) => !existingIds.has(product._id)
          );
          return [...prevProducts, ...uniqueNewProducts];
        });
      }

      setHasMore(newProducts.length > 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [page, query, refreshKey]);

  const handleDelete = (productName: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.name !== productName));
    setRefreshKey(prev => prev + 1);
  };

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

      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={products.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={
          <p className="text-center m-10 text-xl text-teal-600 font-semibold">
            Loading...
          </p>
        }
        endMessage={
          <p className="text-center m-10 text-4xl">No more products.</p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-10 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-40">
          {products.map((el) => (
            <AdminCardProduct 
              product={el}
              key={el._id.toString()} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
    
  );
}
