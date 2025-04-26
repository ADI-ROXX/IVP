'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/pages/Navbar';
import LearnContent from '../components/learn/LearnContent';
import algorithmsData from '../components/learn/data/algorithms.json';

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-gray-900 text-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden will-change-transform">
        <div className="absolute w-[600px] h-[600px] bg-purple-950/15 rounded-full blur-3xl -top-32 -left-32 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-purple-900/15 rounded-full blur-3xl bottom-[-80px] right-[-80px] animate-pulse delay-700" />
      </div>

      {/* Navigation Bar */}
      <Navbar fixed = {true} />

      {/* Main Content */}
      <LearnContent algorithms={algorithmsData} />

      {/* Cosmic Orbital Effect (Background) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 z-0 pointer-events-none will-change-transform"
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)] bg-purple-600/80" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)] bg-purple-600/80" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)] bg-purple-600/80" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)] bg-purple-600/80" />
        </motion.div>  
      </motion.div>
      <footer className="w-full py-2 bg-black/80 border-t border-purple-950/50 text-gray-400 text-md text-center">
        Made with <span className="text-red-500">❤️</span> by Team 1 ISTP
        </footer>
    </div>
  );
}