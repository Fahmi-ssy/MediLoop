"use client";
import { handleDeleteProduct } from "@/actions";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminCardProduct({ product }: { product: Product }) {
  const router = useRouter();

  const handleDelete = async (productName: string) => {
    const confirmDelete = new Promise<boolean>((resolve) => {
      const toastId = toast.warning(
        <>
          <div>Are you sure you want to delete this product?</div>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => {
                toast.dismiss(toastId);
                resolve(true);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded mr-2"
            >
              Yes
            </button>
            <button
              onClick={() => {
                toast.dismiss(toastId);
                resolve(false);
              }}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </>,
        {
          autoClose: false,
          closeOnClick: false,
          hideProgressBar: true,
          position: "bottom-right",
          onClose: () => resolve(false),
        }
      );
    });

    try {
      const shouldDelete = await confirmDelete;
      if (!shouldDelete) return;

      const res = await fetch(
        `http://localhost:3000/api/dashboardProduct/${productName}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Product deleted successfully!", {
          position: "bottom-right",
          autoClose: 1500,
        });
        await handleDeleteProduct()
      } else {
        toast.error("Failed to delete product", {
          position: "bottom-right",
          autoClose: 1500,
        });
      }
    } catch (error) {
      toast.error("Failed to delete product. Please try again", {
        position: "bottom-right",
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="group relative flex flex-col h-full">
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
        <div className="relative h-full">
          <Image
            width={500}
            height={500}
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
            <p className="text-sm text-white line-clamp-2">
              {product.description}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2 flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <span className="inline-flex items-center rounded-full bg-teal-50 px-2 py-1 text-xs font-medium text-teal-700">
            New
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">
            Rp {product.price?.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Link href={`/adminDashboard/${encodeURIComponent(product.name)}`}>
            <svg
              className="w-6 h-6 text-teal-600 hover:text-teal-700 transition-colors"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
              />
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Link>
          <Link
            href={`/adminDashboard/update/${encodeURIComponent(product.name)}`}
          >
            <svg
              className="w-6 h-6 text-blue-600 hover:text-blue-700 transition-colors"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              />
            </svg>
          </Link>
          <button onClick={() => handleDelete(product.name)}>
            <svg
              className="w-6 h-6 text-red-600 hover:text-red-700 transition-colors"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
