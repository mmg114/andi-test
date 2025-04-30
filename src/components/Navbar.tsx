import React from 'react';
import { ShoppingCart, Search, Menu, Building2, CircleDot } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Menu className="h-6 w-6 text-gray-600 cursor-pointer" />
            <div className="flex items-center ml-4">
              <div className="relative">
                <Building2 className="h-8 w-8 text-blue-600" />
                <CircleDot className="h-4 w-4 text-blue-400 absolute -bottom-1 -right-1" />
              </div>
              <div className="ml-2">
                <span className="text-xl font-bold text-blue-600">Shopi</span>
                <span className="text-xl font-bold text-gray-700">ANDI</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="relative mx-4">
              <input
                type="text"
                placeholder="Buscar servicios..."
                className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;