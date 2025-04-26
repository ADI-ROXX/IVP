"use client";
import { useState, useEffect, useRef } from 'react';
import Player from "lottie-react";
import loadingAnimation from "@/public/loader.json";

const DL = () => {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative w-full h-screen">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70">
          <div className="relative flex flex-col items-center justify-center">
            <Player
              autoplay
              loop
              animationData={loadingAnimation}
              style={{ height: "200px", width: "200px" }}
            />
          </div>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src="/index.html" // Served from public directory
        style={{ width: '100%', height: '100vh', border: 'none' }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default DL;