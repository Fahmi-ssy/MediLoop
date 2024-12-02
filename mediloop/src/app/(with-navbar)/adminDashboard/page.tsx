"use client";

import React from "react";
import { Product } from "@/types";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminCardProduct from "@/components/adminCardProduct";
import Link from "next/link";

export default function adminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/dashboardProduct?page=${page}&limit=10&query=${query}`,
        { cache: "no-store" }
      );
      const newProducts: Product[] = await res.json();

      setProducts((prevProducts) => {
        const existingIds = new Set(prevProducts.map((product) => product._id));
        const uniqueNewProducts = newProducts.filter(
          (product) => !existingIds.has(product._id)
        );
        return [...prevProducts, ...uniqueNewProducts];
      });

      setHasMore(newProducts.length > 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [page, query]);

  return (
    <div>
      {/* Add New Product Button */}
      <div className="absolute top-4 right-4">
        <Link href="/adminDashboard/add">
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
            Add New Product
          </button>
        </Link>
      </div>
      {/* Pencarian */}
      <div className="flex justify-center items-center mt-8">
        {/* <input
          type="text"
          className="border p-2 rounded w-1/3"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
            setProducts([]);
          }}
        /> */}
      </div>
      <div className="relative py-12 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-teal-100"></div>
        <div className="relative z-10 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-teal-900 mb-2">All Products</h1>
          <div className="h-1 w-24 bg-teal-500 rounded"></div>
        </div>
      </div>
      


      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={products.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={
          <p className="text-center m-10 text-4xl">No more products.</p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-10 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-40">
          {products.map((el) => (
            <AdminCardProduct
              product={el} 
              key={el._id.toString()}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
    
  );
}
