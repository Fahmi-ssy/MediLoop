"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [input, setInput] = useState({
    username: "",
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await res.json();

      if (!res.ok) {
        toast.error(response.message || "Registration failed!", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
      }

      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 1500,
        onClose: () => router.push("/login"),
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again later.", {
        position: "top-right",
      });
    }
  };
  return (
    <div className="font-[sans-serif] bg-gradient-to-r from-teal-200 to-teal-500 md:h-screen">
    <div className="font-[sans-serif] bg-white md:h-screen">
      <ToastContainer />
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4 bg-gray-50 h-full">
          <img
            src="https://img.freepik.com/free-vector/healthy-way-life-sport-monopod-selfie-park-exercise-run-active-athlete_1284-43696.jpg?t=st=1732731557~exp=1732735157~hmac=d7cb74b1b99bac76f9d4437b35c2c540b559595525717ac0bfe821d783dd9403&w=740"
            className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>
        <div className="flex items-center p-6 h-full w-full">
          <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-teal-500 md:text-3xl text-2xl font-extrabold max-md:text-center">
                Registration
              </h3>
            </div>
            <div>
              <label className="text-gray-800 text-xs block mb-2">
                Username
              </label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  className="w-full bg-transparent text-sm border-b border-gray-300 text-black focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter Username"
                  value={input.username}
                  onChange={handleChangeText}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 24 24"
                >
                  <circle cx={10} cy={7} r={6} data-original="#000000" />
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-6">
              <label className="text-gray-800 text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  className="w-full bg-transparent text-sm border-b border-gray-300 text-black focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter email"
                  value={input.email}
                  onChange={handleChangeText}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000" />
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit={10}
                      strokeWidth={40}
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    />
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="mt-6">
              <label className="text-gray-800 text-xs block mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  className="w-full bg-transparent text-sm border-b border-gray-300 text-black focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter password"
                  value={input.password}
                  onChange={handleChangeText}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full py-3 px-6 text-sm tracking-wider font-semibold rounded-md bg-slate-500 hover:bg-blue-700 text-white focus:outline-none"
              >
                Register
              </button>
              <p className="text-sm mt-6 text-gray-800">
                Already have an account?{" "}
                <Link
                  href={"/login"}
                  className="text-blue-500 font-semibold hover:underline ml-1"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
