// app/api/testinsert/route.ts

import { NextResponse } from "next/server";
import { MongoDriver } from "../../../core/db/mongoDriver";

export async function GET() {
  const db = new MongoDriver("127.0.0.1", 27017);

  try {
    await db.connect();

    const user = {
      name: "UserTest",
      email: "test@example.com",
      balance: 1000,
    };

    await db.insertOne("users", user);

    db.close();

    return NextResponse.json({ status: "success", message: "User inserted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: "error", message: "Insert failed" },
      { status: 500 }
    );
  }
}
