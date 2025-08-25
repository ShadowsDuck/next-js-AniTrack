"use client";
import React from "react";
import Link from "next/link";
import { LogIn, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DropdownMenuWithIcon from "./dropdown-menu";
import { BetterSession } from "@/lib/auth";

interface MenuItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  menuItems: MenuItem[];
  session: BetterSession;
}

export function MobileMenu({ menuItems, session }: MobileMenuProps) {
  const [menuState, setMenuState] = React.useState<boolean>(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuState(!menuState)}
        aria-label={menuState ? "Close Menu" : "Open Menu"}
        className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
      >
        <Menu
          className={`m-auto size-6 transition-all duration-200 ${
            menuState
              ? "scale-0 rotate-180 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          }`}
        />
        <X
          className={`absolute inset-0 m-auto size-6 transition-all duration-200 ${
            menuState
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 -rotate-180 opacity-0"
          }`}
        />
      </button>

      {/* Mobile Menu Panel */}
      <div
        className={`bg-background mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 transition-all duration-300 md:flex-nowrap lg:hidden dark:shadow-none ${
          menuState ? "block" : "hidden"
        }`}
      >
        <div>
          <ul className="space-y-6 text-base">
            {menuItems.map((item: MenuItem, index: number) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-accent-foreground block duration-150"
                  onClick={() => setMenuState(false)} // ปิด menu เมื่อคลิกลิงก์
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
          {session ? (
            <DropdownMenuWithIcon session={session} />
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link
                href="/sign-in"
                className="flex flex-row items-center gap-2"
              >
                <LogIn strokeWidth={2.25} size={18} />
                <span>Sign In</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
