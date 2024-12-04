"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiClock, FiList, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from "react-toastify";

interface Recommendation {
  _id: string;
  todoList: string[];
  lifestyleChanges: string[];
  products: {
    name: string;
    description: string;
    image: string;
    price: number;
  }[];
  imageAnalysis?: string;
  imageUrl?: string;
  createdAt: string;
}

export default function History() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'skin' | 'hair'>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // First check authorization
        const authResponse = await fetch('/api/historyAuth', {
          method: 'GET',
          credentials: 'include',
        });

        // console.log('Auth response:', authResponse.status);

        if (!authResponse.ok) {
          // console.error('Auth failed:', await authResponse.text());
          router.push('/login');
          return;
        }

        // Then fetch user ID and recommendations
        const userId = localStorage.getItem('userId');
        // console.log('Fetching for userId:', userId);

        if (!userId) {
          setError('User ID not found. Please log in again.');
          return;
        }

        const response = await fetch(`/api/saveRecommendation?userId=${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        // console.log('Fetch response status:', response.status);
        
        if (response.status === 401 || response.status === 403) {
          console.error('Authorization failed:', await response.text());
          router.push('/login');
          return;
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Fetch failed:', errorText);
          throw new Error(`Failed to fetch recommendations: ${errorText}`);
        }

        const data = await response.json();
        // console.log('Received data:', data);
        
        if (data.success && Array.isArray(data.data)) {
          setRecommendations(data.data);
        } else {
          console.error('Invalid data format:', data);
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Detailed error:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('Current userId:', userId);
    console.log('Current recommendations:', recommendations);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [recommendations, loading, error]);

  const filterRecommendations = (recommendations: Recommendation[]) => {
    switch (activeTab) {
      case 'skin':
        return recommendations.filter(rec => 
          rec.todoList.some(item => item.toLowerCase().includes('skin')) ||
          rec.lifestyleChanges.some(item => item.toLowerCase().includes('skin'))
        );
      case 'hair':
        return recommendations.filter(rec => 
          rec.todoList.some(item => item.toLowerCase().includes('hair')) ||
          rec.lifestyleChanges.some(item => item.toLowerCase().includes('hair'))
        );
      default:
        return recommendations;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-white">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logoOnly.png"
              alt="MediLoop Logo"
              width={60}
              height={60}
              className="object-contain animate-float"
              priority
            />
            <div className="absolute -inset-3 bg-teal-100 rounded-full blur-2xl opacity-30 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md mx-auto"
        >
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Oops!</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Health Journey</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your wellness progress and review past recommendations
          </p>
        </motion.div>

        <div className="mb-8">
          <nav className="flex justify-center space-x-2">
            {[
              { id: 'all', label: 'All History', icon: FiList },
              { id: 'skin', label: 'Skin Care', icon: FiHeart },
              { id: 'hair', label: 'Hair Care', icon: FiHeart },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center px-4 py-2 rounded-full transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {filterRecommendations(recommendations).length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto"
          >
            <div className="inline-block p-4 bg-teal-50 rounded-full mb-6">
              <FiHeart className="w-8 h-8 text-teal-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {activeTab === 'all' 
                ? 'Start Your Journey'
                : `No ${activeTab} recommendations yet`}
            </h3>
            <p className="text-gray-600 mb-8">
              {activeTab === 'all'
                ? 'Get personalized recommendations by completing our health assessment'
                : `Complete our health assessment to get ${activeTab} care recommendations`}
            </p>
            <a
              href="/discovery"
              className="inline-flex items-center px-8 py-4 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors text-lg font-medium"
            >
              Begin Assessment
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        ) : (
          <div className="grid gap-8">
            {filterRecommendations(recommendations).map((recommendation, index) => (
              <motion.div
                key={recommendation._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-teal-50 rounded-full">
                        <FiClock className="w-6 h-6 text-teal-500" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {new Date(recommendation.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </h2>
                    </div>
                    <button
                      onClick={async () => {
                        const toastId = toast.warning(
                          <>
                            <div>Are you sure you want to delete this history?</div>
                            <div className="flex justify-end mt-2">
                              <button
                                onClick={async () => {
                                  toast.dismiss(toastId);
                                  try {
                                    const response = await fetch(`/api/saveRecommendation/${recommendation._id}`, {
                                      method: 'DELETE',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                    });

                                    const data = await response.json();

                                    if (!response.ok) {
                                      throw new Error(data.error || 'Failed to delete recommendation');
                                    }

                                    setRecommendations(prev => 
                                      prev.filter(rec => rec._id !== recommendation._id)
                                    );
                                    toast.success("History deleted successfully!", {
                                      position: "top-right",
                                      autoClose: 1500,
                                    });
                                  } catch (error) {
                                    console.error('Error deleting history:', error);
                                    toast.error(error instanceof Error ? error.message : 'Failed to delete history', {
                                      position: "top-right",
                                      autoClose: 1500,
                                    });
                                  }
                                }}
                                className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => toast.dismiss(toastId)}
                                className="bg-gray-500 text-white px-3 py-1 rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          </>,
                          {
                            autoClose: false,
                            closeOnClick: false,
                            hideProgressBar: true,
                            position: "top-right",
                          }
                        );
                      }}
                      className="p-2 text-red-500 hover:text-red-600 transition-colors"
                      title="Delete history"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                        />
                      </svg>
                    </button>
                  </div>

                  {recommendation.imageUrl && (
                    <div className="mb-8 grid md:grid-cols-2 gap-6">
                      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-50">
                        <Image
                          src={recommendation.imageUrl}
                          alt="Medical document"
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 400px"
                          quality={75}
                        />
                      </div>
                      
                      {recommendation.imageAnalysis && (
                        <div className="p-6 bg-gray-50 rounded-xl h-fit">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">Analysis</h3>
                          <p className="text-gray-600 leading-relaxed">{recommendation.imageAnalysis}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <FiList className="w-5 h-5 text-teal-500" />
                        <h3 className="text-lg font-semibold text-gray-800">To-Do List</h3>
                      </div>
                      <ul className="space-y-3">
                        {recommendation.todoList.map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <FiHeart className="w-5 h-5 text-teal-500" />
                        <h3 className="text-lg font-semibold text-gray-800">Lifestyle Changes</h3>
                      </div>
                      <ul className="space-y-3">
                        {recommendation.lifestyleChanges.map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {recommendation.products.length > 0 && (
                    <div className="mt-8">
                      <div className="flex items-center gap-3 mb-6">
                        <FiShoppingBag className="w-5 h-5 text-teal-500" />
                        <h3 className="text-lg font-semibold text-gray-800">Recommended Products</h3>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        {recommendation.products.map((product, i) => (
                          <Link 
                            key={i} 
                            href={`/products/${encodeURIComponent(product.name)}`}
                            className="block"
                          >
                            <div className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                              <div className="relative aspect-square w-24 flex-shrink-0">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover rounded-lg"
                                  sizes="(max-width: 768px) 96px, 96px"
                                />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-1">{product.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                                <p className="text-teal-600 font-medium">
                                  Rp {product.price.toLocaleString('id-ID')}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}