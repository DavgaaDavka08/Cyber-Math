"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  role: "admin" | "student";
}

export function useAuth(requiredRole?: "admin" | "student") {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/");
      return;
    }

    const userData = JSON.parse(userStr) as User;

    if (requiredRole && userData.role !== requiredRole) {
      router.push("/");
      return;
    }

    setUser(userData);
    setLoading(false);
  }, [requiredRole, router]);

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return { user, loading, logout };
}
