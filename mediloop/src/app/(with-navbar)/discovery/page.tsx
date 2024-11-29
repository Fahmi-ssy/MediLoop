"use client"
import FileUpload from '@/components/Multer';
import React, { useState } from 'react';

export default function Discovery() {
    const [healthConcerns, setHealthConcerns] = useState('');
    const [treatments, setTreatments] = useState('');
    const [lastPhysicalExam, setLastPhysicalExam] = useState('');
    const [exerciseRoutine, setExerciseRoutine] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            healthConcerns,
            treatments,
            lastPhysicalExam,
            exerciseRoutine,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-teal-900 text-center mb-8">
                    Health Questionnaire
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <label htmlFor="healthConcerns" className="block text-lg font-medium text-teal-900">
                            Do you have any specific concerns or questions about your health?
                        </label>
                        <textarea
                            id="healthConcerns"
                            value={healthConcerns}
                            onChange={(e) => setHealthConcerns(e.target.value)}
                            rows={4}
                            className="w-full rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 p-3 transition duration-200"
                            placeholder="Enter your concerns"
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="treatments" className="block text-lg font-medium text-teal-900">
                            Previous treatments or medications that worked for you
                        </label>
                        <textarea
                            id="treatments"
                            value={treatments}
                            onChange={(e) => setTreatments(e.target.value)}
                            rows={4}
                            className="w-full rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 p-3 transition duration-200"
                            placeholder="Enter any treatments or medications"
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="lastPhysicalExam" className="block text-lg font-medium text-teal-900">
                            Last physical exam or health checkup
                        </label>
                        <input
                            id="lastPhysicalExam"
                            type="date"
                            value={lastPhysicalExam}
                            onChange={(e) => setLastPhysicalExam(e.target.value)}
                            className="w-full rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 p-3 transition duration-200"
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="exerciseRoutine" className="block text-lg font-medium text-teal-900">
                            Physical activity or exercise routine
                        </label>
                        <textarea
                            id="exerciseRoutine"
                            value={exerciseRoutine}
                            onChange={(e) => setExerciseRoutine(e.target.value)}
                            rows={4}
                            className="w-full rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 p-3 transition duration-200"
                            placeholder="Enter details about your exercise routine"
                        />
                    </div>

                    <div className="flex justify-center mt-8">
                        <button 
                            type="submit" 
                            className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                        >
                            Submit Questionnaire
                        </button>
                    </div>
                </form>

                <div className="mt-12 pt-8 border-t border-teal-100">
                    <h2 className="text-2xl font-bold text-teal-900 text-center mb-6">
                        Upload Medical Documents
                    </h2>
                    <FileUpload />
                </div>
            </div>
        </div>
    );
}
