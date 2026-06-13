"use server";

import { destroySession } from "@/lib/admin/auth";
import { redirect } from "next/navigation";

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
