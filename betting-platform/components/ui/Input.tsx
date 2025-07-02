// components/ui/Input.tsx

"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export default function Input({
  label,
  type = "text",
  name,
  placeholder,
  required,
  error,
}: InputProps) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  const isPassword = type === "password";
  const displayType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="flex flex-col mb-4 relative">
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={displayType}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring focus:border-blue-500 ${
            error ? "border-red-500" : ""
          }`}
        />
        {isPassword && value && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-2 text-gray-600"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}
