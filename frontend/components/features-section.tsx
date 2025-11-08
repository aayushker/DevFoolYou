import { CheckCircle, Zap, Shield, TrendingUp, FileText, Brain } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "State-of-the-art algorithms for precise plagiarism identification",
      color: "from-blue-500 to-blue-600",
      lightColor: "from-blue-50 to-blue-100",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in seconds, not minutes with optimized processing",
      color: "from-purple-500 to-purple-600",
      lightColor: "from-purple-50 to-purple-100",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "End-to-end encryption ensures your project data stays private",
      color: "from-green-500 to-green-600",
      lightColor: "from-green-50 to-green-100",
    },
    {
      icon: TrendingUp,
      title: "Massive Database",
      description: "150+ projects indexed for comprehensive plagiarism checks",
      color: "from-indigo-500 to-indigo-600",
      lightColor: "from-indigo-50 to-indigo-100",
    },
    {
      icon: FileText,
      title: "Tech Stack Analysis",
      description: "Understand technology similarities between projects",
      color: "from-cyan-500 to-cyan-600",
      lightColor: "from-cyan-50 to-cyan-100",
    },
    {
      icon: CheckCircle,
      title: "Clear Reports",
      description: "Easy-to-understand reports with actionable insights",
      color: "from-orange-500 to-orange-600",
      lightColor: "from-orange-50 to-orange-100",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Key Features</h2>
          <p className="text-xl text-gray-600">Powered by advanced AI and a comprehensive database</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 hover:border-transparent cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.lightColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                {/* Icon with gradient background */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-110`}
                >
                  <Icon size={28} />
                </div>

                {/* Content */}
                <h3 className="relative z-10 text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>

                {/* Animated border on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl border-2 border-gradient-to-r from-blue-500 to-purple-500"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
