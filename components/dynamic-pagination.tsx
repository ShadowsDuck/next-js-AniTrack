"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DynamicPaginationProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export function DynamicPagination({
  page,
  totalPages,
  setPage,
}: DynamicPaginationProps) {
  // ใช้ useMemo เพื่อคำนวณเลขหน้าเฉพาะเมื่อ page หรือ totalPages เปลี่ยนแปลง
  // ช่วยเพิ่มประสิทธิภาพเล็กน้อยโดยไม่ต้องคำนวณใหม่ทุกครั้งที่ re-render
  const pageNumbers = React.useMemo(() => {
    const pages: (number | string)[] = [];

    // กรณีที่ 1: ถ้าจำนวนหน้าทั้งหมดน้อยหรือเท่ากับ 4 ให้แสดงทุกหน้า
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // กรณีที่ 2: อยู่ช่วงหน้าแรกๆ (หน้า 1-3)
    // ผลลัพธ์: 1 2 3 4 ... [totalPages]
    if (page <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    // กรณีที่ 3: อยู่ช่วงหน้าท้ายๆ (3 หน้าสุดท้าย)
    // ผลลัพธ์: 1 ... [totalPages-3] [totalPages-2] [totalPages-1] [totalPages]
    if (page >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // กรณีที่ 4: อยู่ช่วงกลางๆ
    // ผลลัพธ์: 1 ... [page-1] [page] [page+1] ... [totalPages]
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  }, [page, totalPages]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // ถ้ามีแค่หน้าเดียว ไม่ต้องแสดง Pagination
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePreviousPage();
            }}
            aria-disabled={page <= 1}
            tabIndex={page <= 1 ? -1 : undefined}
            className={
              page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers.map((p, index) => (
          <PaginationItem key={`${p}-${index}`}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(p as number);
                }}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNextPage();
            }}
            aria-disabled={page >= totalPages}
            tabIndex={page >= totalPages ? -1 : undefined}
            className={
              page >= totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
