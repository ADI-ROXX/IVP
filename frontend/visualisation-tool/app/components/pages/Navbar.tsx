"use client";
import React from "react";
import Link from "next/link";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar() {
  return (
    <nav
      className={`fixed ${roboto.className} top-4 inset-x-0 mx-auto max-w-2xl bg-white dark:bg-black shadow-md rounded-full border border-gray-300 dark:border-gray-700 px-5 py-5 flex justify-around space-x-2 text-xl font-bold z-50`}
    >
      <Link
        className="text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300 transition-colors"
        href="/"
      >
        Home
      </Link>
      <Link
        className="text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300 transition-colors"
        href="/learn"
      >
        Learn
      </Link>
      <Link
        className="text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300 transition-colors"
        href="/playground"
      >
        Playground
      </Link>
      <Link
        className="text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300 transition-colors"
        href="/about"
      >
        About
      </Link>
    </nav>
  );
}

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300 transition-colors"
    >
      {children}
    </Link>
  );
};
