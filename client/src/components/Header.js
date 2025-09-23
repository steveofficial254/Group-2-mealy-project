import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import mockAuth from "../mockAuth";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { getTotalItems } = useCartStore();
  const user = mockAuth.getUser();

  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Asili Shop
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-green-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-200">
            About
          </Link>
          <Link to="/products" className="hover:text-green-200">
            Products
          </Link>
          <Link to="/cart" className="hover:text-green-200">
            Cart ({getTotalItems()})
          </Link>
          {user ? (
            <span className="ml-4">Hi, {user.name}</span>
          ) : (
            <Link to="/login" className="hover:text-green-200">
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-green-700 px-4 py-3 space-y-3">
          <Link to="/" className="block hover:text-green-200" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/about" className="block hover:text-green-200" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/products" className="block hover:text-green-200" onClick={toggleMenu}>
            Products
          </Link>
          <Link to="/cart" className="block hover:text-green-200" onClick={toggleMenu}>
            Cart ({getTotalItems()})
          </Link>
          {user ? (
            <span className="block">Hi, {user.name}</span>
          ) : (
            <Link to="/login" className="block hover:text-green-200" onClick={toggleMenu}>
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
