import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-(--color-surface) to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-5xl font-bold text-(--color-gray) leading-tight">
                  Secure Online Assessment <span className="text-(--color-primary)">Made Simple</span>
                </h1>
                <p className="text-xl text-(--color-gray-light) leading-relaxed">
                  Safe Exam Browser provides a trusted, open-source solution for conducting secure online exams. Used by
                  educational institutions worldwide.
                </p>
                <div className="flex gap-4 pt-4">
                  <Link
                    href="/downloads"
                    className="px-6 py-3 bg-(--color-primary) text-white rounded-xl font-semibold hover:bg-(--color-primary-dark) hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                  >
                    Download Now
                  </Link>
                  <Link
                    href="/documentation"
                    className="px-6 py-3 bg-white border-2 border-(--color-primary) text-(--color-primary) rounded-xl font-semibold hover:bg-(--color-surface) hover:scale-105 transition-all"
                  >
                    Documentation
                  </Link>
                </div>
              </div>
              <div className="flex justify-center animate-fade-in" style={{ animationDelay: "200ms" }}>
                <img
                  src="/images/image.png"
                  alt="Safe Exam Browser Logo"
                  className="w-80 h-80 object-contain hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-(--color-gray) mb-12">Why Choose Safe Exam Browser?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🔒",
                  title: "Secure Environment",
                  description: "Locks down the testing environment to prevent unauthorized access to resources.",
                },
                {
                  icon: "🌍",
                  title: "Cross-Platform",
                  description: "Available for Windows, macOS, and iOS/iPadOS devices.",
                },
                {
                  icon: "💰",
                  title: "Free & Open Source",
                  description: "Completely free to use under the Mozilla Public License 2.0.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-(--color-surface) hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-(--color-gray) mb-2">{feature.title}</h3>
                  <p className="text-(--color-gray-light) leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="py-20 bg-(--color-surface)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Link
                href="/downloads"
                className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💻</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-(--color-gray) mb-2 group-hover:text-(--color-primary) transition-colors">
                      For Students
                    </h3>
                    <p className="text-(--color-gray-light) mb-4 leading-relaxed">
                      Download the SEB Client for your device and start taking secure exams.
                    </p>
                    <span className="text-(--color-primary) font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                      Download Client
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href="/downloads?type=server"
                className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏫</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-(--color-gray) mb-2 group-hover:text-(--color-primary) transition-colors">
                      For Institutions
                    </h3>
                    <p className="text-(--color-gray-light) mb-4 leading-relaxed">
                      Deploy SEB Server or Screen Proctoring Server to manage secure exams.
                    </p>
                    <span className="text-(--color-primary) font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                      Download Server
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
