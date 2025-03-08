"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, User, Heart, Settings, LogOut, Search, ChevronRight, Moon, Sun, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const categories = [
  { name: "Men", path: "/explore?category=Men" },
  { name: "Women", path: "/explore?category=Women" },
  { name: "Accessories", path: "/explore?category=Accessories" },
]

const products = [
  { id: 1, name: "Classic T-Shirt", price: 19.99, category: "Men", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 2, name: "Slim Fit Jeans", price: 49.99, category: "Men", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 3, name: "Floral Dress", price: 39.99, category: "Women", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 4, name: "Running Shoes", price: 79.99, category: "Accessories", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
]

const Header = () => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof products>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      setIsSearchOpen(false)
      router.push(`/explore?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold">
              Trendy Threads
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-6">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:text-primary">
                      Categories
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {categories.map((category) => (
                        <DropdownMenuItem
                          key={category.name}
                          onClick={() => router.push(category.path)}
                        >
                          {category.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li>
                  <Link href="/order-history" className="hover:text-primary">
                    Order History
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span>Search products...</span>
              <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span>⌘</span>K
              </kbd>
            </Button>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
            {isMounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            )}

            {/* Desktop Navigation Icons */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/wishlist">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/wishlist")}>
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/profile?tab=theme")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="flex items-center gap-2 py-2">
                    Home
                  </Link>
                  <Link href="/explore" className="flex items-center gap-2 py-2">
                    Categories
                  </Link>
                  <Link href="/order-history" className="flex items-center gap-2 py-2">
                    Order History
                  </Link>
                  <Link href="/wishlist" className="flex items-center gap-2 py-2">
                    <Heart className="h-5 w-5" />
                    Wishlist
                  </Link>
                  <Link href="/cart" className="flex items-center gap-2 py-2">
                    <ShoppingCart className="h-5 w-5" />
                    Cart
                  </Link>
                  <Link href="/profile" className="flex items-center gap-2 py-2">
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                  <Link href="/profile?tab=theme" className="flex items-center gap-2 py-2">
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-[600px] p-0">
          <form onSubmit={handleSearch} className="flex flex-col">
            <div className="flex items-center border-b p-4">
              <Search className="h-5 w-5 text-muted-foreground mr-3" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 focus-visible:ring-0 px-0"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="max-h-[300px] overflow-y-auto py-2">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-accent cursor-pointer"
                    onClick={() => {
                      setIsSearchOpen(false)
                      router.push(`/product/${product.id}`)
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            )}
            {searchTerm && searchResults.length === 0 && (
              <div className="px-4 py-3 text-sm text-muted-foreground">
                No products found.
              </div>
            )}
            {!searchTerm && (
              <div className="p-4 text-sm text-muted-foreground">
                Start typing to search products...
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </motion.header>
  )
}

export default Header

