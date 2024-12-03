'use client';

import Image from "next/image";
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
        const response = await fetch(`/api/dashboardProduct/${params.name}`);
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
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="relative w-96 h-96 rounded-xl overflow-hidden bg-gray-100 mx-auto">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="mt-4 text-gray-600">{product.description}</p>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900">Usage</h2>
                <p className="mt-2 text-gray-600">{product.usage}</p>
              </div>
              
              <div className="mt-6">
                <p className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 