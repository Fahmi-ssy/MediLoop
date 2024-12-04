'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  _id?: string;
  name: string;
  description: string;
  usage: string;
  price: number;
  image: string;
}

export default function ProductDetail({ params }: { params: { name: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboardProduct/${params.name}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/adminDashboard"
          className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative w-96 h-96 rounded-xl overflow-hidden bg-gray-100 mx-auto">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Name and Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-teal-600">
                Rp {product.price?.toLocaleString("id-ID")}
              </p>
            </div>

            {/* Description */}
            <div className="border-t border-b py-4">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Usage */}
            <div className="border-t border-b py-4">
              <h2 className="text-lg font-semibold mb-2">Usage</h2>
              <p className="text-gray-600">{product.usage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
