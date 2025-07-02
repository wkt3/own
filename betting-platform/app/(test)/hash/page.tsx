"use client"
// pages/testhash.tsx

import { useEffect } from "react";
import { hashSHA256 } from "../../../core/crypto/hash";

export default function TestHash() {
  useEffect(() => {
    (async () => {
      const hashed = await hashSHA256("Rajaghenna123*#");
      console.log("Hashed Password:", hashed);
    })();
  }, []);

    return <div>Check console for hashed password
  </div>;
}
