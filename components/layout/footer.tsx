import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-purple-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">ExamPrep</h2>
            <p className="text-purple-200">
              Your local solution for exam success in Nigeria. Prepare for Common Entrance, WAEC, JAMB, and more with
              our comprehensive platform.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white hover:bg-purple-700 rounded-full"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white hover:bg-purple-700 rounded-full"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white hover:bg-purple-700 rounded-full"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white hover:bg-purple-700 rounded-full"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Exams</h3>
            <ul className="space-y-2">
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
                  Senior WAEC/NECO
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

          <div>
            <h3 className="font-bold text-lg mb-4">For Schools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/school-portal" className="text-purple-200 hover:text-white transition-colors">
                  School Registration
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                  Teacher Portal
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                  Content Upload
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                  Student Management
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-purple-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-200 text-sm">&copy; {currentYear} ExamPrep. All rights reserved.</p>
            <div className="flex items-center mt-4 md:mt-0">
              <Mail className="h-4 w-4 mr-2 text-purple-200" />
              <a href="mailto:info@examprep.com" className="text-purple-200 hover:text-white transition-colors text-sm">
                info@examprep.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

