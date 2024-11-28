"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Login() {
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
              Immerse yourself in a tech-based consultation journey of your body
              care. Send us your body symptoms, we will help you to choose the
              perfect product to overcome it and prevent the future condition
              you might face.
            </p>
            <h3 className="text-lg font-bold mt-4 text-teal-900">
              MediLoop, your bodycare companion.
            </h3>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="md:col-span-2 w-full h-full flex items-center justify-center p-8 bg-white bg-opacity-20">
          <form className="max-w-md w-full mx-auto">
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
                    href="jajvascript:void(0);"
                    className="text-teal-900 hover:text-teal-950 font-semibold"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>
            <div className="!mt-8 bg-teal-500">
              <button
                type="button"
                className="w-full shadow-xl py-2.5 px-4 text-sm rounded text-teal-950 font-bold bg-teal-500 hover:bg-teal-700 text hover:text-white focus:outline-none"
              >
                Login
              </button>
            </div>
            <div className="space-x-6 flex justify-center mt-8">
              {/* <button type="button" className="border-none outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    data-original="#fbbd00"
                  />
                  <path
                    fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    data-original="#0f9d58"
                  />
                  <path
                    fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    data-original="#31aa52"
                  />
                  <path
                    fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    data-original="#3c79e6"
                  />
                  <path
                    fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    data-original="#cf2d48"
                  />
                  <path
                    fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    data-original="#eb4132"
                  />
                </svg>
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
