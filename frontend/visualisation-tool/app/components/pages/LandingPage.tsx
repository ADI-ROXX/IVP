'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Navbar from './Navbar';
import CodeBlocks from '../ui/codeblocks';
import Link from 'next/link';

const LandingPage = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  const learnCode = `def forward_propagation(X, weights, bias):
    # Input layer to hidden layer
    hidden = sigmoid(np.dot(X, weights[0]) + bias[0])
    # Hidden layer to output
    output = sigmoid(np.dot(hidden, weights[1]) + bias[1])
    return output`;

  const playgroundCode = `class NeuralNetwork:
    def __init__(self, layers):
        self.weights = [np.random.randn(i, j) 
                       for i, j in zip(layers[:-1], layers[1:])]
    def train(self, X, y, epochs):
        for _ in range(epochs):
            output = self.forward(X)
            error = y - output
            self.backward(error)`;

  // Three.js setup for Neural Network with Forward & Backward Propagation
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const size = 600;
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Neural Network Layers (3 layers: input, hidden, output)
    const layerCount = 3;
    const nodesPerLayer = 5;
    const layerSpacing = 3;
    const nodeRadius = 0.15;
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];

    // Create nodes with brighter material
    for (let layer = 0; layer < layerCount; layer++) {
      for (let node = 0; node < nodesPerLayer; node++) {
        const geometry = new THREE.SphereGeometry(nodeRadius, 16, 16);
        const material = new THREE.MeshPhongMaterial({
          color: 0x8b5cf6, // Brighter purple for visibility
          emissive: 0x6d28d9, // Glow effect
          emissiveIntensity: 0.5,
          shininess: 120,
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
          layer * layerSpacing - (layerCount - 1) * layerSpacing * 0.5,
          (node - (nodesPerLayer - 1) / 2) * 1.2,
          0
        );
        scene.add(sphere);
        nodes.push(sphere);
      }
    }

    // Create connections
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0xc084fc, // Lighter purple for connections
      transparent: true,
      opacity: 0.3,
    });
    for (let layer = 0; layer < layerCount - 1; layer++) {
      for (let i = 0; i < nodesPerLayer; i++) {
        for (let j = 0; j < nodesPerLayer; j++) {
          const startNode = nodes[layer * nodesPerLayer + i];
          const endNode = nodes[(layer + 1) * nodesPerLayer + j];
          const geometry = new THREE.BufferGeometry().setFromPoints([
            startNode.position,
            endNode.position,
          ]);
          const line = new THREE.Line(geometry, connectionMaterial);
          scene.add(line);
          connections.push(line);
        }
      }
    }

    // Forward Propagation Particles
    const particleCount = 20;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = -(layerCount - 1) * layerSpacing * 0.5 - 1;
      positions[i3 + 1] = (Math.random() - 0.5) * 6;
      positions[i3 + 2] = 0;
      velocities[i3] = 0.06 + Math.random() * 0.03;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;
      colors[i3] = 1.0; // R
      colors[i3 + 1] = 0.6; // G (bright purple)
      colors[i3 + 2] = 1.0; // B
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const forwardParticles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(forwardParticles);

    // Backward Propagation Particles
    const backParticlesGeometry = new THREE.BufferGeometry();
    const backPositions = new Float32Array(particleCount * 3);
    const backVelocities = new Float32Array(particleCount * 3);
    const backColors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      backPositions[i3] = (layerCount - 1) * layerSpacing * 0.5 + 1;
      backPositions[i3 + 1] = (Math.random() - 0.5) * 6;
      backPositions[i3 + 2] = 0;
      backVelocities[i3] = -(0.06 + Math.random() * 0.03); // Move left
      backVelocities[i3 + 1] = 0;
      backVelocities[i3 + 2] = 0;
      backColors[i3] = 0.8; // R
      backColors[i3 + 1] = 0.4; // G (darker purple for backprop)
      backColors[i3 + 2] = 1.0; // B
    }
    backParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(backPositions, 3));
    backParticlesGeometry.setAttribute('color', new THREE.BufferAttribute(backColors, 3));
    const backParticlesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const backParticles = new THREE.Points(backParticlesGeometry, backParticlesMaterial);
    scene.add(backParticles);

    // Lighting
    const light = new THREE.PointLight(0xe9d5ff, 1.5, 100); // Softer purple light
    light.position.set(5, 5, 5);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0x1e1b4b, 0.4);
    scene.add(ambientLight);

    // Camera position
    camera.position.z = 8;

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Node pulsing and backprop lighting
      nodes.forEach((node, index) => {
        const layer = Math.floor(index / nodesPerLayer);
        const scale = 1 + Math.sin(time + index * 0.5) * 0.1;
        node.scale.set(scale, scale, scale);

        // Light up nodes during backprop
        const material = node.material as THREE.MeshPhongMaterial;
        const backPos = backParticles.geometry.attributes.position.array as Float32Array;
        material.emissiveIntensity = 0.5; // Default
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          if (
            Math.abs(backPos[i3] - node.position.x) < 0.5 &&
            Math.abs(backPos[i3 + 1] - node.position.y) < 0.5
          ) {
            material.emissiveIntensity = 1.5; // Brighten when backprop particle is near
            break;
          }
        }
      });

      // Forward propagation
      const forwardPositions = forwardParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        forwardPositions[i3] += velocities[i3];
        if (forwardPositions[i3] > (layerCount - 1) * layerSpacing * 0.5 + 1) {
          forwardPositions[i3] = -(layerCount - 1) * layerSpacing * 0.5 - 1;
          forwardPositions[i3 + 1] = (Math.random() - 0.5) * 6;
        }
      }
      forwardParticles.geometry.attributes.position.needsUpdate = true;

      // Backward propagation
      const backPositions = backParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        backPositions[i3] += backVelocities[i3];
        if (backPositions[i3] < -(layerCount - 1) * layerSpacing * 0.5 - 1) {
          backPositions[i3] = (layerCount - 1) * layerSpacing * 0.5 + 1;
          backPositions[i3 + 1] = (Math.random() - 0.5) * 6;
        }
      }
      backParticles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      nodes.forEach(node => {
        node.geometry.dispose();
        (node.material as THREE.Material).dispose();
      });
      connections.forEach(line => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      forwardParticles.geometry.dispose();
      particlesMaterial.dispose();
      backParticles.geometry.dispose();
      backParticlesMaterial.dispose();
    };
  }, []);

  // Framer Motion variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-gray-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[700px] h-[700px] bg-purple-950/15 rounded-full blur-3xl -top-40 -left-40 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-3xl bottom-[-100px] right-[-100px] animate-pulse delay-700" />
      </div>

      {/* Main Content */}
      <Navbar></Navbar>
      <div className="relative container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 ">
          {/* Left Section - Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <motion.h1
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-7xl font-bold tracking-tight"
            >
              Train the <span className="text-purple-600">Core</span> of ML
            </motion.h1>
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-xl md:text-2xl text-gray-400"
            >
              "Watch Learning Ignite"
            </motion.p>
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <p className="text-lg text-gray-300">
                Experience Machine Learning in action—forward passes spark, backward updates glow.
                This neural dance is your gateway to the future.
              </p>
              <p className="text-lg font-semibold text-purple-500">
                "Propagate the Power"
              </p>
              <button className="px-6 py-3 bg-purple-800 hover:bg-purple-700 rounded-full text-lg font-semibold shadow-xl transition-all">
                Start Training
              </button>
            </motion.div>
          </div>

          {/* Right Section - 3D Model */}
          <motion.div
            variants={floatVariants}
            animate="animate"
            className="lg:w-1/2 relative"
          >
            <div className="w-full max-w-[600px] aspect-square relative">
              <div className="absolute inset-0 bg-purple-950/20 rounded-full blur-2xl"></div>
              <div ref={mountRef} className="relative z-10" />
            </div>
            <motion.div
              className="absolute w-10 h-10 bg-purple-600 rounded-full blur-md"
              animate={{ rotate: 360, scale: [1, 1.3, 1] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              style={{ top: '8%', left: '8%' }}
            />
            <motion.div
              className="absolute w-6 h-6 bg-purple-800 rounded-full blur-md"
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2.8, repeat: Infinity }}
              style={{ bottom: '12%', right: '12%' }}
            />
          </motion.div>
        </div>

        {/* Bottom Tagline */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-2xl font-light tracking-wider text-purple-400">
            "Forward to Learn, Backward to Master" - Your ML Cycle Begins
          </p>
        </motion.div>
      </div>

      {/* First CodeBlock - Learn */}
      <CodeBlocks
        position="relative"
        heading={<>Decode <span className="text-purple-300">Neural Magic</span></>}
        subheading={<>Unravel the secrets of ML with electrifying insights.</>}
        buttonLink="/learn"
        buttonText="Enter the Void"
        codeblock={learnCode}
        codeColor="text-purple-300"
        reverse={false}
      />

      {/* Second CodeBlock - Playground */}
      <CodeBlocks
        position="relative"
        heading={<>Forge Your <span className="text-purple-300">ML Beast</span></>}
        subheading={<>Tweak, train, and unleash neural networks live.</>}
        buttonLink="/playground"
        buttonText="Unleash Now"
        codeblock={playgroundCode}
        codeColor="text-purple-400"
        reverse={true}
      />



      <section className="relative w-full mx-auto my-12 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-300 tracking-wide drop-shadow-[0_2px_4px_rgba(147,51,234,0.7)] mb-10 sm:mb-16">
          Why Dive into <span className="text-purple-400">ML</span>?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full sm:w-11/12 md:w-10/12 lg:w-3/4 mx-auto">
          {/* Card 1 */}
          <div className="relative bg-gradient-to-br from-black/90 to-gray-900/80 border border-purple-950/70 rounded-lg p-5 sm:p-6 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-700 to-transparent rounded-t-lg" />
            <h3 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 drop-shadow-[0_1px_3px_rgba(147,51,234,0.6)]">
              Shape the Future
            </h3>
            <p className="text-sm sm:text-base text-gray-300">
              ML lets you forge tomorrow’s tech—think self-driving cars, AI overlords, and beyond. Be the architect of what’s next.
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative bg-gradient-to-br from-black/90 to-gray-900/80 border border-purple-950/70 rounded-lg p-5 sm:p-6 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-700 to-transparent rounded-t-lg" />
            <h3 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 drop-shadow-[0_1px_3px_rgba(147,51,234,0.6)]">
              Decode the Chaos
            </h3>
            <p className="text-sm sm:text-base text-gray-300">
              Turn raw data into power—ML cracks patterns no human could see, from stars to stocks. Master the unseen.
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative bg-gradient-to-br from-black/90 to-gray-900/80 border border-purple-950/70 rounded-lg p-5 sm:p-6 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-700 to-transparent rounded-t-lg" />
            <h3 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 drop-shadow-[0_1px_3px_rgba(147,51,234,0.6)]">
              Unleash Creativity
            </h3>
            <p className="text-sm sm:text-base text-gray-300">
              Build art, music, or entire worlds—ML isn’t just math; it’s a canvas for rebels who code the impossible.
            </p>
          </div>

          {/* Card 4 */}
          <div className="relative bg-gradient-to-br from-black/90 to-gray-900/80 border border-purple-950/70 rounded-lg p-5 sm:p-6 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-700 to-transparent rounded-t-lg" />
            <h3 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 drop-shadow-[0_1px_3px_rgba(147,51,234,0.6)]">
              Rule the Machines
            </h3>
            <p className="text-sm sm:text-base text-gray-300">
              Train AI to obey your will—ML gives you the reins to command tech and bend it to your vision.
            </p>
          </div>
        </div>
        <Link
          href="/learn"
          className="inline-block mt-8 sm:mt-12 px-6 py-3 bg-gradient-to-r from-purple-800 to-purple-700 text-gray-200 font-semibold rounded-md shadow-[0_0_10px_rgba(147,51,234,0.6)] hover:shadow-[0_0_20px_rgba(147,51,234,0.9)] transition-all duration-300"
        >
          Let’s Get Started
        </Link>
      </section>


      <footer className="w-full py-2 bg-black/80 border-t border-purple-950/50 text-gray-400 text-md text-center">
        Made with <span className="text-red-500">❤️</span> by Team 1 ISTP
      </footer>
    </div>
  );
};

export default LandingPage;