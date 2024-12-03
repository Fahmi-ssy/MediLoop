"use client";
import FileUpload from "@/components/Multer";
import React, { FormEvent, useState } from "react";
import DiscoveryNavbar from "@/components/DiscoveryNavbar";
import { useRouter } from "next/navigation";


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
  const [isQuestionnaireDone, setIsQuestionnaireDone] = useState(false);
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
  const [otherInputs, setOtherInputs] = useState<{ [key: string]: string }>({});
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    {
      title: "Lifestyle Focus",
      questions: [
        {
          id: "wellnessRecommendations",
          label: "Are you looking for wellness recommendations?",
          type: "radio",
          options: [
            "Yes, for Hair Care (e.g., hair loss, dry scalp)",
            "Yes, for Skin Care (e.g., acne, hydration)",
            "Yes, for Boosting Energy or Fitness",
            "Yes, for Stress Relief or Relaxation",
            "No, I'm only focused on resolving my current symptoms",
            "Other (Please specify: ________)",
          ],
        },
        {
          id: "dietaryRestrictions",
          label: "Do you have any dietary restrictions or preferences?",
          type: "radio",
          options: [
            "Vegetarian/Vegan",
            "Gluten-Free",
            "Lactose-Free",
            "No Restrictions",
            "Other (Please specify: ________)",
          ],
        },
      ],
    },
    {
      title: "Medical History and Preferences",
      questions: [
        {
          id: "medications",
          label: "Do you take any medications or supplements regularly?",
          type: "radio",
          options: [
            "Yes (Please list: ________)",
            "No",
            "Other (Please specify: ________)",
          ],
        },
        {
          id: "remedyPreference",
          label: "Do you prefer over-the-counter medicines or natural remedies?",
          type: "radio",
          options: [
            "Over-the-Counter Medicines",
            "Natural/Herbal Remedies",
            "Open to Both",
            "Other (Please specify: ________)",
          ],
        },
      ],
    },
    {
      title: "Specific Body Areas",
      questions: [
        {
          id: "bodyArea",
          label: "What part of your body are you most concerned about?",
          type: "radio",
          options: [
            "Head (e.g., headaches, hair problems)",
            "Chest (e.g., breathing issues, cold)",
            "Stomach (e.g., digestion, nausea)",
            "Skin (e.g., acne, dryness)",
            "Overall Wellness (e.g., fatigue, sleep)",
            "Other (Please specify: ________)",
          ],
        },
        {
          id: "lifestyleChanges",
          label: "Would you like us to suggest lifestyle changes?",
          type: "radio",
          options: [
            "Yes, please!",
            "No, just product recommendations",
            "Other (Please specify: ________)",
          ],
        },
      ],
    },
  ];

  const router = useRouter();

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const unanswered = sections.some((section) =>
      section.questions.some(
        (q) => !formData[q.id as keyof typeof formData]
      )
    );
    if (unanswered) {
      alert("Please answer all questions before proceeding.");
      return;
    }
    
    setIsQuestionnaireDone(true);
  };

  const renderQuestion = () => {
    const currentSection = sections[currentStep];
    const currentQuestion = currentSection.questions[currentQuestionIndex];

    function handleOtherInput(id: string, value: string) {
      throw new Error("Function not implemented.");
    }

    return (
      <div className="question-container">
        <h2 className="question-label">{currentQuestion.label}</h2>
        <div className="radio-group">
          {currentQuestion.options.map((option) => (
            <label
              key={option}
              className={`radio-option ${
                formData[currentQuestion.id as keyof typeof formData] === option ||
                (option === "Other" && formData[currentQuestion.id as keyof typeof formData]?.startsWith("Other:"))
                  ? "selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                className="radio-input"
                name={currentQuestion.id}
                value={option}
                checked={
                  option === "Other"
                    ? formData[currentQuestion.id as keyof typeof formData]?.startsWith("Other:")
                    : formData[currentQuestion.id as keyof typeof formData] === option
                }
                onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
              />
              <span className="radio-label">{option}</span>
              {option === "Other" && 
                formData[currentQuestion.id as keyof typeof formData]?.startsWith("Other:") && (
                  <input
                    type="text"
                    className="ml-4 p-2 border rounded-md flex-1"
                    placeholder="Please specify..."
                    value={otherInputs[currentQuestion.id] || ""}
                    onChange={(e) => {
                      if (typeof handleOtherInput === 'function') {
                        handleOtherInput(currentQuestion.id, e.target.value);
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
              )}
            </label>
          ))}
        </div>
      </div>
    );
  };

  const totalQuestions = sections.reduce((acc, section) => acc + section.questions.length, 0);
  const completedQuestions = currentStep * sections[currentStep]?.questions.length + currentQuestionIndex + 1;
  const progress = (completedQuestions / totalQuestions) * 100;
  const isFirstQuestion = currentStep === 0 && currentQuestionIndex === 0;

  const handleContinue = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const imageBase64 = localStorage.getItem('uploadedImageBase64');
      let recommendations = '';
      let embeddedProducts = [];
      let visionData = null;

      // Get embedded product recommendations
      const embeddingResponse = await fetch("/api/embedding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: Object.entries(formData)
            .map(([key, value]) => `${key}: ${value}`)
            .join(' ')
        }),
      });

      if (embeddingResponse.ok) {
        const embeddingData = await embeddingResponse.json();
        embeddedProducts = embeddingData.documents || [];
      }

      if (imageBase64) {
        const visionResponse = await fetch("/api/vision", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            imageData: imageBase64,
            formData 
          }),
        });

        if (!visionResponse.ok) {
          throw new Error("Error analyzing image");
        }

        visionData = await visionResponse.json();
        if (visionData.error) {
          throw new Error(visionData.error);
        }
        recommendations = visionData.analysis;
      }

      if (!recommendations) {
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Error getting recommendations");
        }

        const data = await response.json();
        recommendations = data.recommendations;
      }

      if (!recommendations && !embeddedProducts.length) {
        throw new Error("No recommendations received");
      }

      const recommendationsData = {
        recommendations: recommendations,
        embeddedProducts: embeddedProducts,
        imageAnalysis: imageBase64 && visionData ? visionData.imageAnalysis : null
      };
      
      const encodedRecommendations = encodeURIComponent(
        JSON.stringify(recommendationsData)
      ).replace(/%20/g, '+');
      
      router.push(`/recommendation?recommendations=${encodedRecommendations}`);
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DiscoveryNavbar 
        handlePrevious={handlePrevious}
        isFirstQuestion={isFirstQuestion}
        completedQuestions={completedQuestions}
        totalQuestions={totalQuestions}
        progress={progress}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          Discovery Questionnaire
        </h1>
        {!isQuestionnaireDone ? (
          <form onSubmit={handleSubmit} className="wizard-container">
            {renderQuestion()}
            <div className="wizard-navigation">
              {currentStep === sections.length - 1 &&
                currentQuestionIndex === sections[sections.length - 1].questions.length - 1 && (
                  <button type="submit" className="submit-button">
                    Continue to Upload
                  </button>
                )}
            </div>
          </form>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Upload Your Prescription or Medical Report
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                Please upload a medical document or photo for more accurate recommendations
              </p>
            </div>
            <FileUpload onFileUploadSuccess={() => setFileUploaded(true)} />
            <div className="flex justify-center mt-6 sm:mt-8">
              {error && (
                <div className="text-red-500 mb-4 text-center">
                  {error}
                </div>
              )}
              <button
                onClick={handleContinue}
                disabled={!fileUploaded || isLoading}
                className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200 
                  ${fileUploaded && !isLoading
                    ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                    : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}
              >
                {isLoading 
                  ? 'Processing...' 
                  : fileUploaded 
                    ? 'Submit and Get Recommendations' 
                    : 'Please Upload a File First'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
