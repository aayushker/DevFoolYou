"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, Zap } from "lucide-react"

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-4 py-2 animate-pulse">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-semibold text-gray-700">AI-Powered Detection Engine</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
          Detect Project{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient">
            Plagiarism
          </span>{" "}
          with Confidence
        </h1>

        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
          Ensure the originality of Devfolio projects with our advanced AI-powered plagiarism detection system. Protect
          your intellectual work and build credibility.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            href="/check"
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <Zap size={20} />
            Check Your Project Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
            Learn More
          </button>
        </div>

        <div
          className="grid grid-cols-3 gap-8 mt-16 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          {[
            { icon: "⚡", label: "Lightning Fast", value: "<30s" },
            { icon: "🎯", label: "99% Accurate", value: "AI Model" },
            { icon: "🔒", label: "Secure & Private", value: "End-to-End" },
          ].map((stat, i) => (
            <div key={i} className="hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="font-semibold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
