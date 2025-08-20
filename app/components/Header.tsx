// Header de navegación
import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="w-full py-3 bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-center px-4 gap-4">
        {/* Logo y nombre centrado */}
        <div className="flex flex-col items-center gap-1 w-full">
          <span className="text-2xl font-playfair font-bold text-pink-600 tracking-tight select-none">
            <Link to="/">Bralesa</Link>
          </span>
          <span className="text-base font-medium text-gray-500 tracking-wide">
            Accesorios
          </span>
        </div>
      </div>
    </header>
  );
}
