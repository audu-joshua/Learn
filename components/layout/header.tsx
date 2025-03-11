"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Bell,  
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  BookOpen, 
  GraduationCap,
  School,
  Building
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Profile } from "@/lib/supabase"
import { AnimatePresence, motion } from "framer-motion"

export function Header() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function getUser() {
      setLoading(true)

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)

        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profile) {
          setProfile(profile)
        }
      }

      setLoading(false)
    }

    getUser()

    // Add scroll listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const navItems = [
    { 
      name: "Learn", 
      href: "#",
      icon: <BookOpen className="h-4 w-4 mr-2" />,
      submenu: [
        { name: "Lessons", href: "/dashboard/lessons" },
        { name: "Video Tutorials", href: "/dashboard/videos" },
        { name: "Study Guides", href: "/dashboard/guides" }
      ]
    },
    { 
      name: "Practice", 
      href: "#",
      icon: <GraduationCap className="h-4 w-4 mr-2" />,
      submenu: [
        { name: "Quizzes", href: "/dashboard/quizzes" },
        { name: "Past Questions", href: "/dashboard/past-questions" },
        { name: "Mock Exams", href: "/dashboard/mock-exams" }
      ]
    },
    { 
      name: "For Schools", 
      href: "/school-portal",
      icon: <School className="h-4 w-4 mr-2" />
    },
    { 
      name: "For Institutions", 
      href: "/institution-portal",
      icon: <Building className="h-4 w-4 mr-2" />
    },
  ]

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-sm" 
        : "bg-white"
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white" />
            </div>
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-800 to-blue-600 bg-clip-text text-transparent">
              ExamPrep
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              item.submenu ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1 hover:text-purple-700 transition-colors">
                      <div className="flex items-center">
                        {item.icon}
                        {item.name}
                      </div>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48 p-2">
                    {item.submenu.map((subitem) => (
                      <DropdownMenuItem key={subitem.name} asChild>
                        <Link 
                          href={subitem.href} 
                          className="flex items-center py-2 cursor-pointer hover:bg-purple-50 rounded-md transition-colors"
                        >
                          {subitem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button key={item.name} variant="ghost" asChild>
                  <Link href={item.href} className="flex items-center hover:text-purple-700 transition-colors">
                    {item.icon}
                    {item.name}
                  </Link>
                </Button>
              )
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search Bar 
            <div className="hidden md:flex relative">
              <AnimatePresence initial={false}>
                {isSearchActive ? (
                  <motion.div
                    initial={{ width: 40, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 40, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center bg-gray-100 rounded-full overflow-hidden"
                  >
                    <input
                      type="text"
                      placeholder="Search topics, lessons..."
                      className="w-full bg-transparent border-none outline-none pl-4 pr-10 py-2 text-sm"
                      autoFocus
                      onBlur={() => setIsSearchActive(false)}
                    />
                    <Search className="absolute right-3 h-4 w-4 text-gray-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => setIsSearchActive(true)}
                  >
                    <Search className="h-4 w-4 text-gray-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
*/}
            {/* Notification */}
            {user && (
              <Button variant="ghost" size="icon" className="hidden md:flex w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                <Bell className="h-4 w-4 text-gray-500" />
              </Button>
            )}

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden md:flex gap-2 rounded-full pl-2 pr-4 py-1.5 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border border-gray-200">
                    <Avatar className="h-7 w-7 border-2 border-white">
                      <AvatarImage
                        src={profile?.avatar_url || "/placeholder.svg?height=32&width=32"}
                        alt={profile?.full_name || "User"}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                        {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{profile?.full_name?.split(' ')[0] || "Account"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <div className="font-medium">{profile?.full_name || "User"}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 hover:text-red-700">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" className="hover:bg-gray-100 hover:text-purple-700" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-sm" asChild>
                  <Link href="/signup">
                    <Sparkles className="mr-1 h-4 w-4" />
                    Sign up free
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden w-10 h-10 rounded-full bg-gray-100">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-4 border-b">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">E</span>
                      </div>
                      <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-800 to-blue-600 bg-clip-text text-transparent">
                        ExamPrep
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="rounded-full w-8 h-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Mobile Search 
                  <div className="p-4">
                    <div className="relative w-full">
                      <input
                        type="text"
                        placeholder="Search topics, lessons..."
                        className="w-full bg-gray-100 rounded-full border-none pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      />
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  */}

                  {/* Mobile Navigation */}
                  <nav className="flex-1 overflow-y-auto py-4">
                    {navItems.map((item) => (
                      <div key={item.name} className="px-4 py-1">
                        {item.submenu ? (
                          <div className="mb-2">
                            <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
                              {item.icon}
                              {item.name}
                            </div>
                            <div className="ml-6 space-y-1">
                              {item.submenu.map((subitem) => (
                                <Link
                                  key={subitem.name}
                                  href={subitem.href}
                                  className="block py-2 px-3 text-gray-700 hover:bg-purple-50 rounded-md transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subitem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className="flex items-center py-2 text-gray-700 hover:text-purple-700"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.icon}
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>

                  {/* Mobile User Section */}
                  <div className="mt-auto border-t">
                    {user ? (
                      <div className="p-4 space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-white">
                            <AvatarImage
                              src={profile?.avatar_url || "/placeholder.svg?height=32&width=32"}
                              alt={profile?.full_name || "User"}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                              {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{profile?.full_name || "User"}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                        
                        <Link 
                          href="/dashboard" 
                          className="block w-full text-center py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        
                        <Button
                          variant="outline"
                          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => {
                            handleSignOut()
                            setIsMenuOpen(false)
                          }}
                        >
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <div className="p-4 flex flex-col gap-3">
                        <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                          <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                            <Sparkles className="mr-1 h-4 w-4" />
                            Sign up free
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                            Log in
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}