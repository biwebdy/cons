"use client";

import { useRouter } from "next/navigation";
import { logoutAction } from "@/data/services/auth-service";
import { useState } from "react";

export default function LogoutIcon() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const result = await logoutAction();

      // Clear client-side storage
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
      }

      const baseUrl =
        process.env.NEXT_PUBLIC_FRONT_END_URL || window.location.origin;
      window.location.href = baseUrl;
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <a
      href="#"
      onClick={logout}
      style={{
        cursor: isLoading ? "wait" : "pointer",
        opacity: isLoading ? 0.7 : 1,
        pointerEvents: isLoading ? "none" : "auto",
      }}
    >
      <i
        className="flaticon-logout"
        style={{ margin: "10px", fontSize: "30px" }}
      />
    </a>
  );
}
