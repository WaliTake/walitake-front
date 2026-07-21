/**
 * Simulates an async API delay.
 * Use this to wrap mock data fetchers so loading states work naturally.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
