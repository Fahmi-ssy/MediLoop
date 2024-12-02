import AdminCardProduct from "@/components/adminCardProduct";
import { Product } from "@/types";
import Link from "next/link";

export default function AdminProductPage({ products }: { products: Product[] }) {
  return (
    <div className="p-6">
      {/* Tambahkan Tombol Add Product di Pojok Kanan Atas */}
      <div className="flex justify-end mb-4">
        <Link href="/adminDashboard/addProduct">
          <button className="bg-green-600 text-white px-4 py-2 rounded shadow-md hover:bg-green-700 transition">
            Add Product
          </button>
        </Link>
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <AdminCardProduct key={product._id.toString()} product={product} />
        ))}
      </div>
    </div>
  );
}
