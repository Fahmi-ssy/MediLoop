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
        <div className="form-container">
            <h1>Health Questionnaire</h1>
            <form onSubmit={handleSubmit} className="health-form">

                <div className="form-group">
                    <label htmlFor="healthConcerns">
                        Do you have any specific concerns or questions about your health that you would like to address today?
                    </label>
                    <textarea
                        id="healthConcerns"
                        value={healthConcerns}
                        onChange={(e) => setHealthConcerns(e.target.value)}
                        rows={4}
                        placeholder="Enter your concerns"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="treatments">
                        Are there any treatments or medications you’ve tried in the past that have worked for you?
                    </label>
                    <textarea
                        id="treatments"
                        value={treatments}
                        onChange={(e) => setTreatments(e.target.value)}
                        rows={4}
                        placeholder="Enter any treatments or medications"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastPhysicalExam">
                        When was your last physical exam or health checkup?
                    </label>
                    <input
                        id="lastPhysicalExam"
                        type="date"
                        value={lastPhysicalExam}
                        onChange={(e) => setLastPhysicalExam(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="exerciseRoutine">
                        How is your physical activity or exercise routine?
                    </label>
                    <textarea
                        id="exerciseRoutine"
                        value={exerciseRoutine}
                        onChange={(e) => setExerciseRoutine(e.target.value)}
                        rows={4}
                        placeholder="Enter details about your exercise routine"
                    />
                </div>

                <button type="submit" className="submit-button">Submit</button>
            </form>

            <FileUpload /> 
        </div>
    );
}
