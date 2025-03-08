"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PriceBreakdownProps {
  subtotal: number
  discounts?: {
    name: string
    amount: number
  }[]
  shipping?: number
  tax?: number
}

export function PriceBreakdown({ subtotal, discounts = [], shipping = 0, tax = 0 }: PriceBreakdownProps) {
  const totalDiscount = discounts.reduce((sum, discount) => sum + discount.amount, 0)
  const grandTotal = subtotal - totalDiscount + shipping + tax

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          {discounts.map((discount, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{discount.name}</span>
              <span className="text-green-500">-${discount.amount.toFixed(2)}</span>
            </div>
          ))}

          {shipping > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
          )}

          {tax > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          )}
        </div>

        <Separator className="my-4" />
        
        {totalDiscount > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-green-500">
              <span>Total Savings</span>
              <span>-${totalDiscount.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
          </div>
        )}

        <div className="flex justify-between font-semibold">
          <span>Grand Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  )
} 