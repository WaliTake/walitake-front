'use client';

import { useState, useEffect } from 'react';

interface UseMockDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Generic hook for simulated async data loading.
 * @example
 * const { data, loading, error } = useMockData(() => getListings());
 */
export function useMockData<T>(fetcher: () => Promise<T>): UseMockDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error al cargar datos');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}
