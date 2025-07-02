// app/(auth)/register/page.tsx

"use client";

import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setMessage(data.message || data.status);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister}>
        <Input name="name" label="Name" placeholder="Your Name" required />
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
          placeholder="Strong password"
          required
        />
        <Button type="submit" text={loading ? "Registering..." : "Register"} />
      </form>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
