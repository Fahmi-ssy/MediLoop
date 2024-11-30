"use client"
import FileUpload from '@/components/Multer';
import React, { useState } from 'react';
import DiscoveryNavbar from '@/components/DiscoveryNavbar';

interface Question {
    id: string;
    label: string;
    type: string;
    options: string[];
}

interface Section {
    title: string;
    questions: Question[];
}

export default function Discovery() {
    const [currentStep, setCurrentStep] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [formData, setFormData] = useState({
        // Symptom Focus
        currentSymptoms: '',
        symptomsStart: '',
        symptomsSeverity: '',
        otherSymptoms: '',
        
        // Lifestyle Focus
        wellnessRecommendations: '',
        dietaryRestrictions: '',
        otherDietary: '',
        
        // Medical History
        medications: '',
        remedyPreference: '',
        otherMedications: '',
        
        // Specific Body Areas
        bodyArea: '',
        lifestyleChanges: '',
        otherConcerns: ''
    });

    const sections: Section[] = [
        {
            title: "Symptom Focus",
            questions: [
                {
                    id: 'currentSymptoms',
                    label: 'What symptoms are you currently experiencing?',
                    type: 'radio',
                    options: [
                        'Skin Problems (e.g., acne, dryness, rash)',
                        'Hair Loss or Dandruff',
                        'Other'
                    ]
                },
                {
                    id: 'symptomsStart',
                    label: 'When did the symptoms start?',
                    type: 'radio',
                    options: [
                        'Today',
                        '1–3 Days Ago',
                        'A Week or More Ago',
                        'Other'
                    ]
                },
                {
                    id: 'symptomsSeverity',
                    label: 'How severe are your symptoms?',
                    type: 'radio',
                    options: [
                        "Mild (Doesn't interfere with daily life)",
                        "Moderate (Somewhat disruptive)",
                        'Severe (Significantly impacts daily activities)',
                        'Other'
                    ]
                }
            ]
        },
        {
            title: "Lifestyle Focus",
            questions: [
                {
                    id: 'wellnessRecommendations',
                    label: 'Are you looking for wellness recommendations?',
                    type: 'radio',
                    options: [
                        'Yes, for Hair Care (e.g., hair loss, dry scalp)',
                        'Yes, for Skin Care (e.g., acne, hydration)',
                        'Yes, for Boosting Energy or Fitness',
                        'Yes, for Stress Relief or Relaxation',
                        "No, I'm only focused on resolving my current symptoms",
                        'Other'
                    ]
                },
                {
                    id: 'dietaryRestrictions',
                    label: 'Do you have any dietary restrictions or preferences?',
                    type: 'radio',
                    options: [
                        'Vegetarian/Vegan',
                        'Gluten-Free',
                        'Lactose-Free',
                        'No Restrictions',
                        'Other'
                    ]
                }
            ]
        },
        {
            title: "Medical History and Preferences",
            questions: [
                {
                    id: 'medications',
                    label: 'Do you take any medications or supplements regularly?',
                    type: 'radio',
                    options: [
                        'Yes',
                        'No',
                        'Other'
                    ]
                },
                {
                    id: 'remedyPreference',
                    label: 'Do you prefer over-the-counter medicines or natural remedies?',
                    type: 'radio',
                    options: [
                        'Over-the-Counter Products',
                        'Natural/Herbal Remedies',
                        'Open to Both',
                        'Other'
                    ]
                }
            ]
        },
        {
            title: "Specific Body Areas",
            questions: [
                {
                    id: 'bodyArea',
                    label: 'What part of your body are you most concerned about?',
                    type: 'radio',
                    options: [
                        'Head (e.g., headaches, hair problems)',
                        'Chest (e.g., breathing issues, cold)',
                        'Stomach (e.g., digestion, nausea)',
                        'Skin (e.g., acne, dryness)',
                        'Overall Wellness (e.g., fatigue, sleep)',
                        'Other'
                    ]
                },
                {
                    id: 'lifestyleChanges',
                    label: 'Would you like us to suggest lifestyle changes?',
                    type: 'radio',
                    options: [
                        'Yes, please!',
                        'No, just product recommendations.',
                        'Other'
                    ]
                }
            ]
        }
    ];

    const handleInputChange = (id: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));

        // Only auto-advance if not "Other" option and a value is selected
        if (value && value !== 'Other' && 
            !(currentStep === sections.length - 1 && 
              currentQuestionIndex === sections[currentStep].questions.length - 1)) {
            setTimeout(() => {
                const currentSection = sections[currentStep];
                if (currentQuestionIndex < currentSection.questions.length - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                } else if (currentStep < sections.length - 1) {
                    setCurrentStep(prev => prev + 1);
                    setCurrentQuestionIndex(0);
                }
            }, 300);
        }
    };

    const handleNext = () => {
        // Check if current question is answered
        const currentSection = sections[currentStep];
        const currentQuestion = currentSection.questions[currentQuestionIndex];
        if (!formData[currentQuestion.id as keyof typeof formData]) {
            alert('Please select an option before proceeding.');
            return;
        }

        if (currentQuestionIndex < currentSection.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else if (currentStep < sections.length - 1) {
            setCurrentStep(prev => prev + 1);
            setCurrentQuestionIndex(0);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        } else if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            setCurrentQuestionIndex(sections[currentStep - 1].questions.length - 1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Check if all questions are answered
        let unansweredQuestions = false;
        sections.forEach(section => {
            section.questions.forEach(question => {
                if (!formData[question.id as keyof typeof formData]) {
                    unansweredQuestions = true;
                }
            });
        });

        if (unansweredQuestions) {
            alert('Please answer all questions before submitting.');
            return;
        }

        console.log(formData);
        // Proceed with form submission
    };

    const renderQuestion = () => {
        const currentSection = sections[currentStep];
        const currentQuestion = currentSection.questions[currentQuestionIndex];

        return (
            <div className="space-y-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-teal-800 mb-2">
                        {currentQuestion.label}
                    </h2>
                    <p className="text-sm text-teal-600">
                        Question {currentQuestionIndex + 1} of {currentSection.questions.length}
                    </p>
                </div>
                <div className="grid gap-4">
                    {currentQuestion.options.map((option) => (
                        <div 
                            key={option} 
                            className={`flex items-center p-4 rounded-lg transition-all duration-200 hover:bg-teal-50 ${
                                formData[currentQuestion.id as keyof typeof formData] === option
                                    ? 'bg-teal-50'
                                    : 'bg-white'
                            }`}
                        >
                            <input
                                type="radio"
                                id={`${currentQuestion.id}-${option}`}
                                name={currentQuestion.id}
                                value={option}
                                checked={formData[currentQuestion.id as keyof typeof formData] === option}
                                onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                                className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                            />
                            <label
                                htmlFor={`${currentQuestion.id}-${option}`}
                                className="ml-4 text-lg text-gray-700 cursor-pointer flex-grow"
                            >
                                {option}
                            </label>
                            {option === 'Other' && formData[currentQuestion.id as keyof typeof formData] === 'Other' && (
                                <input
                                    type="text"
                                    placeholder="Please specify"
                                    className="ml-3 p-2 border rounded-md w-full max-w-xs"
                                    onChange={(e) => handleInputChange(`${currentQuestion.id}Other`, e.target.value)}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="text-sm text-red-600 mt-2">
                    * This question is required
                </div>
            </div>
        );
    };

    const calculateProgress = () => {
        let totalQuestions = 0;
        let completedQuestions = 0;
        
        sections.forEach((section, sectionIndex) => {
            totalQuestions += section.questions.length;
            if (sectionIndex < currentStep) {
                completedQuestions += section.questions.length;
            } else if (sectionIndex === currentStep) {
                completedQuestions += currentQuestionIndex;
            }
        });
        
        return (completedQuestions / totalQuestions) * 100;
    };

    const calculateTotalQuestions = () => {
        let totalQuestions = 0;
        
        sections.forEach((section) => {
            totalQuestions += section.questions.length;
        });
        
        return totalQuestions;
    };

    const calculateCompletedQuestions = () => {
        let completedQuestions = 0;
        
        sections.forEach((section, sectionIndex) => {
            if (sectionIndex < currentStep) {
                completedQuestions += section.questions.length;
            } else if (sectionIndex === currentStep) {
                completedQuestions += currentQuestionIndex;
            }
        });
        
        return completedQuestions;
    };

    const isQuestionnaireDone = currentStep === sections.length - 1 && 
                               currentQuestionIndex === sections[currentStep].questions.length - 1;

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100">
            <DiscoveryNavbar 
                handlePrevious={handlePrevious}
                isFirstQuestion={currentStep === 0 && currentQuestionIndex === 0}
                completedQuestions={calculateCompletedQuestions()}
                totalQuestions={calculateTotalQuestions()}
                progress={calculateProgress()}
            />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-teal-900 mb-4">
                            {isQuestionnaireDone ? 'Upload Documents' : 'Health Questionnaire'}
                        </h1>
                        <p className="text-teal-600">
                            {isQuestionnaireDone 
                                ? 'Please upload any relevant medical documents'
                                : 'Help us understand your needs better'
                            }
                        </p>
                    </div>

                    {!isQuestionnaireDone ? (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {renderQuestion()}
                            {currentStep === sections.length - 1 && currentQuestionIndex === sections[currentStep].questions.length - 1 && (
                                <div className="flex justify-end mt-8 pt-4 border-t border-gray-200">
                                    <button 
                                        type="button"
                                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                        className="px-8 py-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition duration-200 flex items-center"
                                    >
                                        Next <span className="ml-2">→</span>
                                    </button>
                                </div>
                            )}
                        </form>
                    ) : (
                        <div className="bg-white rounded-lg p-8 shadow-lg">
                            <FileUpload />
                            <div className="mt-8 flex justify-end">
                                <button 
                                    onClick={handleSubmit}
                                    className="px-8 py-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition duration-200 flex items-center"
                                >
                                    Submit <span className="ml-2">✓</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
