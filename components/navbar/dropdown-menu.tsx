import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Image from "next/image";
import { SignOutButton } from "./sign-out-button";
import { BetterSession } from "@/lib/auth";

type Props = {
  session: BetterSession;
};

export default function DropdownMenuWithIcon({ session }: Props) {
  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        {session.user.image !== null ? (
          <Avatar>
            <AvatarFallback>
              <Image
                src={session.user.image || "https://github.com/shadcn.png"}
                alt={session.user.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            </AvatarFallback>
          </Avatar>
        ) : (
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-99">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <Image
              src={session.user.image || "https://github.com/shadcn.png"}
              alt={session.user.name}
              width={30}
              height={30}
              className="rounded-full"
            />

            <div>
              <p className="text-sm font-medium">{session.user.name}</p>
              <p className="text-muted-foreground text-xs">
                {session.user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="h-4 w-4" /> Profile
        </DropdownMenuItem>
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
