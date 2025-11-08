"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArrowLeft, ExternalLink, TrendingUp } from "lucide-react";
import Link from "next/link";

interface SimilarProject {
  _id: string;
  urlOfProject: string;
  nameOfProject: string;
  descriptionOfProject: string;
  technologiesUsed: string[];
  similarity_score: number;
}

interface AIVerdict {
  verdict: string;
  model: string;
  status: string;
  projects_analyzed: number;
}

interface ResultsData {
  status: string;
  message: string;
  results: SimilarProject[];
  count: number;
  ai_verdict?: AIVerdict;
}

export default function ResultsPage() {
  const [results, setResults] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedResults = sessionStorage.getItem("plagiarismResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
    setLoading(false);
  }, []);

  const getSimilarityColor = (score: number) => {
    if (score >= 0.7) return "text-red-600";
    if (score >= 0.5) return "text-yellow-600";
    return "text-green-600";
  };

  const getSimilarityBg = (score: number) => {
    if (score >= 0.7) return "bg-gradient-to-br from-red-50 to-red-100";
    if (score >= 0.5) return "bg-gradient-to-br from-yellow-50 to-yellow-100";
    return "bg-gradient-to-br from-green-50 to-green-100";
  };

  const getSimilarityLabel = (score: number) => {
    if (score >= 0.7) return "High";
    if (score >= 0.5) return "Moderate";
    return "Low";
  };

  const getSimilarityGradient = (score: number) => {
    if (score >= 0.7) return "from-red-600 to-red-500";
    if (score >= 0.5) return "from-yellow-600 to-yellow-500";
    return "from-green-600 to-green-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mb-4"></div>
          </div>
          <p className="text-gray-600 font-medium">Preparing your results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-24 pb-20">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              No Results Found
            </h1>
            <p className="text-gray-600 mb-6">Please check a project first</p>
            <Link
              href="/check"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition"
            >
              Back to Check
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const avgSimilarity =
    results.results.reduce((sum, r) => sum + r.similarity_score, 0) /
    results.results.length;
  const maxSimilarity = Math.max(
    ...results.results.map((r) => r.similarity_score)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50 to-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/check"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-semibold hover:gap-3 transition-all group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Check Another Project
          </Link>

          <div className="mb-12">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
              Analysis Results
            </h1>
            <p className="text-xl text-gray-600">{results.message}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                label: "Total Matches",
                value: results.results.length,
                icon: "📌",
                gradient: "from-blue-50 to-blue-100",
                borderColor: "border-blue-300",
              },
              {
                label: "Average Similarity",
                value: `${(avgSimilarity * 100).toFixed(1)}%`,
                icon: "📊",
                gradient: "from-purple-50 to-purple-100",
                borderColor: "border-purple-300",
              },
              {
                label: "Highest Match",
                value: `${(maxSimilarity * 100).toFixed(1)}%`,
                icon: "⚠️",
                gradient: "from-orange-50 to-orange-100",
                borderColor: "border-orange-300",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${stat.gradient} border-2 ${stat.borderColor} rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group cursor-pointer hover:-translate-y-2`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      {stat.label}
                    </p>
                    <p className="text-4xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className="text-3xl group-hover:scale-125 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Summary Section */}
          {results.ai_verdict && results.ai_verdict.status === "success" && (
            <div className="mb-12 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200 hover:border-purple-300 transition-all duration-300">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 px-8 py-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-1">
                        AI-Powered Analysis Summary
                      </h2>
                      <p className="text-purple-100 text-sm font-medium">
                        Analyzed {results.ai_verdict.projects_analyzed} projects
                        using{" "}
                        <span className="font-bold text-white">
                          {results.ai_verdict.model}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white font-bold text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      AI Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="space-y-6">
                  {results.ai_verdict.verdict.split("\n").map((line, index) => {
                    const trimmedLine = line.trim();

                    if (!trimmedLine) return null;

                    // Check if it's a header (starts with *)
                    if (
                      trimmedLine.startsWith("*") &&
                      trimmedLine.includes("**")
                    ) {
                      const headerText = trimmedLine.replace(/\*+/g, "").trim();
                      const [title, ...contentParts] = headerText.split(":");
                      const content = contentParts.join(":").trim();

                      let IconComponent = null;
                      let iconColor = "text-purple-600";
                      let bgColor = "from-purple-50 to-purple-100";
                      let borderColor = "border-purple-200";

                      if (title.toLowerCase().includes("similarity")) {
                        IconComponent = (
                          <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        );
                        iconColor = "text-purple-600";
                        bgColor = "from-purple-50 to-purple-100";
                        borderColor = "border-purple-200";
                      } else if (title.toLowerCase().includes("key")) {
                        IconComponent = (
                          <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                            />
                          </svg>
                        );
                        iconColor = "text-blue-600";
                        bgColor = "from-blue-50 to-blue-100";
                        borderColor = "border-blue-200";
                      } else if (title.toLowerCase().includes("technology")) {
                        IconComponent = (
                          <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            />
                          </svg>
                        );
                        iconColor = "text-green-600";
                        bgColor = "from-green-50 to-green-100";
                        borderColor = "border-green-200";
                      }

                      return (
                        <div
                          key={index}
                          className={`group bg-gradient-to-br ${bgColor} rounded-2xl p-6 border-2 ${borderColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`${iconColor} bg-white p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300`}
                            >
                              {IconComponent}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                {title}
                                <span className="text-2xl">✨</span>
                              </h3>
                              {content && (
                                <p className="text-gray-700 leading-relaxed text-base font-medium">
                                  {content}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>

                {/* Common Technologies */}
                {results.results && results.results.length > 0 && (
                  <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border-2 border-indigo-100 hover:shadow-xl transition-all duration-300">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <svg
                        className="w-6 h-6 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                        />
                      </svg>
                      Common Technologies Detected
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(
                        new Set(
                          results.results
                            .flatMap((p) => p.technologiesUsed || [])
                            .filter(Boolean)
                        )
                      )
                        .slice(0, 20)
                        .map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-sm font-semibold border-2 border-indigo-200 hover:border-indigo-400 hover:scale-105 transition-all duration-200 cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {/* AI Model Attribution */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>
                    Powered by{" "}
                    <strong className="text-purple-600">
                      {results.ai_verdict.model}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Similar Projects Found
              </h2>
              <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                {results.results.length} result
                {results.results.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-6">
              {results.results.map((project, index) => (
                <div
                  key={project._id}
                  className={`group ${getSimilarityBg(
                    project.similarity_score
                  )} border-2 border-gray-200 hover:border-transparent rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-r from-blue-600 to-purple-600 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                      {/* Left content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-block bg-white text-gray-700 text-xs font-bold px-3 py-1 rounded-full ring-1 ring-gray-300">
                            Match #{index + 1}
                          </span>
                          <span
                            className={`inline-block font-bold text-sm px-4 py-1 rounded-full ${getSimilarityColor(
                              project.similarity_score
                            )} bg-white ring-2 ring-offset-1`}
                          >
                            {getSimilarityLabel(project.similarity_score)}{" "}
                            Similarity
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                          {project.nameOfProject}
                        </h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {project.descriptionOfProject}
                        </p>

                        {/* Technologies */}
                        <div className="mb-4">
                          <p className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">
                            Technologies
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologiesUsed.map((tech, i) => (
                              <span
                                key={i}
                                className="inline-block bg-white text-gray-700 px-3 py-1 rounded-lg text-sm font-medium ring-1 ring-gray-300 group-hover:ring-blue-400 group-hover:bg-blue-50 transition-all duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* View project link */}
                        <a
                          href={project.urlOfProject}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group/link"
                        >
                          View Full Project
                          <ExternalLink
                            size={16}
                            className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                          />
                        </a>
                      </div>

                      {/* Similarity visualization */}
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="relative w-28 h-28 mb-3">
                          <svg
                            className="w-full h-full transform -rotate-90"
                            viewBox="0 0 100 100"
                          >
                            {/* Background circle */}
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="8"
                            />
                            {/* Progress circle */}
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="url(#gradientCircle)"
                              strokeWidth="8"
                              strokeDasharray={`${(
                                2 *
                                Math.PI *
                                45 *
                                project.similarity_score
                              ).toFixed(1)} ${(2 * Math.PI * 45).toFixed(1)}`}
                              strokeLinecap="round"
                            />
                            <defs>
                              <linearGradient
                                id="gradientCircle"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop
                                  offset="0%"
                                  stopColor={
                                    getSimilarityGradient(
                                      project.similarity_score
                                    ).split(" ")[0] === "from-red-600"
                                      ? "#dc2626"
                                      : getSimilarityGradient(
                                          project.similarity_score
                                        ).split(" ")[0] === "from-yellow-600"
                                      ? "#ca8a04"
                                      : "#22c55e"
                                  }
                                />
                                <stop
                                  offset="100%"
                                  stopColor={
                                    getSimilarityGradient(
                                      project.similarity_score
                                    ).split(" ")[1] === "to-red-500"
                                      ? "#ef4444"
                                      : getSimilarityGradient(
                                          project.similarity_score
                                        ).split(" ")[1] === "to-yellow-500"
                                      ? "#eab308"
                                      : "#84cc16"
                                  }
                                />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span
                            className={`absolute inset-0 flex items-center justify-center font-bold text-2xl ${getSimilarityColor(
                              project.similarity_score
                            )}`}
                          >
                            {(project.similarity_score * 100).toFixed(0)}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
                          Similarity
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/check"
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <TrendingUp size={20} />
              Check Another Project
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-gray-200 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
