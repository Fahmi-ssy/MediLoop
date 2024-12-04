import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

async function getProduct(name: string) {
  const res = await fetch(`http://localhost:3000/api/dashboardProduct/${name}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductDetail({
  params,
}: {
  params: { name: string };
}) {
  const product: Product = await getProduct(params.name);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6 font-medium tracking-wide"
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
          <div className="relative w-96 h-96 rounded-xl overflow-hidden bg-gray-100 mx-auto group">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-110"
              priority
            />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-teal-600 tracking-wide">
                Rp {product.price?.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="border-t border-b py-8 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-wider uppercase">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap font-normal tracking-wide">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-wider uppercase">
                Usage
              </h2>
              <div className="overflow-hidden">
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap font-normal tracking-wide animate-marquee">
                  {product.usage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 