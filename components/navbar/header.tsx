import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import DropdownMenuWithIcon from "./dropdown-menu";
import { auth } from "@/lib/auth";
import { MobileMenu } from "./mobile-menu";
import { headers } from "next/headers";

const menuItems = [
  { name: "Anime", href: "/anime" },
  { name: "Manga", href: "/manga" },
  { name: "Character", href: "/character" },
  { name: "Favorite", href: "/favorite" },
];

export const HeroHeader = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header>
      <nav
        className={cn(
          "bg-background/50 fixed z-98 w-full border-b backdrop-blur-3xl",
        )}
      >
        <div className="mx-auto max-w-[90rem] px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Logo Section */}
            <div className="flex items-center">
              <Logo />
            </div>

            <MobileMenu menuItems={menuItems} session={session} />

            <div className="hidden lg:flex lg:items-center lg:gap-8">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

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
        </div>
      </nav>
    </header>
  );
};
