"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

const products = [
  { id: 1, name: "Classic T-Shirt", price: 19.99, image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 2, name: "Slim Fit Jeans", price: 49.99, image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 3, name: "Leather Jacket", price: 99.99, image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 4, name: "Running Shoes", price: 79.99, image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
]

const TopSellingProducts = () => {
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState<number[]>([])

  useEffect(() => {
    // Load wishlist items from localStorage
    const items = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishlistItems(items.map((item: any) => item.id))
  }, [])

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
        category: "Top Selling" // Default category for top products
      })
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
      setWishlistItems([...wishlistItems, product.id])
    }
  }

  const addToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation() // Prevent triggering the card click
    
    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id)
    
    if (existingItemIndex !== -1) {
      // Update quantity if product exists
      existingCart[existingItemIndex].quantity += 1
    } else {
      // Add new product to cart
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      })
    }
    
    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(existingCart))
    
    // Navigate to cart
    router.push("/cart")
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Top Selling Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/product/${product.id}`)}
              className="cursor-pointer"
            >
              <Card>
                <CardContent className="p-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover object-center mb-4 rounded-md"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    variant={wishlistItems.includes(product.id) ? "default" : "outline"}
                    size="icon"
                    className="shrink-0"
                    onClick={(e) => toggleWishlist(e, product)}
                  >
                    <Heart className={`h-4 w-4 ${wishlistItems.includes(product.id) ? "fill-current" : ""}`} />
                  </Button>
                  <Button className="w-full" onClick={(e) => addToCart(e, product)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopSellingProducts

