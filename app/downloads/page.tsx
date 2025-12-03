"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import downloadsData from "@/data/downloads.json"

export default function DownloadsPage() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get("type")

  const [selectedType, setSelectedType] = useState<"client" | "server">(typeParam === "server" ? "server" : "client")
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  useEffect(() => {
    if (selectedType === "client" && downloadsData.client.platforms.length > 0) {
      setSelectedPlatform(downloadsData.client.platforms[0].id)
    } else if (selectedType === "server" && downloadsData.server.products.length > 0) {
      setSelectedProduct(downloadsData.server.products[0].id)
    }
  }, [selectedType])

  const renderClientDownloads = () => {
    const platform = downloadsData.client.platforms.find((p) => p.id === selectedPlatform)
    if (!platform) return null

    return (
      <div className="animate-fade-in">
        <h3 className="text-2xl font-bold text-(--color-gray) mb-6">{platform.name}</h3>
        <div className="space-y-4">
          {platform.versions.map((version, index) => (
            <div
              key={version.version}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg animate-slide-in ${
                version.isLatest
                  ? "border-(--color-primary) bg-gradient-to-r from-(--color-primary)/5 to-(--color-accent)/5"
                  : "border-(--color-border) bg-white hover:border-(--color-primary-light)"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-bold text-(--color-gray)">Version {version.version}</h4>
                    {version.isLatest && (
                      <span className="px-3 py-1 bg-(--color-accent) text-white text-sm font-semibold rounded-full">
                        Latest
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-(--color-gray-light) mb-2">
                    Released: {new Date(version.releaseDate).toLocaleDateString()}
                  </p>
                  <p className="text-(--color-gray) mb-2">{version.changelog}</p>
                  {version.requirements && (
                    <p className="text-sm text-(--color-gray-light)">Requirements: {version.requirements}</p>
                  )}
                </div>
                <a
                  href={version.downloadUrl}
                  className="px-6 py-3 bg-(--color-primary) text-white rounded-xl font-semibold hover:bg-(--color-primary-dark) hover:scale-105 transition-all whitespace-nowrap shadow-md hover:shadow-lg"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderServerDownloads = () => {
    const product = downloadsData.server.products.find((p) => p.id === selectedProduct)
    if (!product) return null

    return (
      <div className="animate-fade-in">
        <h3 className="text-2xl font-bold text-(--color-gray) mb-2">{product.name}</h3>
        <p className="text-(--color-gray-light) mb-6">{product.description}</p>
        <div className="space-y-4">
          {product.versions.map((version, index) => (
            <div
              key={version.version}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg animate-slide-in ${
                version.isLatest
                  ? "border-(--color-primary) bg-gradient-to-r from-(--color-primary)/5 to-(--color-accent)/5"
                  : "border-(--color-border) bg-white hover:border-(--color-primary-light)"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-bold text-(--color-gray)">Version {version.version}</h4>
                    {version.isLatest && (
                      <span className="px-3 py-1 bg-(--color-accent) text-white text-sm font-semibold rounded-full">
                        Latest
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-(--color-gray-light) mb-2">
                    Released: {new Date(version.releaseDate).toLocaleDateString()}
                  </p>
                  <p className="text-(--color-gray) mb-2">{version.changelog}</p>
                  {version.requirements && (
                    <p className="text-sm text-(--color-gray-light)">Requirements: {version.requirements}</p>
                  )}
                </div>
                <a
                  href={version.downloadUrl}
                  className="px-6 py-3 bg-(--color-primary) text-white rounded-xl font-semibold hover:bg-(--color-primary-dark) hover:scale-105 transition-all whitespace-nowrap shadow-md hover:shadow-lg"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <Navigation />
      <main className="pt-16 min-h-screen bg-(--color-surface)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-(--color-gray) mb-4">Downloads</h1>
          <p className="text-xl text-(--color-gray-light) mb-12 leading-relaxed">
            Download the appropriate version for your needs
          </p>

          {/* Type Selector */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setSelectedType("client")}
              className={`flex-1 p-6 rounded-2xl border-2 transition-all duration-300 ${
                selectedType === "client"
                  ? "border-(--color-primary) bg-white shadow-lg scale-105"
                  : "border-(--color-border) bg-white hover:border-(--color-primary-light) hover:shadow-md"
              }`}
            >
              <div className="text-3xl mb-2">💻</div>
              <h3 className="text-xl font-bold text-(--color-gray) mb-1">{downloadsData.client.title}</h3>
              <p className="text-sm text-(--color-gray-light)">{downloadsData.client.description}</p>
            </button>

            <button
              onClick={() => setSelectedType("server")}
              className={`flex-1 p-6 rounded-2xl border-2 transition-all duration-300 ${
                selectedType === "server"
                  ? "border-(--color-primary) bg-white shadow-lg scale-105"
                  : "border-(--color-border) bg-white hover:border-(--color-primary-light) hover:shadow-md"
              }`}
            >
              <div className="text-3xl mb-2">🏫</div>
              <h3 className="text-xl font-bold text-(--color-gray) mb-1">{downloadsData.server.title}</h3>
              <p className="text-sm text-(--color-gray-light)">{downloadsData.server.description}</p>
            </button>
          </div>

          {/* Platform/Product Selector */}
          {selectedType === "client" && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-(--color-gray) mb-4">Select Your Platform</h2>
              <div className="flex gap-3">
                {downloadsData.client.platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      selectedPlatform === platform.id
                        ? "bg-(--color-primary) text-white shadow-md"
                        : "bg-white text-(--color-gray) border-2 border-(--color-border) hover:border-(--color-primary)"
                    }`}
                  >
                    <span className="mr-2">{platform.icon}</span>
                    {platform.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedType === "server" && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-(--color-gray) mb-4">Select Product</h2>
              <div className="flex gap-3">
                {downloadsData.server.products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      selectedProduct === product.id
                        ? "bg-(--color-primary) text-white shadow-md"
                        : "bg-white text-(--color-gray) border-2 border-(--color-border) hover:border-(--color-primary)"
                    }`}
                  >
                    {product.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Download List */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            {selectedType === "client" && renderClientDownloads()}
            {selectedType === "server" && renderServerDownloads()}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
