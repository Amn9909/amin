"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"

const Header = () => {
  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Trendy Threads
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/explore" className="hover:text-primary">
                Explore
              </Link>
            </li>
            <li>
              <Link href="/order-history" className="hover:text-primary">
                Order History
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-primary">
                <ShoppingCart />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header

