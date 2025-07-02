// 1. Build SHA256 hashing from scratch using Web Crypto API (no third party)
// 2. Numbered comments added for future extensibility

export async function hashSHA256(input: string): Promise<string> {
  // [1] Encode the input string to Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  // [2] Perform SHA-256 hashing using SubtleCrypto
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // [3] Convert ArrayBuffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // [4] Return final hashed string
  return hashHex;
}
