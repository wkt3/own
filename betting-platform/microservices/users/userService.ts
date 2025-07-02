// microservices/user/userService.ts

import { hashSHA256 } from "../../core/crypto/hash";
import {
  isValidEmail,
  isStrongPassword,
  isValidUsername,
} from "../../core/validator";
import { generateToken } from "../../core/auth/token";

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

const users: User[] = []; // TEMP in-memory store until full DB driver CRUD is ready

// 1. Register User
export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  if (!isValidEmail(email)) throw new Error("Invalid email");
  if (!isStrongPassword(password)) throw new Error("Weak password");
  if (!isValidUsername(name)) throw new Error("Invalid username");

  const existing = users.find((u) => u.email === email);
  if (existing) throw new Error("Email already registered");

  const passwordHash = await hashSHA256(password);

  const user: User = {
    id: (users.length + 1).toString(),
    name,
    email,
    passwordHash,
  };

  users.push(user);

  // Generate token for session
  const token = generateToken(user.id, "mySecretKey", 1000 * 60 * 60 * 24); // 1 day expiry

  return { user, token };
}

// 2. Login User
export async function loginUser(email: string, password: string) {
  const user = users.find((u) => u.email === email);
  if (!user) throw new Error("Invalid credentials");

  const passwordHash = await hashSHA256(password);
  if (user.passwordHash !== passwordHash)
    throw new Error("Invalid credentials");

  const token = generateToken(user.id, "mySecretKey", 1000 * 60 * 60 * 24); // 1 day expiry

  return { user, token };
}
