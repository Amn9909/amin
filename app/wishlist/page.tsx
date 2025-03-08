"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  category: string
}

const WishlistPage = () => {
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    // Load wishlist items from localStorage
    const items = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishlistItems(items)
  }, [])

  const removeFromWishlist = (itemId: number) => {
    const updatedItems = wishlistItems.filter(item => item.id !== itemId)
    setWishlistItems(updatedItems)
    localStorage.setItem("wishlist", JSON.stringify(updatedItems))
  }

  const addToCart = (item: WishlistItem) => {
    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex((cartItem: any) => cartItem.id === item.id)
    
    if (existingItemIndex !== -1) {
      // Update quantity if product exists
      existingCart[existingItemIndex].quantity += 1
    } else {
      // Add new product to cart
      existingCart.push({
        ...item,
        quantity: 1
      })
    }
    
    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(existingCart))
    
    // Remove from wishlist
    removeFromWishlist(item.id)
    
    // Navigate to cart
    router.push("/cart")
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
        <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="text-gray-600 mb-6">Save items you love to your wishlist and review them anytime.</p>
        <Button onClick={() => router.push("/explore")}>Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.category}</p>
                <div className="flex items-center justify-between">
                  <p className="text-primary font-semibold">
                    ${item.price.toFixed(2)}
                  </p>
                  <Button size="sm" onClick={() => addToCart(item)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default WishlistPage 