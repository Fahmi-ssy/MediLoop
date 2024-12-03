"use client";

export default function About() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto font-sans">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    About MediLoop
                </h1>
                <p className="text-lg text-gray-700 text-center mb-8">
                    MediLoop is more than just a platform—it's a journey towards healthier living, inspired by a passion for innovation and a commitment to making health solutions accessible to everyone.
                </p>
                <div className="mb-12">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        Why MediLoop Was Founded
                    </h2>
                    <p className="text-gray-600 text-justify mb-4">
                        MediLoop started as the final project of dedicated students at Hacktiv8, under the guidance of their instructor, Priambodo Kurniawan. This capstone project was not only a step toward graduation but also a way to equip students with the skills and experience needed for a successful career in the tech industry. The platform embodies their hard work, collaboration, and desire to create impactful technology solutions. 
                    </p>
                    <blockquote className="text-xl font-bold text-gray-800 italic text-center">
                        "This is more than a project—it's a leap into the future of personalized healthcare."
                    </blockquote>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 mb-4">
                            MediLoop aims to guide users toward a healthier lifestyle by combining advanced technology with tailored recommendations for both medical and wellness needs. 
                        </p>
                        <p className="text-gray-600">
                            Whether you're recovering from an illness or seeking to enhance your well-being, MediLoop is here to support you every step of the way.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            How MediLoop Works
                        </h2>
                        <ul className="list-disc pl-5 text-gray-600 space-y-2">                            
                            <li>Symptom input or prescription uploads using Multer.</li>
                            <li>OpenApi Vision for accurate identification of medicines or wellness products.</li>
                            <li>OpenAI-powered diagnoses and personalized recommendations.</li>
                            <li>Suggestions for lifestyle changes, including hair care, supplements, and other health products.</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        Built with Passion and Innovation
                    </h2>
                    <p className="text-gray-600 text-center">
                        MediLoop combines cutting-edge technology with a user-centered approach to provide seamless, tailored health solutions. 
                    </p>
                </div>
            </div>
        </div>
    );
}
