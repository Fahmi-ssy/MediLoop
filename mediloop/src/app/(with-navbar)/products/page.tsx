"use client";

import React from "react";
import CardProduct from "@/components/CardProduct";
import { Product } from "@/types";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboardProduct?page=${page}&limit=10&query=${query}`,
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [page, query]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-white">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logoOnly.png"
              alt="MediLoop Logo"
              width={60}
              height={60}
              className="object-contain animate-float"
              priority
            />
            <div className="absolute -inset-3 bg-teal-100 rounded-full blur-2xl opacity-30 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
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
            <CardProduct 
              product={el} 
              key={el._id.toString()}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
