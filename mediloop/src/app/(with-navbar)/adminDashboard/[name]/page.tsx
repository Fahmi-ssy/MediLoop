import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

async function getProduct(name: string) {
  const res = await fetch(`http://localhost:3000/api/dashboardProduct/${name}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function adminProductDetail({
  params,
}: {
  params: { name: string };
}) {
  const product: Product = await getProduct(params.name);

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
          <div className="relative w-96 h-96 rounded-xl overflow-hidden bg-gray-100 mx-auto">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-teal-600">
                Rp {product.price?.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="border-t border-b py-4">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                Add to Cart
              </button>
              <button className="w-full border-2 border-teal-600 text-teal-600 py-3 px-6 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 