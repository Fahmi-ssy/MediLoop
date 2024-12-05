"use client";

import { Importer, ImporterField } from "react-csv-importer";
import "react-csv-importer/dist/index.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductCSVImporter() {
  const router = useRouter();

  const handleImport = async (rows: any[]) => {
    try {
      const products = rows.map((row) => ({
        name: row.name,
        price: parseFloat(row.price),
        description: row.description,
        usage: row.usage,
        image: row.image,
      }));

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bulkInsert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }),
      });

      if (!response.ok) {
        throw new Error("Failed to import products");
      }

      toast.success("Products imported successfully!", {
        position: "top-right",
        autoClose: 1500,
      });

      setTimeout(() => {
        window.location.href = "/adminDashboard";
      }, 1500);
    } catch (error) {
      toast.error("Failed to import products. Please try again", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/logoOnly.png"
              alt="MediLoop Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-teal-900 mb-4">
            Import Products
          </h2>
        </div>

        {/* Importer Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Importer
            assumeNoHeaders={false}
            restartable={true}
            onStart={() => {
              toast.info("Starting import...", {
                position: "top-right",
              });
            }}
            processChunk={async (rows) => {
              await handleImport(rows);
            }}
          >
            <ImporterField name="name" label="Product Name" />
            <ImporterField name="price" label="Price" />
            <ImporterField name="description" label="Description" />
            <ImporterField name="usage" label="Usage Instructions" />
            <ImporterField name="image" label="Image URL" />
          </Importer>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-teal-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-teal-900 mb-4">
            CSV File Requirements
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Include headers: name, price, description, usage, image
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Price should be a numeric value
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Image URLs must be valid and accessible
            </li>
          </ul>
        </div>
      </div>

      <style jsx global>{`
        .csv-importer {
          --ci-border-color: #e2e8f0;
          --ci-bg-color: #ffffff;
          --ci-accent-color: #0d9488;
          --ci-accent-hover-color: #0f766e;
          --ci-error-color: #ef4444;
          border-radius: 0.75rem;
          overflow: hidden;
        }
        .csv-importer button {
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .csv-importer button:hover {
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
