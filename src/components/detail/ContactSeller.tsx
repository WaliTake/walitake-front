'use client';

import { useState } from 'react';
import { MessageCircle, Send, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import type { WasteListing, Business } from '@/lib/types';

interface ContactSellerProps {
  listing: WasteListing;
  business: Business;
}

export function ContactSeller({ listing, business }: ContactSellerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    `Hola! Me interesa el residuo "${listing.title}". ¿Podría darme más información?`
  );
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);

    setTimeout(() => {
      setIsOpen(false);
      setSent(false);
      setName('');
      setEmail('');
      setMessage(`Hola! Me interesa el residuo "${listing.title}". ¿Podría darme más información?`);
    }, 1500);

    toast.success(`¡Mensaje enviado a ${business.name}!`);
  };

  return (
    <>
      <Button
        id="contact-seller-btn"
        variant="primary"
        size="lg"
        fullWidth
        icon={<MessageCircle size={18} />}
        onClick={() => setIsOpen(true)}
      >
        Contactar vendedor
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Contactar a ${business.name}`}
      >
        {sent ? (
          <div className="flex flex-col items-center py-8 gap-4">
            <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center">
              <CheckCircle className="text-[#388E3C]" size={32} />
            </div>
            <p className="text-lg font-bold text-[#212121]">¡Mensaje enviado!</p>
            <p className="text-sm text-[#616161] text-center">
              El equipo de {business.name} recibirá tu consulta y te responderán pronto.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="bg-[#F1F8E9] rounded-xl p-3 text-sm text-[#616161]">
              <span className="font-semibold text-[#212121]">Residuo:</span> {listing.title}
            </div>

            <div>
              <label htmlFor="contact-name" className="block text-sm font-semibold text-[#212121] mb-1.5">
                Tu nombre *
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="María García"
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-semibold text-[#212121] mb-1.5">
                Tu email *
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="maria@empresa.com"
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-semibold text-[#212121] mb-1.5">
                Mensaje *
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                fullWidth
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                icon={<Send size={16} />}
              >
                Enviar mensaje
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
