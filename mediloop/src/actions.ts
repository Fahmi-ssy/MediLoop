"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const submitLogin = async () => {
  revalidatePath("/", "layout");
  redirect("/");
};
