import { Github, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-gray-400">Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          <span className="text-gray-400">using Next.js</span>
        </div>

        <div className="flex items-center justify-center gap-6 mb-6">
          <a
            href="https://github.com/erthorpabar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>

        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  )
}
