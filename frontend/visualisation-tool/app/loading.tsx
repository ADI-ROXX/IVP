"use client";
import { useEffect, useState } from "react";
import Player from "lottie-react";
import loadingAnimation from "@/public/loader.json";
import Navbar from "./components/pages/Navbar";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Set a timeout to hide the preloader after 2 seconds
    const timeout = setTimeout(() => setIsLoading(false), 2000);

    // Clean up timeouts on component unmount
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{
        background:
          "linear-gradient(to bottom right, #000000, #581c87, #111827)",
      }}
    >
      <Navbar fixed={true} />
      <div className="relative flex flex-col items-center justify-center">
        <Player
          autoplay
          loop
          animationData={loadingAnimation}
          style={{ height: "200px", width: "200px" }}
        />
      </div>
    </div>
  );
}
