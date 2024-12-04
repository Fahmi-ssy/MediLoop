"use client";

import { Importer, ImporterField } from "react-csv-importer";
import "react-csv-importer/dist/index.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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

      const response = await fetch("/api/bulkInsert", {
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
        // router.push('/adminDashboard');
        // router.refresh();
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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Import Products from CSV</h2>
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
  );
}
