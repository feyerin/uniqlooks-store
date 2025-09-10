import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/cartContext";
import MiniCart from "../components/miniCart";

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle responsive
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className={`sticky top-0 z-50 transition-shadow bg-white ${scrolled ? "shadow-md" : ""}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4 relative">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-red-600">UNIQLOOKS</Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 text-sm font-medium items-center relative">
            <Link to="/" className="hover:text-red-600 transition-colors duration-200">Home</Link>
            <Link to="/brands" className="hover:text-red-600 transition-colors duration-200">Brands</Link>
            <Link to="/products" className="hover:text-red-600 transition-colors duration-200">Products</Link>

            {/* Cart Button */}
            <div className="relative">
              <button onClick={() => setCartOpen(!cartOpen)}>
                <FaShoppingCart className="text-xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {cartOpen && !isMobile && (
                <MiniCart isMobile={false} onClose={() => setCartOpen(false)} />
              )}
            </div>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <nav className="flex flex-col gap-2 p-4">
              <Link to="/" className="hover:text-red-600 transition-colors duration-200" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/brands" className="hover:text-red-600 transition-colors duration-200" onClick={() => setMenuOpen(false)}>Brands</Link>
              <Link to="/products" className="hover:text-red-600 transition-colors duration-200" onClick={() => setMenuOpen(false)}>Products</Link>
              <Link to="/cart" className="hover:text-red-600 transition-colors duration-200" onClick={() => setMenuOpen(false)}>Cart ({totalItems})</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile MiniCart Floating */}
      {cartOpen && isMobile && (
        <MiniCart isMobile={true} onClose={() => setCartOpen(false)} />
      )}

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 text-gray-700 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">UNIQLOOKS</h3>
            <p className="text-sm">Your one-stop shop for the latest shoes and brands.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm flex flex-col gap-1">
              <li><Link to="/" className="hover:text-red-600">Home</Link></li>
              <li><Link to="/brands" className="hover:text-red-600">Brands</Link></li>
              <li><Link to="/products" className="hover:text-red-600">Products</Link></li>
              <li><Link to="/cart" className="hover:text-red-600">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p className="text-sm">Email: support@uniqlooks.com</p>
            <p className="text-sm">Phone: +62 123 4567 890</p>
            <p className="text-sm">Address: Jakarta, Indonesia</p>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 py-4 border-t">
          © 2025 UNIQLOOKS Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}