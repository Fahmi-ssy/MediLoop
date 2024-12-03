import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function CardProduct({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="aspect-square w-full overflow-hidden rounded-t-xl bg-gray-100">
        <div className="relative h-full">
          <Image
            width={500}
            height={500}
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-xs sm:text-sm text-white line-clamp-2">{product.description}</p>
          </div>
        </div>
      </div>
      
      <div className="p-3 sm:p-4 space-y-2 flex-grow">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <span className="inline-flex items-center rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700">
            New
          </span>
        </div>
        
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm sm:text-base font-semibold text-gray-900">
            Rp {product.price?.toLocaleString("id-ID")}
          </p>
          <Link href={`/products/${product.name}`}>
            <button className="rounded-lg bg-teal-600 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-teal-700 transition-colors">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
