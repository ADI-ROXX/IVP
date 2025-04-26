// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/pages/Navbar";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
const teamMembers = [
  {
    id: 1,
    name: "Dr. Parimala Kancharla",
    role: "Faculty Advisor",
    image: "/parimala.jpg",
    linkedin: "https://www.linkedin.com/in/parimala-kancharla-a3876291/",
  },
  {
    id: 2,
    name: "Luv Sharma",
    role: "Web Dev Lead",
    image: "/Luv.jpg",
    github: "https://github.com/Stormbreakerr20",
    linkedin: "https://www.linkedin.com/in/luvsharmaa/",
    instagram: "",
  },
  {
    id: 3,
    name: "Saurabh Sonkar",
    role: "Web Dev",
    image: "/saurabh.jpg",
    github: "https://github.com/saurbh264",
    linkedin: "https://linkedin.com/in/saurabhsonkar",
    instagram: "https://instagram.com/saurabh_264",
  },
  {
    id: 4,
    name: "Abhijeet Kumar Jha",
    role: "Survey Expert",
    image: "/abhijeet.jpg",
    github: "https://github.com/ABHIJEETJHA0102",
    linkedin: "https://www.linkedin.com/in/abhi-abc/",
    instagram: "https://www.instagram.com/jha_abhijeet_0809",
  },
  {
    id: 5,
    name: "Dev Patel",
    role: "Survey Expert",
    image: "/dev.jpg",
    github: "https://github.com/dev484p",
    linkedin:
      "https://www.linkedin.com/in/dev-hp-484dd?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/_devp_4?igsh=eHVjazNvdWhxN2I2",
  },
  {
    id: 6,
    name: "Simroop Singh",
    role: "Survey Expert",
    image: "/simroop.jpg", // Random placeholder
    github: "https://github.com/DoItNowokay",
    linkedin:
      "https://www.linkedin.com/in/simroop-singh-56188125b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/simroopsingh?igsh=Z2FuczFkcDcwb3cw",
  },
  {
    id: 7,
    name: "Bilal Muhammad Khan",
    role: "Survey Expert",
    image: "/bilal.jpg",
    github: "https://github.com/Bilal22293",
    linkedin: "https://www.linkedin.com/in/bilal-muhammad-205a25278/",
    instagram: "https://www.instagram.com/khan_bilal154/?next=%2F&hl=en",
  },
  {
    id: 8,
    name: " Mehul Bhundiya",
    role: "Survey Expert",
    image: "/mehul.jpg",
    github: "https://github.com/MehulBhundiyaH",
    linkedin:
      "https://www.linkedin.com/in/mehul-bhundiya-741654268?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/mehul.bhundiya.86?igsh=MXU2bjRxZW1mYmw4NA==",
  },
  {
    id: 9,
    name: "Naman Singhania",
    role: "Survey Expert",
    image: "/naman.jpg",
    github: "https://github.com/naman-6420",
    linkedin: "https://www.linkedin.com/in/naman-singhania-3a7778250",
    instagram: "https://www.instagram.com/namansinghania47/",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-950 pt-28 px-8">
      <Navbar fixed={true} />
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-600/20 to-transparent"></div>

      {/* Main Content with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl mx-auto mb-16 text-center"
      >
        <h1 className="text-5xl md:text-6xl text-white font-bold mb-6 drop-shadow-[0_0_10px_rgba(147,51,234,0.5)] ">
          About ML Visualizer
        </h1>
        <p className="text-xl text-gray-200 leading-relaxed">
          Embark on a cosmic journey through the realms of Machine Learning! Our
          ISTP project transforms complex algorithms into mesmerizing visual
          symphonies. Witness the dance of neural networks and the orbits of
          decision trees in this interactive tech-art fusion.
        </p>
      </motion.div>

      {/* Team Cards with Animation */}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }} // Slight delay for staggered effect
        className="relative z-20 max-w-6xl mx-auto px-4"
      >
        {/* Faculty Advisor Card (Top, Centered) */}
        <h2 className="text-4xl font-semibold text-center mb-10 text-white">
          MENTOR
        </h2>
        <div className="flex flex-wrap justify-center mb-20">
          {teamMembers.slice(0, 1).map((member, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8 flex justify-center"
            >
              <div className="bg-none border border-white rounded-lg shadow-lg p-8 transition-all duration-800 hover:bg-gradient-to-r text-gray-400 from-purple-600 to-purple-400 hover:text-white cursor-pointer">
                <div className="w-40 h-40 bg-purple-200 p-2 rounded-full mx-auto mb-6 overflow-hidden transform hover:scale-110 transition-all duration-800">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl text-center font-semibold">
                  {member.name}
                </h3>
                <p className="uppercase text-center tracking-widest text-sm font-light">
                  {member.role}
                </p>
                <div className="flex justify-center mt-4 space-x-4">
                  {member.instagram && (
                    <a
                      href={`https://instagram.com/${member.instagram}`}
                      target="_blank"
                      className="text-xl hover:text-purple-200"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      className="text-xl hover:text-purple-200"
                    >
                      <FaLinkedin />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      className="text-xl hover:text-purple-200"
                    >
                      <FaGithub />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Team*/}
        <h2 className="text-4xl font-semibold text-center mb-20 text-white">
          CORE TEAM
        </h2>
        <div className="flex flex-wrap justify-center">
          {teamMembers.slice(1).map((member, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-16 flex justify-center"
            >
              <div className="bg-none border border-white rounded-lg shadow-lg p-8 transition-all duration-800 hover:bg-gradient-to-r text-gray-400 from-purple-600 to-purple-400 hover:text-white cursor-pointer">
                <div className="w-40 h-40 bg-purple-200 p-2 rounded-full mx-auto mb-6 overflow-hidden transform hover:scale-110 transition-all duration-800">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl text-center font-semibold">
                  {member.name}
                </h3>
                <p className="uppercase text-center tracking-widest text-sm font-light">
                  {member.role}
                </p>
                <div className="flex justify-center mt-4 space-x-4">
                  {member.instagram && (
                    <a
                      href={`https://instagram.com/${member.instagram}`}
                      target="_blank"
                      className="text-xl hover:text-purple-200"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      className="text-xl hover:text-purple-200"
                    >
                      <FaLinkedin />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      className="text-xl hover:text-purple-200"
                    >
                      <FaGithub />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3D Orbital Effect with Animation (Fixed Background) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }} // Slight delay for staggered effect
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 z-0 pointer-events-none"
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-600/80 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-600/80 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]"></div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-purple-600/80 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]"></div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 bg-purple-600/80 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]"></div>
        </motion.div>
      </motion.div>
      <footer className="w-full py-2 bg-black/80 border-t border-purple-950/50 text-gray-400 text-md text-center">
        Made with <span className="text-red-500">❤️</span> by Team 1 ISTP
      </footer>
    </div>
  );
}
