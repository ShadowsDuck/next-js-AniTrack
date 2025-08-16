"use client";
import { useEffect } from "react";
import { useQueryState } from "nuqs";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const [page] = useQueryState("page");
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // ถ้า useEffect นี้ทำงาน แสดงว่า pathname หรือ page มีการเปลี่ยนแปลง
    // ซึ่งเป็นสิ่งที่เราต้องการให้เลื่อนขึ้นบนอยู่แล้ว
    window.scrollTo(0, 0);
  }, [pathname, page]); // Dependency array นี้ถูกต้องและครอบคลุมทุกกรณี

  return null;
}
