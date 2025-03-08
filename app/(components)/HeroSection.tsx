"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const trendingProducts = [
  { id: 1, name: "Summer Dress", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 2, name: "Denim Jacket", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 3, name: "Sneakers", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
]

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % trendingProducts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + trendingProducts.length) % trendingProducts.length)
  }

  return (
    <section className="relative h-[600px] overflow-hidden">
      <motion.div className="flex h-full" animate={{ x: `-${currentSlide * 100}%` }} transition={{ duration: 0.5 }}>
        {trendingProducts.map((product) => (
          <div key={product.id} className="w-full h-full flex-shrink-0 relative">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-4xl font-bold">{product.name}</h2>
            </div>
          </div>
        ))}
      </motion.div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <div className="relative">
          <Input type="text" placeholder="Search for products..." className="w-full pr-10" />
          <Button className="absolute right-0 top-0 bottom-0">Search</Button>
        </div>
      </div> */}
    </section>
  )
}

export default HeroSection

