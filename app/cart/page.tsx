"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { PriceBreakdown } from "@/components/ui/price-breakdown"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const items = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(items)
  }, [])

  const updateCart = (newItems: CartItem[]) => {
    setCartItems(newItems)
    localStorage.setItem("cart", JSON.stringify(newItems))
    // Dispatch event for cart count update
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const updateQuantity = (itemId: number, change: number) => {
    const newItems = cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + change)
        return { ...item, quantity: newQuantity }
      }
      return item
    })
    updateCart(newItems)
  }

  const removeItem = (itemId: number) => {
    const newItems = cartItems.filter(item => item.id !== itemId)
    updateCart(newItems)
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  }

  // Calculate shipping based on subtotal
  const calculateShipping = (subtotal: number) => {
    if (subtotal >= 100) return 0 // Free shipping over $100
    return 10 // Standard shipping fee
  }

  // Calculate tax (example: 8% tax)
  const calculateTax = (subtotal: number) => {
    return subtotal * 0.08
  }

  // Calculate discounts
  const calculateDiscounts = (subtotal: number) => {
    const discounts = []
    
    // Free shipping discount
    if (subtotal >= 100) {
      discounts.push({
        name: "Free Shipping",
        amount: 10
      })
    }
    
    // Bulk purchase discount (5% off for orders over $200)
    if (subtotal >= 200) {
      discounts.push({
        name: "Bulk Purchase Discount (5%)",
        amount: subtotal * 0.05
      })
    }
    
    return discounts
  }

  if (!isClient) {
    return null // Prevent hydration issues
  }

  const subtotal = getSubtotal()
  const shipping = calculateShipping(subtotal)
  const tax = calculateTax(subtotal)
  const discounts = calculateDiscounts(subtotal)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">Your cart is empty</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-full h-full transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold">{item.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="hover:bg-muted"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="hover:bg-muted"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <PriceBreakdown
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              discounts={discounts}
            />
            <Button 
              className="w-full bg-primary hover:bg-primary/90" 
              size="lg"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
