"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { submitLoginAdmin } from "@/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function AdminLogin() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/adminLogin`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await res.json();

      if (!res.ok) {
        toast.error(response.message || "Admin login failed!", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
      }

      toast.success("Admin login successful!", {
        position: "top-right",
        autoClose: 1500,
      });
      await submitLoginAdmin();
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Unexpected error occurred!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        <Image
          src="/login_bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-xl relative z-10">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              <Image
                src="/logoOnly.png"
                alt="MediLoop Logo"
                width={50}
                height={50}
                priority
                className="object-contain"
              />
              <h2 className="text-4xl font-extrabold text-teal-950">
                Admin Portal
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-slate-600 font-semibold">Email</label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                className="w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-teal-600 border border-gray-300 focus:border-teal-500"
                placeholder="Admin Email"
                value={input.email}
                onChange={handleChangeText}
              />
            </div>
            <div>
              <label className="text-slate-600 font-semibold">Password</label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className="w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-teal-600 border border-gray-300 focus:border-teal-500"
                placeholder="Admin Password"
                value={input.password}
                onChange={handleChangeText}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-bold rounded text-white bg-teal-600 hover:bg-teal-700 focus:outline-none transition duration-300"
            >
              Admin Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-teal-600 hover:text-teal-800 text-sm font-semibold"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
