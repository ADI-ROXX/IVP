// components/CodeBlocks.tsx
"use client";

import React from "react";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

interface CodeBlocksProps {
  position: string;
  heading: React.ReactNode;
  subheading: React.ReactNode;
  buttonLink: string;
  buttonText: string;
  codeblock: string;
  codeColor: string;
  reverse?: boolean; // New prop for reversing orientation
}

const CodeBlocks: React.FC<CodeBlocksProps> = ({
  position,
  heading,
  subheading,
  buttonLink,
  buttonText,
  codeblock,
  codeColor,
  reverse = false,
}) => {
  return (
    <Tilt
      tiltReverse={reverse} // Reverse tilt for one card
      glareEnable={true}
      glareMaxOpacity={0.3}
      glareColor="rgba(147, 51, 234, 0.5)" // Purple glare
      glarePosition="all"
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      className={`${position} w-full sm:w-11/12 md:w-3/4 mx-auto my-16 bg-gradient-to-br from-black/95 via-gray-900/90 to-purple-950/80 border border-purple-900/80 rounded-2xl shadow-[0_0_25px_rgba(147,51,234,0.4)] overflow-hidden`}
    >
      <div
        className={`flex ${reverse ? "flex-col lg:flex-row-reverse" : "flex-col lg:flex-row"} gap-8 p-6 sm:p-10`}
      >
        {/* Text Section */}
        <div className="lg:w-1/2 flex flex-col gap-6 text-gray-300">
          <div className={`${roboto.className} text-3xl sm:text-4xl font-bold text-purple-400 drop-shadow-[0_2px_4px_rgba(147,51,234,0.5)]`}>
            {heading}
          </div>
          <div className="text-lg sm:text-xl text-gray-400 leading-relaxed">
            {subheading}
          </div>
          <Link
            href={buttonLink}
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-800 to-purple-700 text-gray-200 font-semibold rounded-lg shadow-[0_0_10px_rgba(147,51,234,0.6)] hover:shadow-[0_0_20px_rgba(147,51,234,0.8)] transition-all duration-300 w-fit"
          >
            {buttonText}
          </Link>
        </div>

        {/* Code Section */}
        <div className="lg:w-1/2 relative bg-black/80 border border-purple-950/60 rounded-lg p-4 sm:p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-purple-900/10 opacity-60 rounded-lg blur-sm z-0" />
          <div className="flex">
            {/* Line Numbers */}
            <div className="w-[10%] flex flex-col text-center text-purple-600/80 font-mono text-sm sm:text-base">
              {[...Array(11)].map((_, i) => (
                <p key={i}>{i + 1}</p>
              ))}
            </div>
            {/* Code with Typing Animation */}
            <div className={`w-[90%] ${codeColor} font-mono text-sm sm:text-base pr-2 z-10`}>
              <TypeAnimation
                sequence={[codeblock, 2000, ""]}
                repeat={Infinity}
                cursor={true}
                style={{
                  whiteSpace: "pre-line",
                  display: "block",
                  textShadow: "0 0 5px rgba(147, 51, 234, 0.5)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default CodeBlocks;