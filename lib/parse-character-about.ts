interface CharacterDetails {
  [key: string]: string;
}

interface ParsedCharacterAbout {
  details: CharacterDetails;
  description: string;
}

export function parseCharacterAbout(
  aboutText: string | null | undefined,
): ParsedCharacterAbout {
  if (!aboutText || aboutText.trim() === "") {
    return { details: {}, description: "No information available." };
  }

  const details: CharacterDetails = {};
  let description = "";

  // 1. แยกส่วน Details และ Description ออกจากกันโดยใช้ "บรรทัดว่าง" เป็นตัวคั่น
  //    /\n\s*\n/  หมายถึงการขึ้นบรรทัดใหม่ ตามด้วยช่องว่าง (ถ้ามี) และขึ้นบรรทัดใหม่อีกครั้ง
  const blocks = aboutText.split(/\n\s*\n/);

  // บล็อกแรกสุดคือส่วนของ Details
  const detailsBlock = blocks[0];

  // บล็อกที่เหลือทั้งหมดคือส่วนของ Description
  if (blocks.length > 1) {
    description = blocks.slice(1).join("\n\n"); // นำย่อหน้ากลับมาต่อกัน
  }

  // 2. ประมวลผลเฉพาะส่วน Details ทีละบรรทัด
  const lines = detailsBlock.split("\n").filter((line) => line.trim() !== ""); // เอาบรรทัดว่างออก

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i].trim();

    if (currentLine.includes(":")) {
      // กรณีที่ 1: "Key: Value" อยู่ในบรรทัดเดียวกัน
      const parts = currentLine.split(":");
      const key = parts[0].trim();
      const value = parts.slice(1).join(":").trim(); // เผื่อกรณีใน value มี :
      if (key && value) {
        details[key] = value;
      }
    } else {
      // กรณีที่ 2: "Key" อยู่บรรทัดนี้ และ "Value" อยู่บรรทัดถัดไป
      const nextLine = lines[i + 1] ? lines[i + 1].trim() : null;
      // ตรวจสอบว่าบรรทัดถัดไปไม่น่าจะเป็น Key ใหม่ (เช่น ไม่มี :)
      if (nextLine && !nextLine.includes(":")) {
        const key = currentLine;
        const value = nextLine;
        details[key] = value;
        i++; // **สำคัญมาก**: ข้ามบรรทัดถัดไปเพราะเราใช้ไปแล้ว
      }
    }
  }

  // 3. ทำความสะอาด Description ขั้นสุดท้าย
  description = description.replace(/\(Source: .*?\)/g, "").trim();

  return { details, description };
}
