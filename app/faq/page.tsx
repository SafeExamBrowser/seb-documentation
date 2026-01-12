"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import faqData from "@/data/faq.json"

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const id = `${categoryId}-${questionIndex}`
    setOpenQuestion(openQuestion === id ? null : id)
  }

  return (
    <>
      <Navigation />
      <main className="pt-16 min-h-screen bg-(--color-surface)">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-(--color-gray) mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-(--color-gray-light) mb-12 leading-relaxed">
            Find answers to common questions about Safe Exam Browser
          </p>

          <div className="space-y-8">
            {faqData.categories.map((category, categoryIndex) => (
              <div key={category.id} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
                <h2 className="text-2xl font-bold text-(--color-gray) mb-4">{category.title}</h2>
                <div className="space-y-3">
                  {category.questions.map((item, questionIndex) => {
                    const id = `${category.id}-${questionIndex}`
                    const isOpen = openQuestion === id

                    return (
                      <div
                        key={questionIndex}
                        className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                      >
                        <button
                          onClick={() => toggleQuestion(category.id, questionIndex)}
                          className="w-full cursor-pointer px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-(--color-surface) transition-colors"
                        >
                          <span className="font-semibold text-(--color-gray)">{item.question}</span>
                          <span
                            className={`text-(--color-primary) text-2xl transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          >
                            ↓
                          </span>
                        </button>
                        <div
                          className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96" : "max-h-0"}`}
                        >
                          <div className="px-6 pb-4 text-(--color-gray-light) leading-relaxed">{item.answer}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-white rounded-2xl shadow-md text-center">
            <h3 className="text-2xl font-bold text-(--color-gray) mb-4">Still Have Questions?</h3>
            <p className="text-(--color-gray-light) mb-6 leading-relaxed">
              Can't find the answer you're looking for? Check our documentation or reach out to the community.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/documentation"
                className="px-6 py-3 bg-(--color-primary) text-white rounded-xl font-semibold hover:bg-(--color-primary-dark) hover:scale-105 transition-all"
              >
                View Documentation
              </a>
              <a
                href="https://github.com/SafeExamBrowser"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white border-2 border-(--color-primary) text-(--color-primary) rounded-xl font-semibold hover:bg-(--color-surface) hover:scale-105 transition-all"
              >
                GitHub Discussions ↗
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
