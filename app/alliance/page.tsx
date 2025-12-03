import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import allianceData from "@/data/alliance.json"

export default function AlliancePage() {
  return (
    <>
      <Navigation />
      <main className="pt-16 min-h-screen bg-(--color-surface)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-(--color-gray) mb-4">{allianceData.title}</h1>
          <p className="text-xl text-(--color-gray-light) mb-12 leading-relaxed">{allianceData.description}</p>

          {/* Mission */}
          <div className="bg-gradient-to-r from-(--color-primary)/10 to-(--color-accent)/10 rounded-2xl p-8 mb-12 border-2 border-(--color-primary)/20 animate-fade-in">
            <h2 className="text-2xl font-bold text-(--color-gray) mb-4">Our Mission</h2>
            <p className="text-(--color-gray-light) leading-relaxed text-lg">{allianceData.mission}</p>
          </div>

          {/* Contributors */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-(--color-gray) mb-6">Key Contributors</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {allianceData.contributors.map((contributor, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{contributor.logo}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-(--color-gray) mb-1">{contributor.name}</h3>
                      <p className="text-sm text-(--color-primary) font-medium mb-2">{contributor.role}</p>
                      <p className="text-sm text-(--color-gray-light)">{contributor.country}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Source */}
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="text-3xl font-bold text-(--color-gray) mb-4">{allianceData.opensource.title}</h2>
            <p className="text-(--color-gray-light) leading-relaxed mb-6">{allianceData.opensource.description}</p>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-(--color-gray)">GitHub Repositories</h3>
              {allianceData.opensource.repositories.map((repo, index) => (
                <a
                  key={index}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl border-2 border-(--color-border) hover:border-(--color-primary) hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-(--color-gray) group-hover:text-(--color-primary) transition-colors">
                        {repo.name}
                      </h4>
                      <p className="text-sm text-(--color-gray-light)">{repo.description}</p>
                    </div>
                    <span className="text-(--color-primary) group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-(--color-border)">
              <a
                href={allianceData.opensource.githubOrg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-(--color-gray) text-white rounded-xl font-semibold hover:bg-(--color-gray-light) transition-all hover:scale-105"
              >
                View All Repositories on GitHub
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
