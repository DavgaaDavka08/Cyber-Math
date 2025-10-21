"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userName: string;
  role: "admin" | "student";
  onLogout: () => void;
}

export function Header({ userName, role, onLogout }: HeaderProps) {
  const roleLabels = { admin: "Админ", student: "Сурагч" };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/60 backdrop-blur-md supports-[backdrop-filter]:bg-white/45">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/https://framerusercontent.com/images/5eVQ1d28FOXKaONAvqi40TItn8.png"
            alt="TsonjinCyber"
            width={1000}
            height={1000}
            className="w-[100px]
             h-[100px]"
          />
          <div className="leading-tight">
            <div className="font-extrabold tracking-tight">
              <span className="mr-1">Tsonjin</span>
              <span className="text-cyan-600">Cyber</span>
              <span className="ml-2 text-xs align-super font-semibold px-2 py-0.5 rounded-full bg-yellow-300/90 text-black">
                Cyber Math
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Boarding</p>
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 rounded-full bg-yellow-200/80 text-xs text-black">
            {roleLabels[role]}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:block font-medium">{userName}</span>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Гарах
          </Button>
        </div>
      </div>
    </header>
  );
}
