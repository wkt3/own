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
      className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 font-semibold transition duration-200"
    >
      {text}
    </button>
  );
}
