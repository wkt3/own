// app/(auth)/login/page.tsx

"use client";

import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setMessage(data.message || data.status);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin}>
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Your password"
          required
        />
        <Button type="submit" text={loading ? "Logging in..." : "Login"} />
      </form>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
