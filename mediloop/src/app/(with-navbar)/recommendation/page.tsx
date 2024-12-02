"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Recommendation {
  todoList: string[];
  lifestyleChanges: string[];
  products: string[];
}

export default function Recommendation() {
  const searchParams = useSearchParams();
  const [recommendations, setRecommendations] = useState<Recommendation>({
    todoList: [],
    lifestyleChanges: [],
    products: [],
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const recommendationsData = searchParams.get("recommendations");
    if (!recommendationsData) {
      setError("No recommendations data found");
      return;
    }

    try {
      // Decode and parse the URL parameter
      const decodedData = decodeURIComponent(
        recommendationsData.replace(/\+/g, '%20')
      );
      const parsedData = JSON.parse(decodedData);

      // Check if recommendations text exists
      const recommendationsText = parsedData.recommendations;
      if (!recommendationsText) {
        throw new Error('No recommendations found in response');
      }

      // Split by numbered sections and filter out empty lines
      const sections = recommendationsText.split(/\d\.\s+/).filter(Boolean);
      
      if (sections.length < 3) {
        throw new Error('Invalid recommendations format');
      }

      const formatted: Recommendation = {
        todoList: [],
        lifestyleChanges: [],
        products: [],
      };

      // Process each section
      sections.forEach((section: string, index: number) => {
        const lines = section
          .split('\n')
          .filter(line => line.trim() && line.trim().startsWith('-'))
          .map(line => line.replace(/^-\s*/, '').trim());

        switch (index) {
          case 0:
            formatted.todoList = lines;
            break;
          case 1:
            formatted.lifestyleChanges = lines;
            break;
          case 2:
            formatted.products = lines;
            break;
        }
      });

      // Validate that we have at least some recommendations
      if (!formatted.todoList.length && !formatted.lifestyleChanges.length && !formatted.products.length) {
        throw new Error('No valid recommendations were generated');
      }

      setRecommendations(formatted);
    } catch (error) {
      console.error("Error parsing recommendations:", error);
      setError(error instanceof Error ? error.message : "Failed to load recommendations");
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h1 className="text-2xl font-bold text-red-600">{error}</h1>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-teal-900 text-center mb-12"
        >
          Your Personalized Recommendations
        </motion.h1>
        
        <div className="space-y-8">
          {/* To-Do List Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-teal-800 mb-6 flex items-center gap-3">
              <span className="p-2 bg-teal-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              Personalized To-Do List
            </h2>
            <ul className="space-y-4">
              {recommendations.todoList.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-teal-50 transition-colors duration-200"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Lifestyle Changes Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-teal-800 mb-6 flex items-center gap-3">
              <span className="p-2 bg-teal-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Recommended Lifestyle Changes
            </h2>
            <ul className="space-y-4">
              {recommendations.lifestyleChanges.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-teal-50 transition-colors duration-200"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Product Recommendations Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-teal-800 mb-6 flex items-center gap-3">
              <span className="p-2 bg-teal-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </span>
              Recommended Products & Remedies
            </h2>
            <ul className="space-y-4">
              {recommendations.products.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-teal-50 transition-colors duration-200"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
