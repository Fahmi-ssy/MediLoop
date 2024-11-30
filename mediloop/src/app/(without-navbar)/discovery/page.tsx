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
      <div>
        <h2>{currentQuestion.label}</h2>
        {currentQuestion.options.map((option) => (
          <div key={option}>
            <input
              type="radio"
              id={option}
              name={currentQuestion.id}
              value={option}
              checked={
                formData[currentQuestion.id as keyof typeof formData] ===
                option
              }
              onChange={(e) =>
                handleInputChange(currentQuestion.id, e.target.value)
              }
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <DiscoveryNavbar />
      <h1>Discovery Questionnaire</h1>
      {!sections[currentStep] ? (
        <FileUpload />
      ) : (
        <form onSubmit={handleSubmit}>
          {renderQuestion()}
          <button type="button" onClick={handlePrevious}>
            Previous
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
          {currentStep === sections.length - 1 &&
            currentQuestionIndex ===
              sections[sections.length - 1].questions.length - 1 && (
              <button type="submit">Submit</button>
            )}
        </form>
      )}
    </div>
  );
}
