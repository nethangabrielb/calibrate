"use client";

import { Activity, useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Icon from "@/components/sidebar-icon";
import { Button } from "@/components/ui/button";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Applications", href: "/applications" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(
    pathname === "/login" || pathname === "/sign-up" || pathname === "/"
      ? false
      : true,
  );

  useEffect(() => {
    // Hide sidebar on the login page
    if (pathname === "/login" || pathname === "/sign-up" || pathname === "/") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [pathname]);

  return (
    <Activity mode={isVisible ? "visible" : "hidden"}>
      <div className="lg:w-80 min-h-screen bg-primary text-sidebar-primary-foreground p-2 border-r border-sidebar-border">
        <div className="mb-6 px-4">
          <img
            src="/calibrate.svg"
            alt="Calibrate AI Logo"
            className="object-cover w-full dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <ul>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className=" py-3 px-4 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200 flex items-center gap-2 text-md font-medium rounded-lg"
            >
              <Icon name={link.name.toLowerCase()} />
              {link.name}
            </Link>
          ))}
        </ul>
        <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-sm font-medium rounded-lg w-full h-fit py-2! mt-6">
          Add Application
        </Button>
      </div>
    </Activity>
  );
};

export default Sidebar;
