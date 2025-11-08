"use client"

import { useState, useEffect } from "react"

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), {
      threshold: 0.1,
    })
    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const stats = [
    {
      label: "Indexed Projects",
      value: "150",
      description: "Database Size",
      icon: "📚",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Projects Analyzed",
      value: "0",
      description: "Processed",
      icon: "⚡",
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Average Check Time",
      value: "<5s",
      description: "Speed",
      icon: "⏱️",
      color: "from-cyan-500 to-cyan-600",
    },
  ]

  return (
    <section
      id="stats-section"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 opacity-5">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          style={{ backgroundSize: "40px 40px" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
          <p className="text-xl text-gray-600">Our platform delivers industry-leading plagiarism detection results</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br ${stat.color} text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <p className="text-lg font-medium opacity-90 mb-1">{stat.description}</p>
                <p className="text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-base font-semibold">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
