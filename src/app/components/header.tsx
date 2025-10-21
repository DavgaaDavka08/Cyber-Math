"use client";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  userName: string;
  role: "admin" | "student";
  onLogout: () => void;
}

export function Header({ userName, role, onLogout }: HeaderProps) {
  const roleLabels = {
    admin: "Админ",
    student: "Сурагч",
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-semibold text-lg">{userName}</h2>
            <p className="text-sm text-muted-foreground">{roleLabels[role]}</p>
          </div>
        </div>
        <Button variant="outline" onClick={onLogout}>
          Гарах
        </Button>
      </div>
    </header>
  );
}
