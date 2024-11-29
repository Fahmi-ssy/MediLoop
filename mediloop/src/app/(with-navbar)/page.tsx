import CardProduct from "@/components/CardProduct";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-teal-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-teal-950 mb-6">
          Welcome to MediLoop! Your Partner in Health and Wellness
          </h1>
          <p className="text-xl text-teal-800 mb-8">
            Get personalized medical recommendations and wellness products
            tailored to your needs
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition">
              Get Started
            </button>
            <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-full hover:bg-teal-50 transition">
              Learn More
            </button>
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
              Prescription Upload
            </h3>
            <p className="text-teal-700">
              Securely upload and store your prescriptions for easy access and
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
      <CardProduct />
    </main>
  );
}
