// core/db/mongoDriver.ts

import net from 'net'
import { encodeDocument } from "./bson";


// 1. Build MongoDB client class
export class MongoDriver {
  private host: string;
  private port: number;
  private socket: net.Socket;

  constructor(host = "127.0.0.1", port = 27017) {
    this.host = host;
    this.port = port;
    this.socket = new net.Socket();
  }

  // 2. Connect to MongoDB server
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.connect(this.port, this.host, () => {
        console.log("✅ Connected to MongoDB server");
        resolve();
      });

      this.socket.on("error", (err) => {
        console.error("❌ Connection error:", err);
        reject(err);
      });
    });
  }

  // 3. Send a ping command to check connection
  async ping(): Promise<void> {
    // [1] Build a simple OP_MSG command for ping

    const pingCommand = Buffer.from([
      // Header (16 bytes)
      ...int32ToBytes(16 + 12 + 29), // messageLength
      ...int32ToBytes(1), // requestID
      ...int32ToBytes(0), // responseTo
      ...int32ToBytes(2013), // opCode = OP_MSG

      // Flag bits (4 bytes)
      ...int32ToBytes(0),

      // Section 0 payload type (1 byte) + BSON document
      0x00,
      // Minimal BSON: {ping:1, $db:"admin"}
      0x16,
      0x00,
      0x00,
      0x00, // document size = 22 bytes
      0x10, // int32 type
      ...stringToBytes("ping"),
      0x00,
      0x01,
      0x00,
      0x00,
      0x00, // ping:1
      0x02, // string type
      ...stringToBytes("$db"),
      0x00,
      0x06,
      0x00,
      0x00,
      0x00, // length = 6
      0x61,
      0x64,
      0x6d,
      0x69,
      0x6e,
      0x00, // "admin"
      0x00, // document null terminator
    ]);

    this.socket.write(pingCommand);
    console.log("📡 Sent ping command");
  }

  // InsertOne function
async insertOne(collection: string, document: any) {
  // [1] Build insert command BSON
  const insertCmd = {
    insert: collection,
    documents: [document],
    ordered: true,
    $db: "test",
  };

  const cmdBuf = encodeDocument(insertCmd as any);

  // [2] Build OP_MSG packet
  const headerSize = 16 + 4 + 1; // header + flags + payload type
  const totalSize = headerSize + cmdBuf.length;

  const packet = Buffer.alloc(totalSize);

  let offset = 0;
  packet.writeInt32LE(totalSize, offset);
  offset += 4;
  packet.writeInt32LE(1, offset);
  offset += 4;
  packet.writeInt32LE(0, offset);
  offset += 4;
  packet.writeInt32LE(2013, offset);
  offset += 4; // OP_MSG

  packet.writeInt32LE(0, offset);
  offset += 4; // flagBits
  packet.writeUInt8(0, offset);
  offset += 1; // payload type

  cmdBuf.copy(packet, offset);

  // [3] Send to MongoDB
  this.socket.write(packet);
  console.log("📡 Sent InsertOne command");
}

  // 4. Close connection
  close() {
    this.socket.end();
    console.log("🔌 Connection closed");
  }
}

// Helper: Convert int32 to little-endian bytes
function int32ToBytes(num: number): number[] {
  const buf = Buffer.alloc(4);
  buf.writeInt32LE(num, 0);
  return Array.from(buf);
}

// Helper: Convert string to UTF-8 bytes
function stringToBytes(str: string): number[] {
  return Array.from(Buffer.from(str, "utf-8"));
}
