import { Video } from "lucide-react"
import Link from "next/link"

export const Header = () => {
    return (
        <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
          <Link href="/" className="text-gray-900 flex items-center space-x-2">
                <Video className="size-8 text-blue-600" />
                <h1 className="text-xl/7 font-bold text-gray-900">Meetcheck</h1>
            </Link>
            <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </header>
    )
}