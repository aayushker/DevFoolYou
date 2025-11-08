"use client";

import { useState } from "react";
import AIInsights from "@/components/AIInsights";

interface SimilarProject {
  _id: string;
  urlOfProject: string;
  nameOfProject: string;
  descriptionOfProject: string;
  problemSolved: string;
  challengesFaced: string;
  technologiesUsed: string[];
  similarity_score: number;
}

interface AIVerdict {
  verdict: string;
  model: string;
  status: string;
  projects_analyzed: number;
}

interface SimilaritySearchResponse {
  status: string;
  message: string;
  results: SimilarProject[];
  count: number;
  ai_verdict: AIVerdict;
}

export default function SimilaritySearchPage() {
  const [projectUrl, setProjectUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] =
    useState<SimilaritySearchResponse | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/similarity/search-by-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: projectUrl }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to search for similar projects");
      }

      const data: SimilaritySearchResponse = await response.json();
      setSearchResults(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while searching");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Project Similarity Search
          </h1>
          <p className="text-lg text-gray-600">
            Find similar projects and get AI-powered insights
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label
                htmlFor="projectUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Project URL
              </label>
              <input
                type="url"
                id="projectUrl"
                required
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="https://devfolio.co/projects/your-project"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Search Similar Projects"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
        </div>

        {/* Results */}
        {searchResults && (
          <div className="space-y-8">
            {/* Summary Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {searchResults.message}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Status:{" "}
                    <span className="text-green-600 font-semibold">
                      {searchResults.status}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-indigo-600">
                    {searchResults.count}
                  </div>
                  <div className="text-sm text-gray-600">Similar Projects</div>
                </div>
              </div>
            </div>

            {/* AI Insights Component */}
            {searchResults.ai_verdict && (
              <AIInsights
                aiVerdict={searchResults.ai_verdict}
                similarProjects={searchResults.results}
              />
            )}

            {/* Similar Projects List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Similar Projects Details
              </h3>
              <div className="space-y-4">
                {searchResults.results.map((project, index) => (
                  <div
                    key={project._id}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow bg-gradient-to-r from-gray-50 to-white"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded">
                            #{index + 1}
                          </span>
                          <a
                            href={project.urlOfProject}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                          >
                            {project.nameOfProject}
                          </a>
                        </div>
                        <p className="text-gray-700 mb-2">
                          {project.descriptionOfProject}
                        </p>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-2xl font-bold text-indigo-600">
                          {(project.similarity_score * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">Similarity</div>
                      </div>
                    </div>

                    {project.technologiesUsed &&
                      project.technologiesUsed.length > 0 && (
                        <div className="mt-3">
                          <div className="text-sm font-medium text-gray-700 mb-2">
                            Technologies:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.technologiesUsed.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
