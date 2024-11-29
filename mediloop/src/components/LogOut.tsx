"use client"
import { handleLogout } from "@/actions";

export default function LogOut() {
    return (
      <button
        onClick={() => {
          handleLogout();
        }}
        className="px-5 py-2 text-sm rounded-full font-bold text-white bg-sky-900 hover:bg-sky-950"
      >
        Logout
      </button>
    );
  }
  