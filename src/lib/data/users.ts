import type { User } from '@/lib/types';
import { delay } from '@/lib/utils/delay';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Martín García',
    email: 'usuario@walitake.com',
    phone: '+54 11 4567-8901',
    businessId: 'biz-1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    joinedAt: '2024-01-15',
  },
  {
    id: 'user-2',
    name: 'Laura Fernández',
    email: 'laura@ecoreciclados.com',
    phone: '+54 351 234-5678',
    businessId: 'biz-2',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    joinedAt: '2024-03-10',
  },
  {
    id: 'user-3',
    name: 'Carlos Méndez',
    email: 'carlos@hotelverde.com',
    phone: '+54 261 890-1234',
    businessId: 'biz-3',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    joinedAt: '2024-05-22',
  },
];

export async function getUserById(id: string): Promise<User | undefined> {
  await delay(200);
  return mockUsers.find((u) => u.id === id);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  await delay(300);
  return mockUsers.find((u) => u.email === email);
}
