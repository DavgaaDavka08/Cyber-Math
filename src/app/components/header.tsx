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
    <header className="bg-gradient-to-r from-purple-100 to-purple-50 border-b-4 border-purple-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
            <span className="text-white font-bold text-lg">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="font-bold text-lg text-purple-900">{userName}</h2>
            <p className="text-sm text-purple-600">{roleLabels[role]}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center border-3 border-white shadow-md">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <Button
            variant="outline"
            onClick={onLogout}
            className="rounded-full border-2 border-purple-300 hover:bg-purple-100 font-semibold bg-transparent"
          >
            Гарах
          </Button>
        </div>
      </div>
    </header>
  );
}
