"use client"
// pages/testvalidator.tsx

import { useEffect } from "react";
import {
  isValidEmail,
  isStrongPassword,
  isValidUsername,
  sanitizeInput,
} from "../../../core/validator";

export default function TestValidator() {
  useEffect(() => {
    console.log("✅ Email Valid:", isValidEmail("test@example.com"));
    console.log("✅ Strong Password:", isStrongPassword("StrongPass1!"));
    console.log("✅ Valid Username:", isValidUsername("User123"));
    console.log(
      "✅ Sanitized Input:",
      sanitizeInput('<script>alert("XSS")</script>')
    );
  }, []);

  return <div>Check console for validator tests</div>;
}
