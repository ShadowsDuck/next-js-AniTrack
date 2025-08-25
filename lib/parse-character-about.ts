interface Details {
  [key: string]: string;
}

interface ParsedAbout {
  details: Details;
  description: string;
}

export function parseAbout(aboutText: string | null | undefined): ParsedAbout {
  if (!aboutText || aboutText.trim() === "") {
    // ถ้าไม่มีข้อมูลเข้ามา ก็คืนค่าว่างไปเลย
    return { details: {}, description: "" };
  }

  const lines = aboutText.split("\n");
  const details: Details = {};
  let descriptionStartIndex = 0; // จุดเริ่มต้นของ Description (ตั้งต้นไว้ที่บรรทัดแรก)

  // วนลูปเพื่อหา "ส่วนของ Details" เท่านั้น
  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i].trim();

    // ข้ามบรรทัดที่ว่างเปล่าไป
    if (currentLine === "") {
      // ถ้าเจอรรทัดว่างระหว่างรายการ ให้ถือว่า details จบแล้ว
      if (Object.keys(details).length > 0) {
        descriptionStartIndex = i;
        break;
      }
      continue;
    }

    const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : null;

    // ตรวจสอบรูปแบบ "Key: Value"
    if (currentLine.includes(":")) {
      const parts = currentLine.split(":");
      const key = parts[0].trim();

      // ถ้า Key ยาวเกินไป แสดงว่าเป็นประโยคธรรมดา ไม่ใช่ Key -> หยุดค้นหา Details
      if (key.length > 30) {
        descriptionStartIndex = i;
        break;
      }
      const value = parts.slice(1).join(":").trim();
      details[key] = value;
      continue; // ไปยังบรรทัดถัดไป
    }

    // ตรวจสอบรูปแบบ "Key" แล้วตามด้วย "Value" ในบรรทัดถัดไป
    if (nextLine && nextLine !== "" && !nextLine.includes(":")) {
      const key = currentLine;

      // ถ้า Key ยาวเกินไป แสดงว่าเป็นประโยคธรรมดา -> หยุดค้นหา Details
      if (key.length > 30) {
        descriptionStartIndex = i;
        break;
      }
      const value = nextLine;
      details[key] = value;
      i++; // ข้ามบรรทัดของ value ไปด้วย
      continue; // ไปยังบรรทัดถัดไป
    }

    // **จุดสำคัญที่สุด**: ถ้าบรรทัดปัจจุบันไม่เข้าเงื่อนไขใดๆ เลย
    // แสดงว่าส่วนของ Details ได้จบลงแล้ว และบรรทัดนี้คือจุดเริ่มต้นของ Description
    descriptionStartIndex = i;
    break;
  }

  // หลังจากหาจุดเริ่มต้นของ Description ได้แล้ว ก็ทำการตัดและประกอบร่าง
  const description = lines
    .slice(descriptionStartIndex)
    .join("\n")
    .replace(/\(Source: .*?\)/g, "")
    .trim();

  return { details, description };
}
