import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-purple-800 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and Brief Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-300 to-blue-300 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-purple-900 font-bold text-lg">E</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full border-2 border-purple-800" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">
                ExamPrep
              </span>
            </Link>
            <p className="text-purple-200 text-sm">
              Making exam preparation fun and accessible for students across Nigeria.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3">
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            {/* Exams Column */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-3">Exams</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    Common Entrance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    Junior WAEC
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    WAEC/NECO
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    JAMB/UTME
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    Post-UTME
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Schools Column */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-3">For Schools</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/school-portal" className="text-purple-200 hover:text-white transition-colors">
                    School Portal
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    Teacher Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    Student Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    Content Upload
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-3">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-purple-200" />
                <a href="mailto:info@examprep.com" className="text-purple-200 hover:text-white transition-colors">
                  info@examprep.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-purple-200" />
                <a href="tel:+2348012345678" className="text-purple-200 hover:text-white transition-colors">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-purple-200 mt-1" />
                <span className="text-purple-200">
                  123 Education Avenue, Lagos, Nigeria
                </span>
              </li>
            </ul>
            <Button className="mt-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-purple-900 hover:from-yellow-400 hover:to-yellow-300 font-bold text-sm px-4 py-2 h-auto shadow-md transition-all hover:scale-105">
              Support Center
            </Button>
          </div>
        </div>

        {/* Bottom Section with CENTERED policy links */}
        <div className="mt-8 pt-6 border-t border-purple-700">
          {/* Policy Links - Now CENTERED */}
          <div className="flex justify-center mb-4">
            <div className="flex space-x-8 text-xs">
              <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
          
          {/* Copyright - Always at bottom */}
          <div className="text-center">
            <p className="text-purple-200 text-xs">&copy; {currentYear} ExamPrep. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}