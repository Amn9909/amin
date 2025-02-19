"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { id: 1, name: "Men", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 2, name: "Women", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 3, name: "Kids", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { id: 4, name: "Accessories", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
]

const TopCategories = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Top Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <motion.div key={category.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card>
                <CardContent className="p-4">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-48 object-cover object-center mb-4 rounded-md"
                  />
                  <h3 className="text-xl font-semibold text-center">{category.name}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopCategories

