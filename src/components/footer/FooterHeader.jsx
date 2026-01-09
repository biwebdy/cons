"use client";

import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

const links = [
  { id: 1, name: "Terms of Service", path: "/terms" },
  { id: 2, name: "Privacy Policy", path: "/privacy" },
];

export default function FooterHeader() {
  return (
    <footer className="tailwind">
      <div className="bg-yellow-brand w-full py-4">
        <div className="container mx-auto px-4 ">
          {/* Logo and Tagline */}
          <div className="grid grid-cols-8">
            <div className="col-span-8 lg:col-span-2">
              <Image
                src="/images/logos/logo-blue.svg"
                alt="Expertree Logo"
                className="mr-2"
                width={220}
                height={60}
              />
              <p className="text-blue-brand text-md mt-1 ">
                Connecting life science companies with specialized consultants
                to accelerate innovation and success.
              </p>
            </div>

            <div className="hidden lg:block lg:col-span-1"></div>
            <div className="col-span-4 lg:col-span-1">
              <div>
                <ul className="text-center">
                  <h4 className="font-bold text-center text-blue-brand">
                    For you
                  </h4>
                  <li>
                    <a
                      href="/register-client"
                      className="text-sm text-blue-brand  hover:underline"
                    >
                      For Companies
                    </a>
                  </li>
                  <li>
                    <a
                      href="/register"
                      className="text-sm text-blue-brand hover:underline"
                    >
                      For Consultants
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-span-4 lg:col-span-1">
              <div>
                <ul className="text-center">
                  <h4 className="font-bold text-center text-blue-brand">
                    Pages
                  </h4>
                  <li>
                    <a
                      href="/terms"
                      className="text-sm text-blue-brand  hover:underline"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacy"
                      className="text-sm text-blue-brand hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-span-8 lg:col-span-2">
              <div>
                <ul className="text-center">
                  <h4 className="font-bold text-center text-blue-brand">
                    Contact Us
                  </h4>
                  <li>
                    <a className="text-sm text-blue-brand  ">
                      Grand Rue 43c 1432 Belmont-sur-Yverdon, Vaud, Switzerland
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+41763252836"
                      className="text-sm text-blue-brand hover:underline"
                    >
                      +(41) 76 325 28 36
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:info@expertree.com"
                      className="text-sm text-blue-brand hover:underline"
                    >
                      info@expertree.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-span-8 lg:col-span-1">
              <h4 className="font-bold text-center text-blue-brand">
                Follow us
              </h4>
              <div className="flex justify-center space-x-2 mt-1">
                <a
                  href="https://www.linkedin.com/company/lifesciconsulting"
                  className=" p-1 rounded"
                >
                  <Linkedin size={16} className="text-blue-brand" />
                </a>
                <a
                  href="https://www.instagram.com/lifesci.consulting/"
                  className="p-1 rounded"
                >
                  <Instagram size={16} className="text-blue-brand" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
