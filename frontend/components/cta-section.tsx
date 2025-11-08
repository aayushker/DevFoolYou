import Link from "next/link"

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Safeguard Your Projects?</h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of developers who trust our platform to verify their project originality
        </p>
        <Link
          href="/check"
          className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
        >
          Start Free Check Now
        </Link>
      </div>
    </section>
  )
}
