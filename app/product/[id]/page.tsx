"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingCart, Star, StarHalf, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// This would typically come from an API or database
const products = [
  { 
    id: 1, 
    name: "Classic T-Shirt", 
    price: 19.99, 
    category: "Men", 
    description: "A comfortable and stylish classic t-shirt perfect for everyday wear. Made from 100% premium cotton, this t-shirt features:",
    features: [
      "Premium cotton material",
      "Comfortable fit",
      "Machine washable",
      "Available in multiple colors",
      "Durable stitching"
    ],
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    reviews: [
      {
        id: 1,
        user: "John D.",
        rating: 5,
        date: "2024-03-01",
        comment: "Great quality t-shirt! The fabric is really comfortable.",
        images: ["https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"]
      },
      {
        id: 2,
        user: "Sarah M.",
        rating: 4.5,
        date: "2024-02-28",
        comment: "Nice fit and good material. Would buy again!",
        images: ["https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"]
      }
    ]
  },
  { 
    id: 2, 
    name: "Slim Fit Jeans", 
    price: 49.99, 
    category: "Men", 
    description: "Modern slim fit jeans with perfect stretch and comfort. Features premium denim material.",
    features: [
      "Premium denim",
      "Stretch material",
      "Slim fit design",
      "Multiple pockets",
      "Reinforced stitching"
    ],
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    reviews: []
  },
  { 
    id: 3, 
    name: "Floral Dress", 
    price: 39.99, 
    category: "Women", 
    description: "Beautiful floral dress perfect for summer occasions. Made with lightweight fabric.",
    features: [
      "Floral print",
      "Lightweight material",
      "Summer design",
      "Comfortable fit",
      "Easy care"
    ],
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    reviews: []
  },
  { 
    id: 4, 
    name: "Running Shoes", 
    price: 79.99, 
    category: "Accessories", 
    description: "High-performance running shoes with superior comfort and support.",
    features: [
      "Cushioned sole",
      "Breathable mesh",
      "Arch support",
      "Durable construction",
      "Lightweight design"
    ],
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    reviews: []
  }
]

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", images: [] })
  const [isInWishlist, setIsInWishlist] = useState(false)
  
  const product = products.find((p) => p.id === parseInt(params.id))
  
  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>
  }

  useEffect(() => {
    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setIsInWishlist(wishlist.some((item: any) => item.id === product.id))
  }, [product.id])

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item: any) => item.id !== product.id)
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      setIsInWishlist(false)
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
      setIsInWishlist(true)
    }
  }

  const addToCart = () => {
    // Get existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id)
    
    if (existingItemIndex !== -1) {
      // Update quantity if product exists
      existingCart[existingItemIndex].quantity += quantity
    } else {
      // Add new product to cart
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      })
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart))
    
    // Navigate to cart page
    router.push("/cart")
  }

  // Get recommended products (excluding current product)
  const recommendedProducts = products
    .filter(p => p.id !== product.id)
    .slice(0, 4)

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-5 w-5 fill-yellow-400 text-yellow-400" />)
    }

    const remainingStars = 5 - stars.length
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Product Details Card */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
                <Button
                  variant={isInWishlist ? "default" : "outline"}
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={toggleWishlist}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <p className="text-2xl font-semibold text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-gray-600">{product.description}</p>
                  <ul className="mt-4 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Category</h2>
                  <p className="text-gray-600">{product.category}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Quantity</h2>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-semibold">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="pt-4">
                  <Button
                    className="w-full text-lg py-6"
                    onClick={addToCart}
                  >
                    <ShoppingCart className="mr-2" />
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            
            {/* Add Review Form */}
            <div className="mb-8 p-4 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex gap-1">
                    {renderStars(newReview.rating)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Comment</label>
                  <Textarea
                    placeholder="Share your thoughts about this product..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Images</label>
                  <Input type="file" multiple accept="image/*" className="mb-2" />
                </div>
                <Button>Submit Review</Button>
              </div>
            </div>

            {/* Existing Reviews */}
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-gray-600">by {review.user}</span>
                    <span className="text-gray-400">• {review.date}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-4">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {product.reviews.length === 0 && (
                <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to review this product!</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((recommendedProduct) => (
              <motion.div
                key={recommendedProduct.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(`/product/${recommendedProduct.id}`)}
                className="cursor-pointer"
              >
                <Card>
                  <CardContent className="p-4">
                    <img
                      src={recommendedProduct.image}
                      alt={recommendedProduct.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold">{recommendedProduct.name}</h3>
                    <p className="text-primary font-semibold">
                      ${recommendedProduct.price.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProductDetails 