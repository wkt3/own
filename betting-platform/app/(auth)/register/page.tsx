// app/(auth)/register/page.tsx

"use client";

import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage("");

    const form = e.target as HTMLFormElement;
    const name = (form.name as unknown as HTMLInputElement).value;
    const email = (form.email as unknown as HTMLInputElement).value;
    const password = (form.password as unknown as HTMLInputElement).value;

    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = "Name is required";
    if (!email.includes("@")) newErrors.email = "Invalid email";
    if (password.length < 8) newErrors.password = "Minimum 8 characters";
    if (!acceptedTerms) newErrors.terms = "You must accept Terms & Conditions";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.status === "success") {
      setMessage("Registered successfully. Please login.");
      setShowLoginModal(true);
    } else {
      setMessage(data.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Header with logo */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/bowler.jpg"
            alt="Logo"
            width={80}
            height={80}
            className="mb-2"
          />
          <h1 className="text-3xl font-bold mb-1">Welcome</h1>
          <h2 className="text-md text-gray-600">Join Sensible Games</h2>
          <p className="italic mt-1">Play. Win. Repeat</p>
        </div>

        <form onSubmit={handleRegister}>
          <Input
            name="name"
            label="Name"
            placeholder="Your Name"
            required
            error={errors.name}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
            error={errors.email}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Strong password"
            required
            error={errors.password}
          />

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm">
              I accept the{" "}
              <Link href="/terms" className="text-blue-600 underline">
                Terms & Conditions
              </Link>
            </label>
          </div>
          {errors.terms && (
            <span className="text-red-500 text-xs mb-4 block">
              {errors.terms}
            </span>
          )}

          <Button
            type="submit"
            text={loading ? "Registering..." : "Register"}
          />
        </form>

        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}

        <div className="flex justify-center mt-6">
          <Link href="/login">
            <p>Already have Account <strong className="underline">Login</strong></p>
          </Link>
        </div>

        <Modal open={showLoginModal} onClose={() => setShowLoginModal(false)}>
          <h2 className="text-xl font-bold mb-4">Already Registered?</h2>
          <p className="mb-4">Please login to continue.</p>
          <Link href="/login">
            <Button text="Go to Login" />
          </Link>
        </Modal>
      </div>
    </div>
  );
}
