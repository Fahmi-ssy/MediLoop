import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import LogOut from "./LogOut";

export default function Navbar() {
  const isLoggedIn = cookies().get("Authorization")?.value ? true : false;

  return (
    <header className="sticky top-0 flex border-b py-2 sm:px-8 px-6 font-[sans-serif] min-h-[60px] tracking-wide z-50 w-full bg-white">
      <Image
        src="/login_bg.jpg"
        alt="Background"
        fill
        priority
        className="object-cover absolute inset-0 -z-10 w-screen"
      />
      <div className="flex flex-wrap items-center justify-between w-full relative">
        <div className="flex-shrink-0">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/logoOnly.png"
              alt="MediLoop Logo"
              width={40}
              height={40}
              priority
              className="object-contain"
            />
            <Image
              src="/logoWord.png"
              alt="MediLoop"
              width={120}
              height={40}
              priority
              className="object-contain"
            />
          </a>
        </div>
        <div
          id="collapseMenu"
          className="flex-grow flex justify-center lg:!block max-lg:hidden max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              />
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              />
            </svg>
          </button>
          <ul className="lg:flex lg:gap-x-8 lg:items-center lg:justify-center max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <a href="javascript:void(0)">
                <img
                  src="https://readymadeui.com/readymadeui.svg"
                  alt="logo"
                  className="w-36"
                />
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <a
                href="/history"
                className="text-[#333] hover:text-[#007bff] text-xm block font-semibold"
              >
                History
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <a
                href="/about"
                className="text-[#333] hover:text-[#007bff] text-xm block font-semibold"
              >
                About Us
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <a
                href="/products"
                className="text-[#333] hover:text-[#007bff] text-xm block font-semibold"
              >
                Products
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-shrink-0">
          <div className="flex items-center space-x-8">
            {isLoggedIn ? (
              <LogOut />
            ) : (
              <Link
                href={"/login"}
                className="px-5 py-2 text-sm rounded-full font-bold text-white bg-sky-900 hover:bg-sky-950"
              >
                Sign In
              </Link>
            )}
            <button id="toggleOpen" className="lg:hidden">
              <svg
                className="w-7 h-7"
                fill="#333"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
