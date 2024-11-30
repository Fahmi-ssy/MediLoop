import Link from 'next/link';
import Image from 'next/image';

interface DiscoveryNavbarProps {
  handlePrevious: () => void;
  isFirstQuestion: boolean;
  completedQuestions: number;
  totalQuestions: number;
  progress: number;
}

export default function DiscoveryNavbar({
  handlePrevious,
  isFirstQuestion,
  completedQuestions,
  totalQuestions,
  progress
}: DiscoveryNavbarProps) {
  return (
    <div className="sticky top-0 shadow-sm z-50">
      <div className="relative h-16">
        <Image
          src="/login_bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-10 h-full">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="h-full flex items-center">
              <button 
                type="button"
                onClick={handlePrevious}
                disabled={isFirstQuestion}
                className="p-2 rounded-full hover:bg-gray-100 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Go back"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex-1 flex flex-col items-center justify-center mx-4">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  Question {completedQuestions} of {totalQuestions}
                </div>
                <div className="h-1 bg-gray-100 rounded-full w-full max-w-md">
                  <div 
                    className="h-1 bg-teal-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <Link 
                href="/"
                className="p-2 rounded-full hover:bg-gray-100 transition duration-200 text-gray-600"
                aria-label="Go to home"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}