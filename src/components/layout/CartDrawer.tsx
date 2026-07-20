'use client';

import { X, Trash2, CheckCircle, Leaf } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { useState } from 'react';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, clearCart, totalXP } = useCart();
  const { user, login } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset success state after closing if needed
    if (isSuccess) {
      setTimeout(() => setIsSuccess(false), 300);
    }
  };

  const handleCheckout = async () => {
    if (!user) return;
    setIsCheckingOut(true);

    try {
      const res = await fetch('http://localhost:8000/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          listing_ids: items.map(i => i.id)
        })
      });

      if (res.ok) {
        const data = await res.json();
        // Update user xp in mock context
        login({ ...user, xp: data.new_total_xp });
        clearCart();
        setIsSuccess(true);
      }
    } catch (err) {
      console.error('Checkout failed', err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={handleClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 sm:p-6 border-b border-[#E0E0E0] flex items-center justify-between bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-[#212121]">Tu Carrito</h2>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} className="text-[#616161]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fade-in-up">
              <div className="w-20 h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center mb-2">
                <CheckCircle size={40} className="text-[#2E7D32]" />
              </div>
              <h3 className="text-2xl font-bold text-[#212121]">¡Pedido Confirmado!</h3>
              <p className="text-[#616161] mb-6">
                Has aportado a la economía circular. <br />
                <span className="font-bold text-[#2E7D32]">¡Ganaste {totalXP} XP!</span>
              </p>
              <Button variant="primary" onClick={handleClose} className="w-full">
                Seguir Explorando
              </Button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-[#9E9E9E]">
              <Leaf size={48} className="opacity-20" />
              <p>Tu carrito está vacío</p>
              <Button variant="outline" onClick={handleClose}>Explorar Residuos</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.cartId} className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-bold text-[#212121] text-sm line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-[#616161]">{item.quantity} {item.unit}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="font-black text-[#212121]">
                        Bs. {item.price.toLocaleString('es-BO')}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-[#9E9E9E] hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout */}
        {!isSuccess && items.length > 0 && (
          <div className="p-4 sm:p-6 bg-white border-t border-[#E0E0E0] sticky bottom-0">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#616161]">Subtotal</span>
              <span className="font-bold text-[#212121]">Bs. {subtotal.toLocaleString('es-BO')}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-[#2E7D32]">
              <span className="font-semibold text-sm flex items-center gap-1"><Leaf size={14}/> Recompensa Ambiental</span>
              <span className="font-bold text-sm">+{totalXP} XP</span>
            </div>
            
            {user ? (
              <Button 
                variant="primary" 
                className="w-full h-14 text-lg !rounded-2xl" 
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Procesando...' : 'Confirmar y Aportar'}
              </Button>
            ) : (
              <p className="text-sm text-center text-[#E53935] font-medium p-3 bg-red-50 rounded-xl">
                Debes iniciar sesión para pedir.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
