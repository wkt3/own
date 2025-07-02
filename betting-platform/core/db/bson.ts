// core/db/bson.ts

export function encodeDocument(doc: Record<string, string | number>): Buffer {
  const buffers: Buffer[] = [];

  for (const key in doc) {
    const value = doc[key];

    if (typeof value === "string") {
      // [1] String type: 0x02
      const strBuf = Buffer.from(value, "utf8");
      const lenBuf = Buffer.alloc(4);
      lenBuf.writeInt32LE(strBuf.length + 1, 0);

      buffers.push(Buffer.from([0x02])); // type
      buffers.push(Buffer.from(key + "\0")); // key
      buffers.push(lenBuf); // length
      buffers.push(strBuf);
      buffers.push(Buffer.from([0x00])); // null terminator
    } else if (typeof value === "number") {
      // [2] Double type: 0x01
      const numBuf = Buffer.alloc(8);
      numBuf.writeDoubleLE(value, 0);

      buffers.push(Buffer.from([0x01])); // type
      buffers.push(Buffer.from(key + "\0")); // key
      buffers.push(numBuf);
    }
  }

  buffers.push(Buffer.from([0x00])); // document null terminator

  // Calculate total document size
  const size = buffers.reduce((acc, b) => acc + b.length, 4);
  const sizeBuf = Buffer.alloc(4);
  sizeBuf.writeInt32LE(size, 0);

  return Buffer.concat([sizeBuf, ...buffers]);
}
