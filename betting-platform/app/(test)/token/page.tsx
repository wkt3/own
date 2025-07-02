"use client"
// pages/testtoken.tsx

import { useEffect } from "react";
import { generateToken, validateToken } from "../../../core/auth/token";

export default function TestToken() {
  useEffect(() => {
    const token = generateToken("user123", "mySecretKey", 1000 * 60 * 5); // 5 min expiry
    console.log("Generated Token:", token);

    const isValid = validateToken(token, "mySecretKey");
    console.log("Token Valid:", isValid);
  }, []);

  return <div>Check console for token generation and validation</div>;
}
