import type { WasteListing } from '@/lib/types';
import { delay } from '@/lib/utils/delay';
import { LOADING_DELAY } from '@/lib/constants';

const API_URL = 'http://127.0.0.1:8000';

export async function getListings(): Promise<WasteListing[]> {
  try {
    const res = await fetch(`${API_URL}/listings`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch listings');
    const data = await res.json();
    return data.map((d: any) => ({
      id: d.id,
      title: d.title,
      description: d.description,
      categoryId: d.category_id,
      quantity: d.quantity,
      unit: d.unit,
      price: d.price,
      originalPrice: d.original_price,
      discountPercent: d.discount_percent,
      imageUrl: d.image_url,
      businessId: d.business_id,
      available: d.available,
      createdAt: d.created_at,
      featured: d.featured,
      tags_list: d.tags_list
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getListingById(id: string): Promise<WasteListing | undefined> {
  try {
    const res = await fetch(`${API_URL}/listings/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Listing not found');
    const d = await res.json();
    return {
      id: d.id,
      title: d.title,
      description: d.description,
      categoryId: d.category_id,
      quantity: d.quantity,
      unit: d.unit,
      price: d.price,
      originalPrice: d.original_price,
      discountPercent: d.discount_percent,
      imageUrl: d.image_url,
      businessId: d.business_id,
      available: d.available,
      createdAt: d.created_at,
      featured: d.featured,
      tags_list: d.tags_list
    };
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function getFeaturedListings(): Promise<WasteListing[]> {
  const listings = await getListings();
  return listings.filter(l => l.featured && l.available).slice(0, 6);
}

export async function getListingsByBusiness(businessId: string): Promise<WasteListing[]> {
  const listings = await getListings();
  return listings.filter(l => l.businessId === businessId);
}

export async function createListing(data: any): Promise<WasteListing> {
  try {
    const res = await fetch(`${API_URL}/listings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create listing');
    const created = await res.json();
    return {
      id: created.id,
      title: created.title,
      description: created.description,
      categoryId: created.category_id,
      quantity: created.quantity,
      unit: created.unit,
      price: created.price,
      originalPrice: created.original_price,
      discountPercent: created.discount_percent,
      imageUrl: created.image_url,
      businessId: created.business_id,
      available: created.available,
      createdAt: created.created_at,
      featured: created.featured,
      tags_list: created.tags_list
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
