"use client"
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default async function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-teal-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-white to-teal-50 py-16 sm:py-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute left-[50%] top-0 h-[36rem] w-[36rem] -translate-x-1/2 sm:left-[45%] sm:-translate-x-0 opacity-30 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-teal-300 blur-3xl" />
          </div>
          <div className="absolute right-[50%] bottom-0 h-[36rem] w-[36rem] translate-x-1/2 sm:right-[45%] sm:translate-x-0 opacity-30 animate-pulse delay-700">
            <div className="absolute inset-0 rounded-full bg-gradient-to-l from-teal-400 to-teal-300 blur-3xl" />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center relative">
            {/* Logo with floating animation */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Image
                  src="/logoOnly.png"
                  alt="MediLoop Logo"
                  width={100}
                  height={100}
                  className="object-contain animate-float"
                  priority
                />
                <div className="absolute -inset-3 bg-teal-100 rounded-full blur-2xl opacity-30 animate-pulse" />
              </div>
            </div>

            {/* Main heading with gradient text */}
            <h1 className="text-4xl font-bold tracking-tight text-teal-900 sm:text-6xl mb-6 relative">
              Transform Your Health with
              <span className="block mt-2 relative">
                {/* Background Image */}
                <Image
                  src="/ai-care-bg.png"
                  alt="AI Care Background"
                  width={500}
                  height={100}
                  className="absolute inset-0 object-cover opacity-10 z-0"
                  priority
                />
                {/* Gradient Text */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 animate-gradient relative z-10">
                  AI-Powered Care
                </span>
              </span>
            </h1>

            {/* Subheading with improved typography */}
            <p className="mt-4 text-lg sm:text-xl leading-8 text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience personalized healthcare like never before. Upload your prescription or describe your symptoms, and let our advanced AI guide you to optimal wellness with tailored recommendations and insights.
            </p>

            {/* CTA buttons with enhanced hover effects */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/discovery">
                <button className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(13,148,136,0.3)] hover:-translate-y-1">
                  Start Your Journey
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
              <Link href="/about">
                <button className="group relative flex items-center gap-3 rounded-full border-2 border-teal-600 px-8 py-4 text-lg font-semibold text-teal-600 transition-all duration-300 hover:bg-teal-50 hover:shadow-lg hover:-translate-y-1">
                  Learn More
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>

            {/* Trust indicators with animations */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-500">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
              >
                <svg className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>AI-Powered</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
              >
                <svg className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
              >
                <svg className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Real-time</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Jumbotron */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-teal-50 to-white">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(40deg,rgba(13,148,136,0.05)_0%,rgba(13,148,136,0.02)_100%)]" />
          <div className="absolute right-0 top-0 -mt-16 opacity-20">
            <svg width="800" height="800" viewBox="0 0 800 800">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" stroke="currentColor" className="text-teal-500/20" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Your Personal
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
                    Health Assistant
                  </span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Upload your prescription or describe your symptoms, and watch as our AI analyzes and provides personalized recommendations in seconds.
                </p>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: "24/7", label: "Support" },
                  { number: "100+", label: "Products" },
                  { number: "<1min", label: "Response" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-teal-600">{stat.number}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link href="/discovery">
                  <button className="group relative inline-flex items-center gap-2 rounded-full bg-teal-600 px-8 py-4 text-white transition-all hover:bg-teal-700">
                    Try Now
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right Animation */}
            <div className="relative lg:h-[600px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-teal-300/20 rounded-3xl transform rotate-3 scale-105" />
                <div className="relative h-full rounded-2xl overflow-hidden border border-teal-100 bg-white/50 backdrop-blur-sm p-8">
                  <Image
                    src="/mediJumbo.png"
                    alt="AI Health Assistant"
                    width={500}
                    height={500}
                    className="object-contain mx-auto"
                  />
                  <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse" />
                      <p className="text-sm text-gray-500">
                        Powered by AI
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <a href=""></a>
            <h3 className="text-xl font-bold text-teal-900 mb-3">
              Symptom Analysis
            </h3>
            <p className="text-teal-700">
              Upload your symptoms and receive AI-powered preliminary diagnoses
              and recommendations
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-teal-900 mb-3">
              Image Upload
            </h3>
            <p className="text-teal-700">
              Securely upload and store your  for easy access and
              management
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-teal-900 mb-3">
              Product Recommendations
            </h3>
            <p className="text-teal-700">
              Get personalized wellness product suggestions based on your health
              profile
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-teal-900 text-center mb-12">
          Latest Body Care Articles
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Article 1 */}
          <article className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3"
                alt="Skincare Routine"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-teal-600 mb-2">Skin Care • 5 min read</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Essential Steps for a Morning Skincare Routine
              </h3>
              <p className="text-gray-600 mb-4">
                Discover the perfect morning skincare routine that will protect and nourish your skin throughout the day. Learn about cleansing, toning, and the importance of sunscreen.
              </p>
              <Link 
                href="/articles/morning-skincare" 
                className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 group"
              >
                Read More 
                <span className="transform translate-x-0 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </article>

          {/* Article 2 */}
          <article className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3"
                alt="Natural Ingredients"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-teal-600 mb-2">Natural Care • 4 min read</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Natural Ingredients for Healthy Hair Growth
              </h3>
              <p className="text-gray-600 mb-4">
                Explore the power of natural ingredients like aloe vera, coconut oil, and biotin that can promote healthy hair growth and maintain scalp health naturally.
              </p>
              <Link 
                href="/articles/natural-hair-care" 
                className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 group"
              >
                Read More 
                <span className="transform translate-x-0 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </article>

          {/* Article 3 */}
          <article className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3"
                alt="Self Care"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-teal-600 mb-2">Wellness • 6 min read</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                The Complete Guide to Body Care Routines
              </h3>
              <p className="text-gray-600 mb-4">
                Learn how to create a comprehensive body care routine that includes exfoliation, moisturizing, and protection for healthy, glowing skin all year round.
              </p>
              <Link href="/articles/body-care-guide" className="text-teal-600 font-semibold hover:text-teal-700">
                Read More →
              </Link>
            </div>
          </article>
        </div>

        {/* View All Articles Button */}
        <div className="text-center mt-12">
          <Link href="/articles">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition">
              View All Articles
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
