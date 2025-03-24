"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import Loading from "./loading";
import { Router } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    // Listen to route changes in Next.js
    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // Cleanup
    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer />
        {loading && <Loading />}
        {children}
      </body>
    </html>
  );
}
