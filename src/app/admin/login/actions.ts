"use server";

import { verifyPassword, createSession } from "@/lib/admin/auth";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const password = formData.get("password") as string;

  if (!verifyPassword(password)) {
    throw new Error("Invalid password");
  }

  await createSession();
  redirect("/admin");
}
