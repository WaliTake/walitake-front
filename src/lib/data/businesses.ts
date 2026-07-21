import type { Business } from '@/lib/types';

const API_URL = 'http://127.0.0.1:8000';

export async function getBusinesses(): Promise<Business[]> {
  try {
    const res = await fetch(`${API_URL}/businesses`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((b: any) => ({
      ...b,
      userId: b.user_id,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createBusiness(data: any): Promise<Business> {
  try {
    const res = await fetch(`${API_URL}/businesses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        user_id: data.userId
      }),
    });
    if (!res.ok) throw new Error('Failed to create business');
    const b = await res.json();
    return { ...b, userId: b.user_id };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getBusinessById(id: string): Promise<Business | undefined> {
  const businesses = await getBusinesses();
  return businesses.find((b) => b.id === id);
}

export async function getBusinessByUserId(userId: string): Promise<Business | undefined> {
  const businesses = await getBusinesses();
  return businesses.find((b) => b.userId === userId);
}
