"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

const orders = [
  { id: 1, date: "2025-02-15", total: 89.97, status: "Delivered" },
  { id: 2, date: "2025-02-10", total: 129.99, status: "Shipped" },
  { id: 3, date: "2025-02-05", total: 59.99, status: "Processing" },
  // Add more orders as needed
]

const OrderHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filteredOrders = orders.filter(
    (order) => order.id.toString().includes(searchTerm) && (statusFilter === "All" || order.status === statusFilter),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search by order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredOrders.map((order) => (
          <motion.div key={order.id} whileHover={{ y: -2 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <p className="text-gray-600">Date: {order.date}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
                    <p
                      className={`text-sm ${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "Shipped"
                            ? "text-blue-600"
                            : "text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default OrderHistoryPage

