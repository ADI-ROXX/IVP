// app/about/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const teamMembers = [
    {
        id: 1,
        name: 'Dr. Parimala Kancharla',
        role: 'Faculty Advisor',
        image: 'https://randomuser.me/api/portraits/women/8.jpg', // Random placeholder
        github: 'https://github.com/parimalakancharla',
        linkedin: 'https://linkedin.com/in/parimalakancharla',
        instagram: 'https://instagram.com/parimalakancharla',
    },
    {
        id: 2,
        name: 'Luv Sharma',
        role: 'Web Dev Lead',
        image: 'https://randomuser.me/api/portraits/men/1.jpg', // Random placeholder
        github: 'https://github.com/luvsharma',
        linkedin: 'https://linkedin.com/in/luvsharma',
        instagram: 'https://instagram.com/luvsharma',
    },
    {
        id: 3,
        name: 'Saurabh Sonkar',
        role: 'Web Dev',
        image: 'https://randomuser.me/api/portraits/men/9.jpg', // Random placeholder
        github: 'https://github.com/anjali_sharma',
        linkedin: 'https://linkedin.com/in/anjali_sharma',
        instagram: 'https://instagram.com/anjali_sharma',
    },
    {
        id: 4,
        name: 'Abhijeet Jha',
        role: 'Survey Lead',
        image: 'https://randomuser.me/api/portraits/men/4.jpg', // Random placeholder
        github: 'https://github.com/rahulverma',
        linkedin: 'https://linkedin.com/in/rahulverma',
        instagram: 'https://instagram.com/rahulverma',
    },
    {
        id: 5,
        name: 'Dev Patel',
        role: 'Survey Expert',
        image: 'https://randomuser.me/api/portraits/men/6.jpg', // Random placeholder
        github: 'https://github.com/snehapatel',
        linkedin: 'https://linkedin.com/in/snehapatel',
        instagram: 'https://instagram.com/snehapatel',
    },
    {
        id: 6,
        name: 'Simroop Singh',
        role: 'Travel Lead',
        image: 'https://randomuser.me/api/portraits/men/14.jpg', // Random placeholder
        github: 'https://github.com/karansingh',
        linkedin: 'https://linkedin.com/in/karansingh',
        instagram: 'https://instagram.com/karansingh',
    },
    {
        id: 7,
        name: 'Bilal Khan',
        role: 'Coordinator',
        image: 'https://randomuser.me/api/portraits/women/7.jpg', // Random placeholder
        github: 'https://github.com/priyamehta',
        linkedin: 'https://linkedin.com/in/priyamehta',
        instagram: 'https://instagram.com/priyamehta',
    },
    {
        id: 8,
        name: 'Mehul Bhundiya',
        role: 'Coordinator',
        image: 'https://randomuser.me/api/portraits/men/20.jpg', // Random placeholder
        github: 'https://github.com/amitkumar',
        linkedin: 'https://linkedin.com/in/amitkumar',
        instagram: 'https://instagram.com/amitkumar',
    },
    {
        id: 9,
        name: 'Naman Singhania',
        role: 'Coordinator',
        image: 'https://randomuser.me/api/portraits/men/18.jpg', // Random placeholder
        github: 'https://github.com/amitkumar',
        linkedin: 'https://linkedin.com/in/amitkumar',
        instagram: 'https://instagram.com/amitkumar',
    },
];

