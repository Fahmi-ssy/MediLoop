"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Recommendation {
  todoList: string[];
  lifestyleChanges: string[];
  products: {
    name: string;
    description: string;
    image: string;
    price: number;
  }[];
  imageAnalysis?: string;
}

export default function Recommendation() {
  const searchParams = useSearchParams();
  const [recommendations, setRecommendations] = useState<Recommendation>({
    todoList: [],
    lifestyleChanges: [],
    products: [],
    imageAnalysis: "",
  });
  const [error, setError] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    const imageBase64 = localStorage.getItem('uploadedImageBase64');
    if (imageBase64) {
      setUploadedImage(imageBase64);
      localStorage.removeItem('uploadedImageBase64');
    }
  }, []);

  useEffect(() => {
    const recommendationsData = searchParams.get("recommendations");
    if (!recommendationsData) {
      setError("No recommendations data found");
      return;
    }

    try {
      const decodedData = decodeURIComponent(
        recommendationsData.replace(/\+/g, '%20')
      );
      const parsedData = JSON.parse(decodedData);

      const recommendationsText = parsedData.recommendations || '';
      const imageAnalysis = parsedData.imageAnalysis || '';
      const embeddedProducts = parsedData.embeddedProducts || [];

      if (!recommendationsText.trim()) {
        throw new Error('No recommendations found in response');
      }

      console.log('Raw OpenAI Response:', recommendationsText);

      const sections = recommendationsText
        .split(/\d\.\s+/)
        .filter((section: string) => section?.trim())
        .map((section: string) => section.trim());

      if (!sections.length) {
        throw new Error('Failed to parse recommendations');
      }

      console.log('Parsed sections:', sections);

      const formatted: Recommendation = {
        todoList: [],
        lifestyleChanges: [],
        products: [],
        imageAnalysis: imageAnalysis || "",
      };

      sections.forEach((section: string) => {
        const lines = section
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.startsWith('-'))
          .map(line => line.substring(1).trim());

        if (section.toLowerCase().includes('to-do list')) {
          formatted.todoList = lines;
        } else if (section.toLowerCase().includes('lifestyle changes')) {
          formatted.lifestyleChanges = lines;
        }
      });

      // Add embedded products if available
      if (embeddedProducts.length > 0) {
        formatted.products = embeddedProducts.map((product: { 
          name: string; 
          description: string;
          image: string;
          price: number;
        }) => ({
          name: product.name,
          description: product.description || '',
          image: product.image || '',
          price: product.price || 0
        }));
      }

      console.log('Formatted recommendations:', formatted);

      if (formatted.todoList.length || formatted.lifestyleChanges.length || formatted.products.length) {
        setRecommendations(formatted);
      } else {
        throw new Error('No valid recommendations were found in the response');
      }
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
        
        {uploadedImage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 max-w-md mx-auto"
          >
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-teal-800 mb-3">Analysis of Your Image</h3>
              <div className="relative w-full h-64">
                <img
                  src={uploadedImage}
                  alt="Uploaded prescription or medical document"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        )}
        
        {uploadedImage && recommendations.imageAnalysis && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-teal-800 mb-3">Image Analysis</h3>
              <p className="text-gray-700">{recommendations.imageAnalysis}</p>
            </div>
          </motion.div>
        )}
        
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
                  className="flex items-start gap-6 p-4 rounded-lg hover:bg-teal-50 transition-colors duration-200"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow space-y-2">
                    <span className="text-gray-700 text-lg font-medium">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-teal-600 font-semibold">
                        Rp {item.price?.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
