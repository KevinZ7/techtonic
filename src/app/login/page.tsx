"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);
    const { success } = await res.json();

    if (success) {
      const nextUrl = searchParams.get("next");
      // @see: https://github.com/vercel/next.js/discussions/44149
      router.push(nextUrl ?? "/");
      router.refresh();
    } else {
      // Make your shiny error handling with a great user experience
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
