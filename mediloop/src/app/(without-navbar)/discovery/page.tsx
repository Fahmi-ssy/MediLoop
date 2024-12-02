"use client";
import FileUpload from "@/components/Multer";
import React, { useState } from "react";
import DiscoveryNavbar from "@/components/DiscoveryNavbar";

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
    currentSymptoms: "",
    symptomsStart: "",
    symptomsSeverity: "",
    otherSymptoms: "",
    wellnessRecommendations: "",
    dietaryRestrictions: "",
    otherDietary: "",
    medications: "",
    remedyPreference: "",
    otherMedications: "",
    bodyArea: "",
    lifestyleChanges: "",
    otherConcerns: "",
  });

  const sections: Section[] = [
    {
      title: "Symptom Focus",
      questions: [
        {
          id: "currentSymptoms",
          label: "What symptoms are you currently experiencing?",
          type: "radio",
          options: [
            "Skin Problems (e.g., acne, dryness, rash)",
            "Hair Loss or Dandruff",
            "Other",
          ],
        },
        {
          id: "symptomsStart",
          label: "When did the symptoms start?",
          type: "radio",
          options: [
            "Today",
            "1–3 Days Ago",
            "A Week or More Ago",
            "Other",
          ],
        },
        {
          id: "symptomsSeverity",
          label: "How severe are your symptoms?",
          type: "radio",
          options: [
            "Mild (Doesn't interfere with daily life)",
            "Moderate (Somewhat disruptive)",
            "Severe (Significantly impacts daily activities)",
            "Other",
          ],
        },
      ],
    },
    // Add other sections similarly
  ];

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (value && value !== "Other") {
      setTimeout(() => {
        const currentSection = sections[currentStep];
        if (currentQuestionIndex < currentSection.questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else if (currentStep < sections.length - 1) {
          setCurrentStep((prev) => prev + 1);
          setCurrentQuestionIndex(0);
        }
      }, 300);
    }
  };

  const handleNext = () => {
    const currentSection = sections[currentStep];
    const currentQuestion = currentSection.questions[currentQuestionIndex];
    if (!formData[currentQuestion.id as keyof typeof formData]) {
      alert("Please select an option before proceeding.");
      return;
    }

    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentStep < sections.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setCurrentQuestionIndex(
        sections[currentStep - 1].questions.length - 1
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const unanswered = sections.some((section) =>
      section.questions.some(
        (q) => !formData[q.id as keyof typeof formData]
      )
    );
    if (unanswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error submitting answers");
      }
      const data = await response.json();
      console.log("Recommendations:", data.recommendations);
    } catch (error) {
      console.error(error);
    }
  };

  const renderQuestion = () => {
    const currentSection = sections[currentStep];
    const currentQuestion = currentSection.questions[currentQuestionIndex];

    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {currentQuestion.label}
        </h2>
        <div className="space-y-4">
          {currentQuestion.options.map((option) => (
            <div
              key={option}
              className="relative flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleInputChange(currentQuestion.id, option)}
            >
              <input
                type="radio"
                id={option}
                name={currentQuestion.id}
                value={option}
                checked={
                  formData[currentQuestion.id as keyof typeof formData] === option
                }
                onChange={(e) =>
                  handleInputChange(currentQuestion.id, e.target.value)
                }
                className="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
              />
              <label
                htmlFor={option}
                className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DiscoveryNavbar
        handlePrevious={handlePrevious}
        isFirstQuestion={currentStep === 0 && currentQuestionIndex === 0}
        completedQuestions={
          currentStep * sections[0].questions.length + currentQuestionIndex + 1
        }
        totalQuestions={
          sections.reduce((acc, section) => acc + section.questions.length, 0)
        }
        progress={
          ((currentStep * sections[0].questions.length + currentQuestionIndex + 1) /
            sections.reduce((acc, section) => acc + section.questions.length, 0)) *
          100
        }
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Discovery Questionnaire
        </h1>
        
        <div className="transition-all duration-300 ease-in-out">
          {!sections[currentStep] ? (
            <FileUpload />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {renderQuestion()}
              
              <div className="flex justify-between items-center mt-8 px-4">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-2.5 text-sm font-medium text-teal-700 bg-white border border-teal-600 rounded-full hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Previous
                </button>
                
                {currentStep === sections.length - 1 &&
                currentQuestionIndex === sections[sections.length - 1].questions.length - 1 ? (
                  <button
                    type="submit"
                    className="px-8 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-full hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-full hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Next
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
