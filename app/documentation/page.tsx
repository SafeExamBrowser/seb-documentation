"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import docsData from "@/data/documentation.json"

export default function DocumentationPage() {
  const defaultSection = docsData.sections.find((s) => s.isDefault) || docsData.sections[0]
  const [selectedSection, setSelectedSection] = useState(defaultSection.id)
  const [selectedSubsection, setSelectedSubsection] = useState(defaultSection.subsections[0]?.id || "")
  const [searchQuery, setSearchQuery] = useState("")

  const currentSection = docsData.sections.find((s) => s.id === selectedSection)
  const currentSubsection = currentSection?.subsections.find((s) => s.id === selectedSubsection)

  const filteredSubsections = useMemo(() => {
    if (!currentSection) return []
    if (!searchQuery) return currentSection.subsections

    return currentSection.subsections.filter((subsection) =>
      subsection.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [currentSection, searchQuery])

  const renderContent = (content: any[]) => {
    return content.map((item, index) => {
      switch (item.type) {
        case "heading":
          return (
            <h2 key={index} className="text-2xl font-bold text-(--color-gray) mt-8 mb-4">
              {item.text}
            </h2>
          )
        case "paragraph":
          return (
            <p key={index} className="text-(--color-gray-light) mb-4 leading-relaxed">
              {item.text}
            </p>
          )
        case "list":
          return (
            <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-(--color-gray-light)">
              {item.items.map((listItem: string, i: number) => (
                <li key={i}>{listItem}</li>
              ))}
            </ul>
          )
        case "video":
          return (
            <div key={index} className="my-6 rounded-2xl overflow-hidden shadow-lg">
              <img src={item.url || "/placeholder.svg"} alt={item.caption} className="w-full h-auto" />
              <p className="text-sm text-(--color-gray-light) text-center py-3 bg-(--color-surface)">{item.caption}</p>
            </div>
          )
        case "image":
          return (
            <div key={index} className="my-6 rounded-2xl overflow-hidden shadow-lg">
              <img src={item.url || "/placeholder.svg"} alt={item.caption} className="w-full h-auto" />
              <p className="text-sm text-(--color-gray-light) text-center py-3 bg-(--color-surface)">{item.caption}</p>
            </div>
          )
        case "code":
          return (
            <pre key={index} className="bg-(--color-gray) text-white p-4 rounded-xl overflow-x-auto mb-4">
              <code>{item.code}</code>
            </pre>
          )
        default:
          return null
      }
    })
  }

  return (
    <>
      <Navigation />
      <main className="pt-16 min-h-screen bg-(--color-surface)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-(--color-gray) mb-4">Documentation</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-(--color-border) focus:border-(--color-primary) focus:outline-none transition-colors"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-gray-light)">🔍</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-md sticky top-20">
                <h3 className="font-bold text-(--color-gray) mb-4">Sections</h3>
                <div className="space-y-2 mb-6">
                  {docsData.sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setSelectedSection(section.id)
                        setSelectedSubsection(section.subsections[0]?.id || "")
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                        selectedSection === section.id
                          ? "bg-(--color-primary) text-white"
                          : "text-(--color-gray-light) hover:bg-(--color-surface)"
                      }`}
                    >
                      <span className="mr-2">{section.icon}</span>
                      {section.title}
                    </button>
                  ))}
                </div>

                {currentSection && (
                  <>
                    <h4 className="font-semibold text-(--color-gray) mb-3 text-sm">{currentSection.title} Topics</h4>
                    <div className="space-y-1">
                      {filteredSubsections.map((subsection) => (
                        <button
                          key={subsection.id}
                          onClick={() => setSelectedSubsection(subsection.id)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                            selectedSubsection === subsection.id
                              ? "bg-(--color-accent)/20 text-(--color-primary) font-medium"
                              : "text-(--color-gray-light) hover:bg-(--color-surface)"
                          }`}
                        >
                          {subsection.title}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-md animate-fade-in">
                {currentSubsection ? (
                  <>
                    <h2 className="text-3xl font-bold text-(--color-gray) mb-6">{currentSubsection.title}</h2>
                    <div>{renderContent(currentSubsection.content)}</div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-(--color-gray-light)">Select a topic to view documentation</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
