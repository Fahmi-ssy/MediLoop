"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
            <div className="max-w-6xl mx-auto px-4 py-16 font-sans">
                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/logoOnly.png"
                            alt="MediLoop Logo"
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">
                        About MediLoop
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        MediLoop is more than just a platform—it's a journey towards healthier living, inspired by a passion for innovation and a commitment to making health solutions accessible to everyone.
                    </p>
                </motion.div>

                {/* Origin Story */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-8 mb-16"
                >
                    <h2 className="text-3xl font-bold text-teal-800 mb-6 text-center">
                        Our Story
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/2">
                            <Image
                                src="/about-image.jpg"
                                alt="MediLoop Team"
                                width={500}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <div className="md:w-1/2 space-y-4">
                            <p className="text-gray-600 leading-relaxed">
                                MediLoop started as the final project of dedicated students at Hacktiv8, under the guidance of their instructor, Priambodo Kurniawan. This capstone project represents more than just a step toward graduation—it's a testament to innovation in healthcare technology.
                            </p>
                            <blockquote className="text-xl font-bold text-teal-700 italic border-l-4 border-teal-500 pl-4">
                                "This is more than a project—it's a leap into the future of personalized healthcare."
                            </blockquote>
                        </div>
                    </div>
                </motion.div>

                {/* Features Grid */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
                >
                    {/* Mission */}
                    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="p-2 bg-teal-100 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            <h2 className="text-2xl font-bold text-teal-800">Our Mission</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            MediLoop aims to guide users toward a healthier lifestyle by combining advanced technology with tailored recommendations for both medical and wellness needs.
                        </p>
                    </div>

                    {/* How it Works */}
                    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="p-2 bg-teal-100 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </span>
                            <h2 className="text-2xl font-bold text-teal-800">How It Works</h2>
                        </div>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                Symptom input or prescription uploads using Multer
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                OpenApi Vision for accurate identification
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                OpenAI-powered diagnoses and recommendations
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                Personalized lifestyle and product suggestions
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Bottom Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 text-center text-white"
                >
                    <h2 className="text-2xl font-bold mb-4">Built with Passion and Innovation</h2>
                    <p className="text-lg opacity-90">
                        MediLoop combines cutting-edge technology with a user-centered approach to provide seamless, tailored health solutions.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
