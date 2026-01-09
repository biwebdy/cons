"use client";
import Image from "next/image";
import BannerLogo from "../banner-elements/BannerLogo";
import { PUBLIC_LINKS } from "@/app/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = PUBLIC_LINKS;
  const pathname = usePathname();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActivePath = (path) => window.location.pathname === path;

  return (
    <div className="tailwind">
      <header className="fixed w-full bg-blue-brand z-30 py-2">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-yellow font-bold text-2xl">
            <BannerLogo color="yellow" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-4 list-none mb-0">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <div style={{ height: "30px" }}>
                    <Link
                      href={link?.path}
                      className={`a-yellow proxima ${
                        pathname === link?.path ? "text-yellow" : "text-white"
                      }`}
                    >
                      {link?.name}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <Menu
            className="md:hidden text-yellow-brand"
            size={20}
            onClick={toggleMenu}
          />

          <a href="/login" className="hidden md:block btn-prm px-8 py-3">
            Login
          </a>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="mt-3 pb-3">
              <ul className="flex flex-col gap-3 list-none">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.path}
                      className={`text-decoration-none ${
                        isActivePath(link.path) ? "text-yellow" : "text-white"
                      } proxima block`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/login"
                    className="btn-prm d-inline-block"
                    style={{ padding: "15px 30px" }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
