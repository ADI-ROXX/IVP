// components/Navbar.tsx
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

const Navbar = ({ fixed = true }: NavProps) => {
  // Click effect handler
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    const ripple = document.createElement("span");
    const diameter = Math.max(link.clientWidth, link.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${
      e.clientX - link.getBoundingClientRect().left - radius
    }px`;
    ripple.style.top = `${
      e.clientY - link.getBoundingClientRect().top - radius
    }px`;
    ripple.classList.add("ripple");

    const existingRipple = link.getElementsByClassName("ripple")[0];
    if (existingRipple) existingRipple.remove();

    link.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <nav
      className={`${fixed ? "fixed" : "mt-5"} ${
        roboto.className
      } top-2 sm:top-4 inset-x-2 sm:inset-x-4 lg:inset-x-0 mx-auto w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] lg:max-w-2xl bg-black/80 backdrop-blur-md shadow-lg rounded-full border border-purple-900/50 px-3 sm:px-4 py-2 sm:py-3 lg:py-1 flex flex-wrap justify-around items-center text-base sm:text-lg lg:text-xl font-bold z-50 transition-all duration-300`}
    >
      <NavItem href="/" onClick={handleClick}>
        Home
      </NavItem>
      <NavItem href="/learn" onClick={handleClick}>
        Learn
      </NavItem>
      <NavItem href="/playground" onClick={handleClick}>
        Playground
      </NavItem>
      <NavItem href="/about" onClick={handleClick}>
        About
      </NavItem>
    </nav>
  );
};

const NavItem = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative text-gray-300 hover:text-purple-400 transition-colors px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full overflow-hidden hover:bg-purple-900/30"
    >
      {children}
      <span className="absolute inset-0 pointer-events-none bg-purple-700/10 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-full" />
    </Link>
  );
};

export default Navbar;
