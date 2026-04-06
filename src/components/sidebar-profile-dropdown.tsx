"use client";

import { EllipsisVertical, LogOut } from "lucide-react";

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authClient } from "@/lib/auth-client";

const ProfileDropdown = ({ user }: { user: any }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-4 overflow-hidden rounded-lg hover:cursor-pointer hover:bg-sidebar-accent-foreground/40 transition-all duration-200 w-full">
          <img
            src={user.image || "/default-profile.jpg"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="text-[12px] font-medium truncate" title={user.name}>
              {user.name}
            </p>
            <p
              className="text-[12px] max-w-[95%] truncate leading-tight font-light"
              title={user.email}
            >
              {user.email}
            </p>
          </div>
          <EllipsisVertical className="ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        className="mb-2 bg-card text-card-foreground"
      >
        <DropdownMenuGroup>
          <div className="flex items-center gap-2 p-2 overflow-hidden">
            <img
              src={user.image || "/default-profile.jpg"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p
                className="text-[12px] font-medium truncate leading-tight"
                title={user.name}
              >
                {user.name}
              </p>
              <p
                className="text-[12px] max-w-[95%] truncate leading-tight font-light"
                title={user.email}
              >
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="size-4" />
          <span className="leading-none font-normal">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
