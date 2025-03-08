"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { Heart, Filter } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const products = [
  { id: 1, name: "Classic T-Shirt", price: 19.99, category: "Men", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 2, name: "Slim Fit Jeans", price: 49.99, category: "Men", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 3, name: "Floral Dress", price: 39.99, category: "Women", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  {
    id: 4,
    name: "Running Shoes",
    price: 79.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  },
  // Add more products as needed
]

const ExplorePage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All")
  const [sortBy, setSortBy] = useState("name")
  const [wishlistItems, setWishlistItems] = useState<number[]>([])

  useEffect(() => {
    // Load wishlist items from localStorage
    const items = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishlistItems(items.map((item: any) => item.id))
  }, [])

  useEffect(() => {
    // Update URL when category changes
    const currentSearchParams = new URLSearchParams(window.location.search)
    if (selectedCategory === "All") {
      currentSearchParams.delete("category")
    } else {
      currentSearchParams.set("category", selectedCategory)
    }
    const newUrl = `/explore${currentSearchParams.toString() ? `?${currentSearchParams.toString()}` : ""}`
    router.push(newUrl, { scroll: false })
  }, [selectedCategory, router])

  const toggleWishlist = (e: React.MouseEvent, product: any) => {
    e.stopPropagation() // Prevent triggering the card click
    
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    const isInWishlist = wishlistItems.includes(product.id)
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item: any) => item.id !== product.id)
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      setWishlistItems(updatedWishlist.map((item: any) => item.id))
    } else {
      // Add to wishlist
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      })
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
      setWishlistItems([...wishlistItems, product.id])
    }
  }

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || product.category === selectedCategory),
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "price_asc") return a.price - b.price
      if (sortBy === "price_desc") return b.price - a.price
      return 0
    })

  const FilterControls = () => (
    <>
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Categories</SelectItem>
          <SelectItem value="Men">Men</SelectItem>
          <SelectItem value="Women">Women</SelectItem>
          <SelectItem value="Accessories">Accessories</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="price_asc">Price: Low to High</SelectItem>
          <SelectItem value="price_desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Explore Our Products</h1>
          
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Filter className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Adjust your product filters
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-4">
                <FilterControls />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                const currentSearchParams = new URLSearchParams(window.location.search)
                if (e.target.value) {
                  currentSearchParams.set("search", e.target.value)
                } else {
                  currentSearchParams.delete("search")
                }
                router.push(`/explore${currentSearchParams.toString() ? `?${currentSearchParams.toString()}` : ""}`, { scroll: false })
              }}
              className="w-full"
            />
          </div>
          
          {/* Desktop Filters */}
          <div className="hidden md:flex gap-4">
            <FilterControls />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
                router.push("/explore")
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(`/product/${product.id}`)}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
                      <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 p-4 pt-0">
                    <Button
                      variant={wishlistItems.includes(product.id) ? "default" : "outline"}
                      size="icon"
                      className="shrink-0"
                      onClick={(e) => toggleWishlist(e, product)}
                    >
                      <Heart className={`h-4 w-4 ${wishlistItems.includes(product.id) ? "fill-current" : ""}`} />
                    </Button>
                    <Button className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ExplorePage

