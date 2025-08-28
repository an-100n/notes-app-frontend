import type { LoginRequest } from "../types";
import { saveToken } from "./auth";

const BASE_URL:string = import.meta.env.VITE_API_BASE_URL;

export async function loginUser(data: LoginRequest): Promise<void> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Invalid email or password");

  // look for Authorization header
  const authHeader = res.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Token not found in response");
  }

  const token = authHeader.substring("Bearer ".length);
  saveToken(token);
}