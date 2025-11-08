"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowRight, Loader, CheckCircle, AlertCircle } from "lucide-react"

export default function CheckPage() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!url.trim()) {
      setError("Please enter a valid URL")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("http://localhost:8080/api/similarity/search-by-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze project")
      }

      const data = await response.json()
      setSuccess(true)

      // Store results in session storage and redirect
      sessionStorage.setItem("plagiarismResults", JSON.stringify(data))

      // Small delay for success animation
      setTimeout(() => {
        router.push("/results")
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50 to-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="inline-block mb-6 p-4 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                <CheckCircle size={32} />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-3">Check Your Project</h1>
            <p className="text-xl text-gray-600">
              Verify the originality of your Devfolio project by providing the URL below
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 rounded-3xl p-10 mb-12 border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">Project URL</label>
                <p className="text-sm text-gray-600 mb-4">Paste your complete Devfolio project URL</p>
                <div className="relative">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://devfolio.co/projects/your-project-id"
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-600 outline-none text-gray-900 font-medium placeholder-gray-400 transition-all duration-300 hover:border-blue-400"
                    disabled={loading}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {!loading && <ArrowRight size={20} />}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3 font-medium">
                  URL Format: https://devfolio.co/projects/your-project-id
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl flex gap-3 items-start animate-shake">
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{error}</span>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border-2 border-green-200 text-green-700 px-5 py-4 rounded-xl flex gap-3 items-start animate-pulse">
                  <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Analysis complete! Redirecting...</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || success}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-105 text-lg"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={22} />
                    Analyzing Project...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle size={22} />
                    Analysis Complete!
                  </>
                ) : (
                  <>
                    Check for Plagiarism
                    <ArrowRight size={22} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "1", icon: "📤", title: "Submit URL", desc: "Enter your Devfolio project URL" },
                { step: "2", icon: "⚙️", title: "Analyze", desc: "We extract and process your project data" },
                { step: "3", icon: "📊", title: "Results", desc: "Get a detailed similarity report" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold flex-shrink-0 text-sm">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 border-2 border-blue-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Check?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: "✓", title: "Ensure project originality", color: "green" },
                { icon: "🛡️", title: "Protect your intellectual work", color: "blue" },
                { icon: "⚠️", title: "Avoid plagiarism concerns", color: "orange" },
                { icon: "⭐", title: "Build credibility and trust", color: "purple" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-colors cursor-pointer group"
                >
                  <div className="text-2xl flex-shrink-0 group-hover:scale-125 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6 flex gap-4 items-start">
            <div className="text-2xl flex-shrink-0">🔒</div>
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-bold text-gray-900">Your Security Matters:</span> Your project information is
                handled securely and only used for plagiarism detection purposes.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
