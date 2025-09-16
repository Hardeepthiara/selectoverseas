import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-blue-600">Select Overseas</Link>

        <button
          className="md:hidden block text-gray-700"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <ul className={`md:flex gap-6 ${open ? "block" : "hidden"} md:block`}>
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/services" className="hover:text-blue-600">Services</Link></li>
          <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
