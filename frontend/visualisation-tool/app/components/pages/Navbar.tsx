"use client";
import React from "react";
import Link from "next/link";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
interface NavProps {
  fixed: boolean;
}

export default function Navbar({ fixed = true }: NavProps) {
  return (
    <nav
      className={`${fixed ? "fixed" : "mt-5"} ${
        roboto.className
      } top-3 inset-x-0 mx-auto max-w-2xl   shadow-md rounded-full border border-gray-300 dark:border-gray-700 px-3 py-2 flex justify-around space-x-2 text-xl font-bold z-50`}
    >
      <Link
        className="text-white dark:text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
        href="/"
      >
        Home
      </Link>
      <Link
        className="text-white dark:text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
        href="/learn"
      >
        Learn
      </Link>
      <Link
        className="text-white dark:text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
        href="/playground"
      >
        Playground
      </Link>
      <Link
        className="text-white dark:text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
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
      className="text-white dark:text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
    >
      {children}
    </Link>
  );
};
