"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { submitLogin } from "@/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Login() {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      });

      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('userId', data.userId);
        await submitLogin()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred during login');
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        <Image
          // src="https://t4.ftcdn.net/jpg/03/64/46/53/360_F_364465371_WtFCtVXB2Yv6Dib2Co4ip2LKKZtDIa6e.jpg"
          src="/login_bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="grid md:grid-cols-3 items-center w-full h-screen relative z-10">
          {/* Left Column */}
          <div className="hidden md:flex md:col-span-1 flex-col tex justify-center p-8 h-full">
            <div className="max-w-md mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="/logoOnly.png"
                  alt="MediLoop Logo"
                  width={50}
                  height={50}
                  priority
                  className="object-contain"
                />
                <h2 className="lg:text-5xl text-7xl font-extrabold lg:leading-[55px] text-teal-950">
                  MediLoop
                </h2>
              </div>
              <p className="text-xm font-semibold mt-6 text-teal-800">
                Immerse yourself in a tech-based consultation journey of your
                body care. Send us your body symptoms, we will help you to
                choose the perfect product to overcome it and prevent the future
                condition you might face.
              </p>
              <h3 className="text-lg font-bold mt-4 text-teal-900">
                MediLoop, your bodycare companion.
              </h3>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 w-full h-full flex items-center justify-center p-8 bg-white bg-opacity-20">
            <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto">
              <div className="flex justify-center mb-8">
                <h3 className="text-teal-950 text-4xl font-extrabold mb-8 text-center flex items-center">
                  Sign In
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <a className="text-slate-600 font-semibold">Email</a>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                    placeholder="Email address"
                    value={input.email}
                    onChange={handleChangeText}
                  />
                </div>
                <div>
                  <a className="text-slate-600 font-semibold">Password</a>
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                    placeholder="Password"
                    value={input.password}
                    onChange={handleChangeText}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="text-teal-900 hover:text-teal-950 font-semibold"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </div>
              <div className="!mt-8 bg-teal-500">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm rounded text-teal-950 font-bold bg-teal-500 hover:bg-teal-700 text hover:text-white focus:outline-none"
                >
                  Login
                </button>
              </div>
              <div className="text-center mt-4 text-slate-700">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-teal-900 hover:text-teal-950 font-semibold"
                >
                  Register here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
