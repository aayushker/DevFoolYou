"use client"

import { useState } from "react"
import { Upload, Zap, BarChart3 } from "lucide-react"

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: "1",
      title: "Upload Project URL",
      description: "Simply paste your Devfolio project URL and let us handle the rest",
      icon: Upload,
      details: "Our system retrieves your project details securely",
    },
    {
      number: "2",
      title: "AI Analysis",
      description: "Our advanced algorithms extract key information and analyze against our database",
      icon: Zap,
      details: "Machine learning algorithms analyze your code and content",
    },
    {
      number: "3",
      title: "Get Results",
      description: "Receive detailed similarity analysis with potential matching projects",
      icon: BarChart3,
      details: "View similarity scores and matched projects",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 via-white to-blue-50 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Simple, fast, and secure plagiarism detection in 3 steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                onClick={() => setActiveStep(index)}
                className={`relative cursor-pointer transition-all duration-300 group`}
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-16 left-1/2 w-1/2 h-1 bg-gradient-to-r transition-all duration-300 ${
                      index < activeStep ? "from-blue-500 to-purple-500" : "from-transparent to-gray-300"
                    }`}
                  ></div>
                )}

                {/* Step card */}
                <div
                  className={`p-8 rounded-2xl border-2 transition-all duration-300 h-full ${
                    index === activeStep
                      ? "border-blue-600 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg transform scale-105"
                      : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                      index === activeStep
                        ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 group-hover:bg-blue-100"
                    }`}
                  >
                    <Icon size={28} />
                  </div>
                  <h3
                    className={`font-bold text-lg mb-2 transition-colors ${index === activeStep ? "text-gray-900" : "text-gray-700"}`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  {index === activeStep && <p className="text-xs text-blue-600 font-semibold">{step.details}</p>}
                </div>
              </div>
            )
          })}
        </div>

        {/* Detailed explanation */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 rounded-2xl p-8 border border-blue-200">
          <p className="text-gray-700 leading-relaxed text-center">
            <span className="font-semibold text-gray-900">{steps[activeStep].title}:</span> {steps[activeStep].details}
          </p>
        </div>
      </div>
    </section>
  )
}
