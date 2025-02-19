const Footer = () => {
    return (
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm text-gray-600">
                Trendy Threads is your go-to destination for stylish and affordable clothing.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-sm text-gray-600 hover:text-primary">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/explore" className="text-sm text-gray-600 hover:text-primary">
                    Explore
                  </a>
                </li>
                <li>
                  <a href="/order-history" className="text-sm text-gray-600 hover:text-primary">
                    Order History
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-sm text-gray-600">
                Email: info@trendythreads.com
                <br />
                Phone: (123) 456-7890
              </p>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-600">© 2025 Trendy Threads. All rights reserved.</div>
        </div>
      </footer>
    )
  }
  
  export default Footer
  
  