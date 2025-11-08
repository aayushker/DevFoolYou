export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="font-bold text-xl text-white">DevFoolYou</span>
            </div>
            <p className="text-sm">Detect plagiarism with confidence.</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-blue-400 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-400 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/check" className="hover:text-blue-400 transition">
                  Check Project
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-blue-400 transition">
                  About
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-400 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-400 transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-blue-400 transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-400 transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm">© 2025 DevFoolYou. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
