"use client";
import { useEffect } from "react";
import { useQueryState } from "nuqs";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const [page] = useQueryState("page");
  const pathname = usePathname();

  useEffect(() => {
    // ปิด browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    // หน้า home: scroll เมื่อ pathname เปลี่ยน
    if (pathname === "/") {
      scrollToTop();
      setTimeout(scrollToTop, 10); // backup
    }
    // หน้าอื่น: scroll เมื่อ page เปลี่ยน
    else if (page !== null) {
      scrollToTop();
    }
  }, [pathname, page]);

  return null;
}
