// components/ui/Input.tsx

"use client";

import { useState } from "react";

interface InputProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

export default function Input({
  label,
  type = "text",
  name,
  placeholder,
  required,
}: InputProps) {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
}
