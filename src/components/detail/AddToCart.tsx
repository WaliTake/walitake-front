'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import type { WasteListing } from '@/lib/types';

interface AddToCartProps {
  listing: WasteListing;
}

export function AddToCart({ listing }: AddToCartProps) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    // Simulate slight delay for effect
    await new Promise((r) => setTimeout(r, 400));
    addToCart(listing);
    setLoading(false);
    toast.success(`¡${listing.title} agregado al carrito!`);
  };

  return (
    <Button
      id="add-to-cart-btn"
      variant="primary"
      size="lg"
      fullWidth
      loading={loading}
      icon={<Plus size={18} />}
      onClick={handleAdd}
    >
      Agregar al carrito
    </Button>
  );
}
