"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Moon,
  Sun,
  Palette,
  ShoppingCart,
  Trash2,
  Heart,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  category: string
}

const ProfilePage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [theme, setTheme] = useState("light")
  const [accentColor, setAccentColor] = useState("blue")
  const [profileImage, setProfileImage] = useState("/placeholder-avatar.jpg")
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "personal")

  useEffect(() => {
    // Load wishlist items from localStorage
    const items = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishlistItems(items)
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      
      <Tabs defaultValue={activeTab} className="space-y-8" onValueChange={(value) => {
        setActiveTab(value)
        router.push(`/profile?tab=${value}`, { scroll: false })
      }}>
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>

        {/* Personal Details Section */}
        <TabsContent value="personal">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90"
                  >
                    <Camera className="h-5 w-5" />
                  </label>
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Click the camera icon to upload a new profile picture
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input id="name" placeholder="John Doe" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input id="email" type="email" placeholder="john@example.com" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input id="phone" placeholder="+1 234 567 890" className="pl-9" />
                  </div>
                </div>
                <Button className="w-full">Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Address Section */}
        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle>Address Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input id="street" placeholder="123 Main St" className="pl-9" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="State" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="ZIP Code" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="Country" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Delivery Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions for delivery"
                  className="min-h-[100px]"
                />
              </div>
              <Button className="w-full">Save Address</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theme Settings Section */}
        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Color Mode</h3>
                <div className="flex gap-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Accent Color</h3>
                <div className="grid grid-cols-4 gap-4">
                  {["blue", "green", "red", "purple"].map((color) => (
                    <Button
                      key={color}
                      variant={accentColor === color ? "default" : "outline"}
                      className="flex-1 capitalize"
                      onClick={() => setAccentColor(color)}
                    >
                      <Palette className="mr-2 h-4 w-4" />
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              <Button className="w-full">Save Theme Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wishlist Section */}
        <TabsContent value="wishlist">
          <Card>
            <CardHeader>
              <CardTitle>My Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">Your wishlist is empty</p>
                  <Button
                    className="mt-4"
                    onClick={() => router.push("/explore")}
                  >
                    Explore Products
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfilePage 