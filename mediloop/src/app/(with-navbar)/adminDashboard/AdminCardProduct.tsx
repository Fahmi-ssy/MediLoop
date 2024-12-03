import React from "react";

interface Product {
  _id?: string;
  id?: number;
  name: string;
  description: string;
  usage: string;
  price: number;
  image: string;
}

interface AdminCardProductProps {
  product: Product;
}

export default function AdminCardProduct({ product }: AdminCardProductProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <p className="text-gray-500 mt-1">Usage: {product.usage}</p>
        <p className="text-lg font-bold mt-2">${product.price}</p>
      </div>
    </div>
  );
} 