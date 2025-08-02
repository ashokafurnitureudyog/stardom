"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="relative">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="relative w-12 h-12 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-500 ease-in-out border border-transparent hover:border-primary/20"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 ease-in-out dark:-rotate-90 dark:scale-0 hover:rotate-90" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100 hover:rotate-12" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Theme Options"
          className="bg-background/95 backdrop-blur-md w-56 p-2 border border-primary/20 rounded-xl shadow-lg shadow-primary/5"
        >
          <DropdownItem
            key="light"
            className="group flex items-center gap-3 p-2.5 text-sm font-medium tracking-wide cursor-pointer transition-all duration-300 hover:bg-primary/10 hover:text-primary rounded-lg data-[hover=true]:bg-primary/10"
            onClick={() => setTheme("light")}
          >
            <Sun className="h-4 w-4 opacity-80 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-serif">Luminous Mode</span>
          </DropdownItem>
          <DropdownItem
            key="dark"
            className="group flex items-center gap-3 p-2.5 text-sm font-medium tracking-wide cursor-pointer transition-all duration-300 hover:bg-primary/10 hover:text-primary rounded-lg data-[hover=true]:bg-primary/10"
            onClick={() => setTheme("dark")}
          >
            <Moon className="h-4 w-4 opacity-80 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-serif">Twilight Mode</span>
          </DropdownItem>
          <DropdownItem
            key="system"
            className="group flex items-center gap-3 p-2.5 text-sm font-medium tracking-wide cursor-pointer transition-all duration-300 hover:bg-primary/10 hover:text-primary rounded-lg data-[hover=true]:bg-primary/10"
            onClick={() => setTheme("system")}
          >
            <svg
              className="h-4 w-4 opacity-80 group-hover:rotate-12 transition-transform duration-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
              />
            </svg>
            <span className="font-serif">System Preference</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
