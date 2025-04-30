import React, { useState } from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import Navbar from './components/Navbar';
import ServiceList from './components/ProductList';
import Cart from './components/Cart';
import { Service } from './types';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<Service[]>([]);

  const addToCart = (service: Service) => {
    setCart([...cart, service]);
  };

  const removeFromCart = (serviceId: number) => {
    setCart(cart.filter(item => item.id !== serviceId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <ServiceList onAddToCart={addToCart} />
      </main>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

export default App;