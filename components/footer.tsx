import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-(--color-surface) border-t border-(--color-border) mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/image.png" alt="Safe Exam Browser" className="h-8 w-8" />
              <span className="font-bold text-(--color-primary)">Safe Exam Browser</span>
            </div>
            <p className="text-sm text-(--color-gray)">
              Open-source secure assessment solution for educational institutions worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-(--color-gray) mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/downloads"
                  className="text-sm text-(--color-gray-light) hover:text-(--color-primary) transition-colors"
                >
                  Downloads
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation"
                  className="text-sm text-(--color-gray-light) hover:text-(--color-primary) transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-(--color-gray-light) hover:text-(--color-primary) transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-(--color-gray) mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/SafeExamBrowser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-(--color-gray-light) hover:text-(--color-primary) transition-colors"
                >
                  GitHub Organization ↗
                </a>
              </li>
              <li>
                <Link
                  href="/alliance"
                  className="text-sm text-(--color-gray-light) hover:text-(--color-primary) transition-colors"
                >
                  SEB Alliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-(--color-border) text-center text-sm text-(--color-gray-light)">
          <p>
            © {currentYear} Safe Exam Browser. Released under the{" "}
            <a
              href="https://www.mozilla.org/en-US/MPL/2.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--color-primary) hover:underline"
            >
              Mozilla Public License 2.0
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
