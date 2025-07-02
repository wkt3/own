// components/ui/Button.tsx

"use client";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function Button({
  text,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white rounded px-6 py-3 text-lg font-semibold transition duration-200 w-full"
    >
      {text}
    </button>
  );
}
