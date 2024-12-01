"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const submitLogin = async () => {
  revalidatePath("/", "layout");
  redirect("/");
};

export const submitLoginAdmin = async () => {
  revalidatePath("/adminDashboard", "layout");
  redirect("/adminDashboard");
};

export const handleLogout = async () => {
  cookies().delete("Authorization");
  redirect("/");
};

