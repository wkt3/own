// app/api/testdb/route.ts

import { NextResponse } from "next/server";
import { MongoDriver } from "../../../core/db/mongoDriver";

export async function GET() {
  const db = new MongoDriver("127.0.0.1", 27017);

  try {
    await db.connect();
    await db.ping();
    db.close();

    return NextResponse.json({
      status: "success",
      message: "DB connected and pinged",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: "error", message: "DB connection failed" },
      { status: 500 }
    );
  }
}
