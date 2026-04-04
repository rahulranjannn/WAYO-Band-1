import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const { isCartOpen, toggleCart, cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-wayo-dark/40 backdrop-blur-sm z-[100] animate-in fade-in duration-300"
        onClick={toggleCart}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 pointer-events-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-wayo-dark">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-xl font-bold font-display">Your Cart</h2>
          </div>
          <button 
            onClick={toggleCart}
            className="text-gray-400 hover:text-wayo-dark transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
          {cartItems.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center pb-20">
              <ShoppingBag className="w-12 h-12 text-gray-200 mb-4" />
              <h3 className="text-xl font-bold text-wayo-dark mb-2">Your cart is empty</h3>
              <p className="text-gray-500 font-medium">Looks like you haven't added anything yet.</p>
              <button 
                onClick={toggleCart}
                className="mt-6 bg-wayo-cream text-wayo-dark px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.hasExtraBand}`} className="flex gap-4 p-4 bg-wayo-cream/30 rounded-[1rem] border border-gray-100">
                <div className="w-24 h-24 bg-white rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-wayo-dark text-base leading-tight">{item.name}</h4>
                    <span className="font-extrabold text-wayo-dark whitespace-nowrap ml-2">₹{item.price}</span>
                  </div>
                  
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    {item.model} • {item.color}
                  </div>
                  
                  {item.hasExtraBand && (
                    <div className="inline-block bg-wayo-yellow/20 text-yellow-800 text-xs font-bold px-2 py-0.5 rounded-md w-fit mb-3">
                      + Extra Band Added
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-400 hover:text-wayo-dark font-bold text-lg leading-none"
                      ><Minus className="w-3.5 h-3.5" /></button>
                      <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-400 hover:text-wayo-dark font-bold text-lg leading-none"
                      ><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors underline underline-offset-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-bold">Subtotal</span>
              <span className="text-2xl font-extrabold text-wayo-dark">₹{cartTotal}</span>
            </div>
            <p className="text-sm text-gray-500 font-medium mb-6 text-center">Taxes and shipping calculated at checkout</p>
            <button 
              onClick={() => { toggleCart(); navigate('/checkout'); }}
              className="w-full bg-wayo-dark text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-gray-800 transition-all hover:-translate-y-0.5 relative overflow-hidden group"
            >
              <span className="relative z-10">Proceed to Checkout</span>
              <div className="absolute inset-0 bg-black/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
