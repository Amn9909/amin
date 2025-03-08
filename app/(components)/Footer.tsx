"use client"

const Footer = () => {
    return (
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm text-muted-foreground">
                Trendy Threads is your go-to destination for stylish and affordable clothing.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/explore" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Explore
                  </a>
                </li>
                <li>
                  <a href="/order-history" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Order History
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-sm text-muted-foreground">
                Email: info@trendythreads.com
                <br />
                Phone: (123) 456-7890
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 Trendy Threads. All rights reserved.
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer
  
  