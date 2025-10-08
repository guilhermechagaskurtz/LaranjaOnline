"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";

interface HeaderProps {
  active?: string; // slug ou href da página ativa
}

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Sobre", href: "/sobre" },
  // { label: "Ajudantes", href: "/ajudantes" },
  { label: "Transparência", href: "/transparencia" },
  { label: "Contato", href: "/contato" },
];

export function Header({ active }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-orange-100">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-4">
        <h1 className="text-2xl font-work-sans font-bold text-orange-600">
          laranja
        </h1>

        {/* Desktop */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`hover:text-orange-600 transition ${
                active === item.href ? "text-orange-600 font-bold" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? (
                  <XIcon className="w-8 h-8" />
                ) : (
                  <MenuIcon className="w-8 h-8" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 right-0 mt-2">
              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  asChild
                  onClick={() => setMobileOpen(false)}
                >
                  <a
                    href={item.href}
                    className={`w-full ${
                      active === item.href ? "text-orange-600 font-bold" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
