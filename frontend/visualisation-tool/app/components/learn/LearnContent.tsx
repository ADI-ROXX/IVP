'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

type Algorithm = {
  name: string;
  description: string;
  useCases: string[];
  complexity: string;
  videoId: string;
  pseudocode: string;
  externalLinks: { title: string; url: string }[];
};

type LearnContentProps = {
  algorithms: Algorithm[];
};

export default function LearnContent({ algorithms }: LearnContentProps) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]);

  // Memoize the selected algorithm to prevent unnecessary re-renders
  const currentAlgorithm = useMemo(() => selectedAlgorithm, [selectedAlgorithm]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 max-w-6xl mx-auto mt-16 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold mb-8 text-center drop-shadow-[0_0_10px_rgba(147,51,234,0.5)] mt-24 sm:mt-32 lg:mt-40">
        Learn Machine Learning
      </h1>

      {/* Algorithm Dropdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <div className="relative w-full max-w-xs">
          <select
            value={currentAlgorithm.name}
            onChange={(e) => setSelectedAlgorithm(algorithms.find(alg => alg.name === e.target.value) || algorithms[0])}
            className="appearance-none w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-gray-700 transition-all duration-300 cursor-pointer"
          >
            {algorithms.map((alg) => (
              <option key={alg.name} value={alg.name}>{alg.name}</option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </motion.div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-300/30 shadow-[0_0_15px_rgba(147,51,234,0.2)]"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">{currentAlgorithm.name}</h2>
          <p className="text-gray-700 text-sm sm:text-base mb-6">{currentAlgorithm.description}</p>

          {/* Pseudocode Example */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Pseudocode</h3>
            <pre className="text-gray-700 text-xs sm:text-sm font-mono bg-gray-200/50 p-2 rounded">
              {currentAlgorithm.pseudocode}
            </pre>
          </div>
        </motion.div>

        {/* Quick Facts Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 text-white hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300"
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">Quick Facts</h3>
          <p className="text-gray-300 text-sm mb-2"><strong>Use Cases:</strong></p>
          <ul className="list-disc list-inside mb-4 text-gray-300 text-sm">
            {currentAlgorithm.useCases.map((useCase, index) => (
              <li key={index}>{useCase}</li>
            ))}
          </ul>
          <p className="text-gray-300 text-sm"><strong>Complexity:</strong> {currentAlgorithm.complexity}</p>
        </motion.div>
      </div>

      {/* Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-300/30 shadow-[0_0_15px_rgba(147,51,234,0.2)]"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">Watch a Tutorial</h2>
        <div className="relative" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${currentAlgorithm.videoId}?enablejsapi=1`}
            title={`${currentAlgorithm.name} Tutorial`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-300/30 shadow-[0_0_15px_rgba(147,51,234,0.2)] mb-10"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">External Resources</h2>
        <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base">
          {currentAlgorithm.externalLinks.map((link, index) => (
            <li key={index} className="mb-2">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
      
    </motion.div>
  );
}