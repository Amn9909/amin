"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, ChevronRight } from "lucide-react"

// Mock data for orders
const orders = [
  {
    id: "ORD001",
    date: "2024-03-15",
    total: 159.97,
    status: "delivered",
    items: [
      { id: 1, name: "Classic T-Shirt", quantity: 2, price: 19.99 },
      { id: 2, name: "Slim Fit Jeans", quantity: 1, price: 49.99 },
      { id: 3, name: "Running Shoes", quantity: 1, price: 79.99 }
    ]
  },
  {
    id: "ORD002",
    date: "2024-03-14",
    total: 89.98,
    status: "shipped",
    items: [
      { id: 4, name: "Floral Dress", quantity: 1, price: 39.99 },
      { id: 5, name: "Leather Belt", quantity: 1, price: 49.99 }
    ]
  },
  {
    id: "ORD003",
    date: "2024-03-13",
    total: 129.97,
    status: "packed",
    items: [
      { id: 6, name: "Winter Jacket", quantity: 1, price: 129.97 }
    ]
  },
  {
    id: "ORD004",
    date: "2024-03-12",
    total: 59.98,
    status: "placed",
    items: [
      { id: 7, name: "Sports Shorts", quantity: 2, price: 29.99 }
    ]
  },
  {
    id: "ORD005",
    date: "2024-03-11",
    total: 89.99,
    status: "cancelled",
    items: [
      { id: 8, name: "Sneakers", quantity: 1, price: 89.99 }
    ]
  }
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-500/10 text-green-500"
    case "shipped":
      return "bg-blue-500/10 text-blue-500"
    case "packed":
      return "bg-yellow-500/10 text-yellow-500"
    case "placed":
      return "bg-purple-500/10 text-purple-500"
    case "cancelled":
      return "bg-red-500/10 text-red-500"
    default:
      return "bg-gray-500/10 text-gray-500"
  }
}

const OrderHistoryPage = () => {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Order History</h1>
        </div>

        <div className="grid gap-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push(`/order-history/${order.id}`)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </p>
                      </div>
                      <Badge variant="secondary" className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderHistoryPage

