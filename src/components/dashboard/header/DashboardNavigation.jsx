"use client";
import { dasboardNavigation } from "@/data/dashboard";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Text } from "lucide-react";
export default function DashboardNavigation() {
  const [isActive, setActive] = useState(false);
  const path = usePathname();

  return (
    <>
      <div className="dashboard_navigationbar d-block d-lg-none">
        <div className="dropdown">
          <button onClick={() => setActive(!isActive)} className="dropbtn">
            <Text className="pr10" /> Dashboard Navigation
          </button>
          <ul className={`dropdown-content ${isActive ? "show" : ""}`}>
            {dasboardNavigation.map((item, i) => (
              <li
                className={
                  path == item.path ? "mobile-dasboard-menu-active" : ""
                }
                onClick={() => setActive(false)}
                key={i}
              >
                <Link href={item.path}>
                  <i className={`${item.icon} mr10`} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
