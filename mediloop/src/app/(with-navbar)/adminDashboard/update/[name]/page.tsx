"use client"
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateProduct({ params }: { params: { name: string } }) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [usage, setUsage] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboardProduct/${params.name}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        if (data) {
          setProductName(data.name);
          setDescription(data.description);
          setUsage(data.usage);
          setPrice(data.price);
          setImage(data.image);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError("Failed to fetch product data");
      }
    };

    if (params.name) {
      fetchProductData();
    }
  }, [params.name]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productName || !description || !usage || !price || !image) {
      setError("All fields are required.");
      return;
    }

    const productData = {
      name: productName,
      description,
      usage,
      price,
      image,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboardProduct/${params.name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        toast.success("Product updated successfully!", {
          position: "top-right",
          autoClose: 1500,
        });
        setTimeout(() => {
          router.push("/adminDashboard");
        }, 1500);
      } else {
        toast.error("Failed to update product", {
          position: "top-right",
          autoClose: 1500,
        });
      }

    } catch (error) {
      toast.error("Failed to update product. Please try again", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  // Handle cancel (reset the form)
  const handleCancel = () => {
    setProductName("");
    setDescription("");
    setUsage("");
    setPrice(0);
    setImage("");
    setError(""); // Clear any error message
    router.push("/adminDashboard"); // Redirect to admin dashboard
    console.log("Form has been reset.");
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
        <div className="flex items-center">
          <h3 className="text-blue-600 text-xl font-bold flex-1">Update Product</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
            viewBox="0 0 320.591 320.591"
            onClick={handleCancel}
          >
            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
          </svg>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Name of the product</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Description</label>
            <textarea
              placeholder="Write about the product"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Usage</label>
            <input
              type="text"
              placeholder="Enter usage instructions"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Selling price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Product image URL</label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
            />
          </div>
          <div className="flex justify-end gap-4 !mt-8">
            <button
              type="button"
              className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
