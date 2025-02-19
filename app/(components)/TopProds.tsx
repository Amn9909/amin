"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const products = [
  { id: 1, name: "Classic T-Shirt", price: 19.99, image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 2, name: "Slim Fit Jeans", price: 49.99, image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 3, name: "Leather Jacket", price: 99.99, image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 4, name: "Running Shoes", price: 79.99, image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
]

const TopSellingProducts = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Top Selling Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div key={product.id} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
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
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
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