export default function AboutPage() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    return (
        <div className="min-h-screen relative overflow-hidden bg-gray-950 py-16 px-8">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-radial from-purple-600/20 to-transparent"></div>

            {/* Main Content with Animation */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-2xl mx-auto mb-16 text-center"
            >
                <h1 className="text-5xl md:text-6xl text-white font-bold mb-6 drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]">
                    About ML Visualizer
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed">
                    Embark on a cosmic journey through the realms of Machine Learning!
                    Our ISTP project transforms complex algorithms into mesmerizing
                    visual symphonies. Witness the dance of neural networks and the
                    orbits of decision trees in this interactive tech-art fusion.
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
                <div className="flex justify-center mb-6">
                    <motion.div
                        key={teamMembers[0].id}
                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 w-full max-w-[250px] h-[300px] flex flex-col items-center text-center hover:border-purple-500 transition-all duration-300"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 10px 20px rgba(147, 51, 234, 0.3)',
                        }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setHoveredCard(teamMembers[0].id)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 mb-4">
                            <Image
                                src={teamMembers[0].image}
                                alt={teamMembers[0].name}
                                width={128}
                                height={128}
                                className="object-cover"
                                onError={(e) => {
                                    console.error(`Failed to load image: ${teamMembers[0].image}`);
                                    e.currentTarget.src = 'https://randomuser.me/api/portraits/lego/1.jpg'; // Fallback
                                }}
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-white">{teamMembers[0].name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{teamMembers[0].role}</p>
                        <motion.div
                            className="flex gap-4 opacity-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredCard === teamMembers[0].id ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <a href={teamMembers[0].github} target="_blank" className="text-gray-400 hover:text-purple-500">
                                <span className="sr-only">GitHub</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.089 2.91.833.091-.647.35-1.089.636-1.34-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.097-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.545 1.377.203 2.394.1 2.647.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.562 4.933.359.309.678.92.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.166 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </a>
                            <a href={teamMembers[0].linkedin} target="_blank" className="text-gray-400 hover:text-purple-500">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.255-2.396-1.885-2.396-1.628 0-1.872.895-1.872 2.239v5.761h-3v-11h2.881v1.578h.041c.395-.749 1.361-1.541 2.806-1.541 3.038 0 3.599 1.949 3.599 4.488v6.046z" />
                                </svg>
                            </a>
                            <a href={teamMembers[0].instagram} target="_blank" className="text-gray-400 hover:text-purple-500">
                                <span className="sr-only">Instagram</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.317 3.608 1.292.974.974 1.23 2.242 1.292 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.318 2.633-1.292 3.608-.974.974-2.242 1.23-3.608 1.292-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.318-3.608-1.292-.974-.974-1.23-2.242-1.292-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.317-2.633 1.292-3.608.974-.974 2.242-1.23 3.608-1.292 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.67.014-4.953.072-1.315.067-2.59.333-3.719.752-1.129.419-2.092.964-2.976 1.848-.884.884-1.429 1.847-1.848 2.976-.419 1.129-.685 2.404-.752 3.719-.058 1.283-.072 1.694-.072 4.953s.014 3.67.072 4.953c.067 1.315.333 2.59.752 3.719.419 1.129.964 2.092 1.848 2.976.884.884 1.847 1.429 2.976 1.848 1.129.419 2.404.685 3.719.752 1.283.058 1.694.072 4.953.072s3.67-.014 4.953-.072c1.315-.067 2.59-.333 3.719-.752 1.129-.419 2.092-.964 2.976-1.848.884-.884 1.429-1.847 1.848-2.976.419-1.129.685-2.404.752-3.719.058-1.283.072-1.694.072-4.953s-.014-3.67-.072-4.953c-.067-1.315-.333-2.59-.752-3.719-.419-1.129-.964-2.092-1.848-2.976-.884-.884-1.847-1.429-2.976-1.848-1.129-.419-2.404-.685-3.719-.752-1.283-.058-1.694-.072-4.953-.072Z" />
                                    <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162m0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4m5.913-5.913c0 1.549-.33 3.03-2.267 4.156a5.895 5.895 0 0 1-2.646 1.063c-.443.063-.872.098-1.28.098-.408 0-.837-.035-1.28-.098a5.895 5.895 0 0 1-2.646-1.063c-1.937-1.126-2.267-2.607-2.267-4.156 0-2.205 1.792-4 4-4h.818c.521 0 1.052.08 1.549.242.498.162.96.404 1.342.742.382.338.68.749.862 1.193.183.444.278.928.278 1.408Z" />
                                </svg>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Row 2: Cards 2, 3, 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {teamMembers.slice(1, 4).map((member) => (
                        <motion.div
                            key={member.id}
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 w-full h-[300px] flex flex-col items-center text-center hover:border-purple-500 transition-all duration-300"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 10px 20px rgba(147, 51, 234, 0.3)',
                            }}
                            whileTap={{ scale: 0.98 }}
                            onMouseEnter={() => setHoveredCard(member.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 mb-4">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={128}
                                    height={128}
                                    className="object-cover"
                                    onError={(e) => {
                                        console.error(`Failed to load image: ${member.image}`);
                                        e.currentTarget.src = 'https://randomuser.me/api/portraits/lego/1.jpg'; // Fallback
                                    }}
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                            <p className="text-gray-400 text-sm mb-4">{member.role}</p>
                            <motion.div
                                className="flex gap-4 opacity-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredCard === member.id ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <a href={member.github} target="_blank" className="text-gray-400 hover:text-purple-500">
                                    <span className="sr-only">GitHub</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.089 2.91.833.091-.647.35-1.089.636-1.34-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.097-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.545 1.377.203 2.394.1 2.647.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.562 4.933.359.309.678.92.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.166 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                </a>
                                <a href={member.linkedin} target="_blank" className="text-gray-400 hover:text-purple-500">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.255-2.396-1.885-2.396-1.628 0-1.872.895-1.872 2.239v5.761h-3v-11h2.881v1.578h.041c.395-.749 1.361-1.541 2.806-1.541 3.038 0 3.599 1.949 3.599 4.488v6.046z" />
                                    </svg>
                                </a>
                                <a href={member.instagram} target="_blank" className="text-gray-400 hover:text-purple-500">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.317 3.608 1.292.974.974 1.23 2.242 1.292 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.318 2.633-1.292 3.608-.974.974-2.242 1.23-3.608 1.292-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.318-3.608-1.292-.974-.974-1.23-2.242-1.292-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.317-2.633 1.292-3.608.974-.974 2.242-1.23 3.608-1.292 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.67.014-4.953.072-1.315.067-2.59.333-3.719.752-1.129.419-2.092.964-2.976 1.848-.884.884-1.429 1.847-1.848 2.976-.419 1.129-.685 2.404-.752 3.719-.058 1.283-.072 1.694-.072 4.953s.014 3.67.072 4.953c.067 1.315.333 2.59.752 3.719.419 1.129.964 2.092 1.848 2.976.884.884 1.847 1.429 2.976 1.848 1.129.419 2.404.685 3.719.752 1.283.058 1.694.072 4.953.072s3.67-.014 4.953-.072c1.315-.067 2.59-.333 3.719-.752 1.129-.419 2.092-.964 2.976-1.848.884-.884 1.429-1.847 1.848-2.976.419-1.129.685-2.404.752-3.719.058-1.283.072-1.694.072-4.953s-.014-3.67-.072-4.953c-.067-1.315-.333-2.59-.752-3.719-.419-1.129-.964-2.092-1.848-2.976-.884-.884-1.847-1.429-2.976-1.848-1.129-.419-2.404-.685-3.719-.752-1.283-.058-1.694-.072-4.953-.072Z" />
                                        <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162m0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4m5.913-5.913c0 1.549-.33 3.03-2.267 4.156a5.895 5.895 0 0 1-2.646 1.063c-.443.063-.872.098-1.28.098-.408 0-.837-.035-1.28-.098a5.895 5.895 0 0 1-2.646-1.063c-1.937-1.126-2.267-2.607-2.267-4.156 0-2.205 1.792-4 4-4h.818c.521 0 1.052.08 1.549.242.498.162.96.404 1.342.742.382.338.68.749.862 1.193.183.444.278.928.278 1.408Z" />
                                    </svg>
                                </a>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Row 3: Cards 5, 6, 7 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {teamMembers.slice(4, 7).map((member) => (
                        <motion.div
                            key={member.id}
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 w-full h-[300px] flex flex-col items-center text-center hover:border-purple-500 transition-all duration-300"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 10px 20px rgba(147, 51, 234, 0.3)',
                            }}
                            whileTap={{ scale: 0.98 }}
                            onMouseEnter={() => setHoveredCard(member.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 mb-4">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={128}
                                    height={128}
                                    className="object-cover"
                                    onError={(e) => {
                                        console.error(`Failed to load image: ${member.image}`);
                                        e.currentTarget.src = 'https://randomuser.me/api/portraits/lego/1.jpg'; // Fallback
                                    }}
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                            <p className="text-gray-400 text-sm mb-4">{member.role}</p>
                            <motion.div
                                className="flex gap-4 opacity-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredCard === member.id ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <a href={member.github} target="_blank" className="text-gray-400 hover:text-purple-500">
                                    <span className="sr-only">GitHub</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.089 2.91.833.091-.647.35-1.089.636-1.34-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.097-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.545 1.377.203 2.394.1 2.647.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.562 4.933.359.309.678.92.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.166 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                </a>
                                <a href={member.linkedin} target="_blank" className="text-gray-400 hover:text-purple-500">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.255-2.396-1.885-2.396-1.628 0-1.872.895-1.872 2.239v5.761h-3v-11h2.881v1.578h.041c.395-.749 1.361-1.541 2.806-1.541 3.038 0 3.599 1.949 3.599 4.488v6.046z" />
                                    </svg>
                                </a>
                                <a href={member.instagram} target="_blank" className="text-gray-400 hover:text-purple-500">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.317 3.608 1.292.974.974 1.23 2.242 1.292 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.318 2.633-1.292 3.608-.974.974-2.242 1.23-3.608 1.292-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.318-3.608-1.292-.974-.974-1.23-2.242-1.292-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.317-2.633 1.292-3.608.974-.974 2.242-1.23 3.608-1.292 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.67.014-4.953.072-1.315.067-2.59.333-3.719.752-1.129.419-2.092.964-2.976 1.848-.884.884-1.429 1.847-1.848 2.976-.419 1.129-.685 2.404-.752 3.719-.058 1.283-.072 1.694-.072 4.953s.014 3.67.072 4.953c.067 1.315.333 2.59.752 3.719.419 1.129.964 2.092 1.848 2.976.884.884 1.847 1.429 2.976 1.848 1.129.419 2.404.685 3.719.752 1.283.058 1.694.072 4.953.072s3.67-.014 4.953-.072c1.315-.067 2.59-.333 3.719-.752 1.129-.419 2.092-.964 2.976-1.848.884-.884 1.429-1.847 1.848-2.976.419-1.129.685-2.404.752-3.719.058-1.283.072-1.694.072-4.953s-.014-3.67-.072-4.953c-.067-1.315-.333-2.59-.752-3.719-.419-1.129-.964-2.092-1.848-2.976-.884-.884-1.847-1.429-2.976-1.848-1.129-.419-2.404-.685-3.719-.752-1.283-.058-1.694-.072-4.953-.072Z" />
                                        <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162m0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4m5.913-5.913c0 1.549-.33 3.03-2.267 4.156a5.895 5.895 0 0 1-2.646 1.063c-.443.063-.872.098-1.28.098-.408 0-.837-.035-1.28-.098a5.895 5.895 0 0 1-2.646-1.063c-1.937-1.126-2.267-2.607-2.267-4.156 0-2.205 1.792-4 4-4h.818c.521 0 1.052.08 1.549.242.498.162.96.404 1.342.742.382.338.68.749.862 1.193.183.444.278.928.278 1.408Z" />
                                    </svg>
                                </a>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Row 4: Cards 8, 9 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {teamMembers.slice(7).map((member) => (
                        <motion.div
                            key={member.id}
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 w-full h-[300px] flex flex-col items-center text-center hover:border-purple-500 transition-all duration-300"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 10px 20px rgba(147, 51, 234, 0.3)',
                            }}
                            whileTap={{ scale: 0.98 }}
                            onMouseEnter={() => setHoveredCard(member.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 mb-4">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={128}
                                    height={128}
                                    className="object-cover"
                                    onError={(e) => {
                                        console.error(`Failed to load image: ${member.image}`);
                                        e.currentTarget.src = 'https://randomuser.me/api/portraits/lego/1.jpg'; // Fallback
                                    }}
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                            <p className="text-gray-400 text-sm mb-4">{member.role}</p>
                            <motion.div
                                className="flex gap-4 opacity-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredCard === member.id ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <a href={member.github} target="_blank" className="text-gray-400 hover:text-purple-500">
                                    <span className="sr-only">GitHub</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.089 2.91.833.091-.647.35-1.089.636-1.34-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.097-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.545 1.377.203 2.394.1 2.647.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.562 4.933.359.309.678.92.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.166 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                </a>
                                <a href={member.linkedin} target="_blank" className="text-gray-400 hover:text-purple-500">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.255-2.396-1.885-2.396-1.628 0-1.872.895-1.872 2.239v5.761h-3v-11h2.881v1.578h.041c.395-.749 1.361-1.541 2.806-1.541 3.038 0 3.599 1.949 3.599 4.488v6.046z" />
                                    </svg>
                                </a>
                                <a href={member.instagram} target="_blank" className="text-gray-400 hover:text-purple-500">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.317 3.608 1.292.974.974 1.23 2.242 1.292 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.318 2.633-1.292 3.608-.974.974-2.242 1.23-3.608 1.292-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.318-3.608-1.292-.974-.974-1.23-2.242-1.292-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.317-2.633 1.292-3.608.974-.974 2.242-1.23 3.608-1.292 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.67.014-4.953.072-1.315.067-2.59.333-3.719.752-1.129.419-2.092.964-2.976 1.848-.884.884-1.429 1.847-1.848 2.976-.419 1.129-.685 2.404-.752 3.719-.058 1.283-.072 1.694-.072 4.953s.014 3.67.072 4.953c.067 1.315.333 2.59.752 3.719.419 1.129.964 2.092 1.848 2.976.884.884 1.847 1.429 2.976 1.848 1.129.419 2.404.685 3.719.752 1.283.058 1.694.072 4.953.072s3.67-.014 4.953-.072c1.315-.067 2.59-.333 3.719-.752 1.129-.419 2.092-.964 2.976-1.848.884-.884 1.429-1.847 1.848-2.976.419-1.129.685-2.404.752-3.719.058-1.283.072-1.694.072-4.953s-.014-3.67-.072-4.953c-.067-1.315-.333-2.59-.752-3.719-.419-1.129-.964-2.092-1.848-2.976-.884-.884-1.847-1.429-2.976-1.848-1.129-.419-2.404-.685-3.719-.752-1.283-.058-1.694-.072-4.953-.072Z" />
                                        <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162m0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4m5.913-5.913c0 1.549-.33 3.03-2.267 4.156a5.895 5.895 0 0 1-2.646 1.063c-.443.063-.872.098-1.28.098-.408 0-.837-.035-1.28-.098a5.895 5.895 0 0 1-2.646-1.063c-1.937-1.126-2.267-2.607-2.267-4.156 0-2.205 1.792-4 4-4h.818c.521 0 1.052.08 1.549.242.498.162.96.404 1.342.742.382.338.68.749.862 1.193.183.444.278.928.278 1.408Z" />
                                    </svg>
                                </a>
                            </motion.div>
                        </motion.div>
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
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-600/80 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-600/80 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]"></div>
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-purple-600/80 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]"></div>
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 bg-purple-600/80 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]"></div>
                </motion.div>
            </motion.div>
        </div>
    );
}