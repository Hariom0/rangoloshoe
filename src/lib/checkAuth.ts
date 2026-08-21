// lib/auth.ts
import { auth } from "@/auth";

export async function requireAuth() {
  return await auth();
}

export function unauthorizedResponse() {
  return Response.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}