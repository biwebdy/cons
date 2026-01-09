"use client";
import { logoutAction } from "@/data/services/auth-service";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navlist(props) {
  const { links } = props;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const logout = async () => {
    await logoutAction();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="tailwind " ref={navRef}>
      <div className="relative w-[200px] md:w-[250px]">
        <div
          className="lg:hidden flex items-center text-white cursor-pointer absolute mb-3 w-[250px] -top-[50px] -right-[150px]"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
          <span style={{ marginLeft: "10px", color: "#fff" }}>Menu</span>
        </div>

        {/* Navigation and logout */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } lg:block z-100 bg-blue-brand p-6 pt-0 -ml-12`}
        >
          {links?.map((link, i) => (
            <div key={i}>
              <div style={{ height: "30px" }}>
                <Link
                  href={link?.path}
                  className={`a-yellow proxima text-xs md:text-base ${
                    pathname === link?.path ? "text-yellow" : "text-white"
                  }`}
                >
                  {link?.name}
                </Link>

                <hr style={{ margin: "8px 0px" }} />
              </div>
              <br />
            </div>
          ))}

          {/* Mobile logout - shown only on mobile */}
          <div className="">
            <div style={{ height: "30px" }}>
              <a
                onClick={logout}
                className="a-yellow proxima text-xs md:text-base text-white cursor-pointer flex items-center"
              >
                <LogOut size={18} className="text-white mr-2" />
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
