"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Package, Truck, CheckCircle2, XCircle, Clock, ArrowLeft, MessageSquare } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PriceBreakdown } from "@/components/ui/price-breakdown"

// Mock order data (in a real app, this would come from an API)
const orders = {
  "ORD001": {
    id: "ORD001",
    date: "2024-03-15",
    subtotal: 169.97,
    shipping: 10.00,
    tax: 13.60,
    discounts: [
      {
        name: "Bulk Purchase Discount (5%)",
        amount: 8.50
      }
    ],
    total: 185.07,
    status: "delivered",
    items: [
      { 
        id: 1, 
        name: "Classic T-Shirt", 
        quantity: 2, 
        price: 19.99
      },
      { 
        id: 2, 
        name: "Slim Fit Jeans", 
        quantity: 1, 
        price: 49.99
      },
      { 
        id: 3, 
        name: "Running Shoes", 
        quantity: 1, 
        price: 79.99
      }
    ],
    timeline: [
      { status: "placed", date: "2024-03-15T09:00:00", message: "Order placed successfully" },
      { status: "packed", date: "2024-03-15T11:30:00", message: "Order packed and ready for shipping" },
      { status: "shipped", date: "2024-03-15T14:00:00", message: "Order shipped via Express Delivery" },
      { status: "delivered", date: "2024-03-15T17:00:00", message: "Order delivered successfully" }
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA"
    },
    paymentMethod: "Credit Card (**** 1234)"
  }
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return <CheckCircle2 className="h-6 w-6 text-green-500" />
    case "shipped":
      return <Truck className="h-6 w-6 text-blue-500" />
    case "packed":
      return <Package className="h-6 w-6 text-yellow-500" />
    case "placed":
      return <Clock className="h-6 w-6 text-purple-500" />
    case "cancelled":
      return <XCircle className="h-6 w-6 text-red-500" />
    default:
      return null
  }
}

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

const OrderDetailsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const [queryText, setQueryText] = useState("")
  const order = orders[params.id as keyof typeof orders]

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">Order not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <Badge variant="secondary" className={getStatusColor(order.status)}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Order Details */}
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>
                Placed on {new Date(order.date).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <div className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} × {item.quantity}
                          </div>
                        </div>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Breakdown */}
          <PriceBreakdown
            subtotal={order.subtotal}
            shipping={order.shipping}
            tax={order.tax}
            discounts={order.discounts}
          />

          {/* Shipping Details */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Details</CardTitle>
              <CardDescription>Delivery information and address</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p>{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zip}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Payment Method</h3>
                  <p>{order.paymentMethod}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
              <CardDescription>Track your order status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {order.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full p-2 bg-background border-2">
                        {getStatusIcon(event.status)}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div className="flex-grow w-px bg-border my-2" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleString()}
                      </p>
                      <p className="text-sm">{event.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Query Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>
                Have a question about your order? Raise a query here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Raise a Query
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Raise a Query</DialogTitle>
                    <DialogDescription>
                      Please describe your issue or question about Order #{order.id}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Textarea
                      placeholder="Type your query here..."
                      value={queryText}
                      onChange={(e) => setQueryText(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button className="w-full" onClick={() => {
                      // Handle query submission
                      alert("Query submitted successfully!")
                      setQueryText("")
                    }}>
                      Submit Query
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage 