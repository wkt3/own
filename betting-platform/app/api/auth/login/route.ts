// app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import { loginUser } from "../../../../microservices/users/userService";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  try {
    const { user, token } = await loginUser(email, password);
    return NextResponse.json({
      status: "success",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err: unknown)  {
    const message =
      typeof err === "object" && err !== null && "message" in err
        ? (err as { message: string }).message
        : "An unknown error occurred";
    return NextResponse.json({ status: "error", message }, { status: 400 });
  }
}
