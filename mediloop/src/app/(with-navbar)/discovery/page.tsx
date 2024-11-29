"use client"
import FileUpload from '@/components/Multer';
import React, { useState } from 'react';

// "use client"
// import FileUpload from '@/components/Multer';
// import React, { useState } from 'react';

export default function Discovery() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        healthConcerns: '',
        treatments: '',
        lastPhysicalExam: '',
        exerciseRoutine: ''
    });

    const questions = [
        {
            id: 'healthConcerns',
            label: 'Do you have any specific concerns or questions about your health?',
            type: 'textarea',
            placeholder: 'Enter your concerns'
        },
        {
            id: 'treatments',
            label: 'Previous treatments or medications that worked for you',
            type: 'textarea',
            placeholder: 'Enter any treatments or medications'
        },
        {
            id: 'lastPhysicalExam',
            label: 'Last physical exam or health checkup',
            type: 'date',
            placeholder: ''
        },
        {
            id: 'exerciseRoutine',
            label: 'Physical activity or exercise routine',
            type: 'textarea',
            placeholder: 'Enter details about your exercise routine'
        }
    ];

    const handleInputChange = (id: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    const renderQuestion = () => {
        const question = questions[currentStep];
        return (
            <div className="space-y-4 min-h-[300px]">
                <label htmlFor={question.id} className="block text-xl font-medium text-teal-900">
                    {question.label}
                </label>
                {question.type === 'textarea' ? (
                    <textarea
                        id={question.id}
                        value={formData[question.id as keyof typeof formData]}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        rows={4}
                        className="w-full rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 p-3 transition duration-200"
                        placeholder={question.placeholder}
                    />
                ) : (
                    <input
                        id={question.id}
                        type={question.type}
                        value={formData[question.id as keyof typeof formData]}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        className="w-full rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 p-3 transition duration-200"
                    />
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-teal-900 text-center mb-8">
                    Health Questionnaire
                </h1>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="h-2 bg-teal-100 rounded-full">
                        <div 
                            className="h-2 bg-teal-500 rounded-full transition-all duration-300"
                            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                    <div className="text-sm text-teal-600 text-center mt-2">
                        Question {currentStep + 1} of {questions.length}
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                    {renderQuestion()}

                    <div className="flex justify-between mt-8">
                        <button 
                            type="button"
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                            className="px-6 py-2 rounded-full border-2 border-teal-500 text-teal-500 hover:bg-teal-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        {currentStep === questions.length - 1 ? (
                            <button 
                                type="submit"
                                className="px-6 py-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition duration-200"
                            >
                                Submit
                            </button>
                        ) : (
                            <button 
                                type="button"
                                onClick={handleNext}
                                className="px-6 py-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition duration-200"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </form>

                {currentStep === questions.length - 1 && (
                    <div className="mt-12 pt-8 border-t border-teal-100">
                        <h2 className="text-2xl font-bold text-teal-900 text-center mb-6">
                            Upload Medical Documents
                        </h2>
                        <FileUpload />
                    </div>
                )}
            </div>
        </div>
    );
}
