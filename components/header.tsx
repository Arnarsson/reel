"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex-1 basis-0">
            <Link href="/" className="text-xl font-bold">
              Ethos.ai
            </Link>
          </div>

          <nav className="hidden md:flex justify-center flex-1">
            <div className="flex items-center space-x-8 mx-auto">
              <Link href="#method" className="text-gray-400 hover:text-white transition-colors">
                Vores metode
              </Link>
              <Link href="#results" className="text-gray-400 hover:text-white transition-colors">
                Resultater
              </Link>
              <Link href="#team" className="text-gray-400 hover:text-white transition-colors">
                Team
              </Link>
              <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                Kontakt
              </Link>
            </div>
          </nav>

          <div className="hidden md:flex flex-1 basis-0 justify-end">
            <Button className="bg-white text-black hover:bg-gray-100">
              Book en samtale
            </Button>
          </div>

          <button
            className="md:hidden ml-auto p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link href="#method" className="text-gray-400 hover:text-white transition-colors">
                Vores metode
              </Link>
              <Link href="#results" className="text-gray-400 hover:text-white transition-colors">
                Resultater
              </Link>
              <Link href="#team" className="text-gray-400 hover:text-white transition-colors">
                Team
              </Link>
              <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                Kontakt
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button className="bg-white text-black hover:bg-gray-100">
                  Book en samtale
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
