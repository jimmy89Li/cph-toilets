import { useQuery } from '@tanstack/react-query';
import type { GeocodeCache, NominatimResponse } from '../types/toilet';

const API_URL = import.meta.env.VITE_ADDRESS_API as string;
const STORAGE_KEY = 'reverse-geocode-cache';

function saveCachedAddress(lat: number, lon: number, address: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const cache = raw ? (JSON.parse(raw) as GeocodeCache) : {};
    const key = `${lat.toFixed(6)},${lon.toFixed(6)}`;
    cache[key] = address;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    console.log('Failed to set the address.');
  }
}

function loadCachedAddress(lat: number, lon: number): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw) as GeocodeCache;
    const key = `${lat.toFixed(6)},${lon.toFixed(6)}`;
    return cache[key] ?? null;
  } catch {
    return null;
  }
}

export function useReverseGeocode(lat: number, lon: number) {
  return useQuery({
    queryKey: ['reverse-geocode', lat, lon],
    queryFn: async () => {
      if (lat === 0 || lon === 0) throw new Error('Invalid coordinates');

      const cached = loadCachedAddress(lat, lon);
      if (cached) return cached;

      const res = await fetch(
        `${API_URL}?format=json&lat=${lat.toString()}&lon=${lon.toString()}`
      );
      if (!res.ok) throw new Error('Failed to fetch address');

      const data = (await res.json()) as NominatimResponse;
      const address = `${data.address.road ?? data.address.quarter}, ${
        data.address.suburb
      }`;
      saveCachedAddress(lat, lon, address);

      return address;
    },
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });
}
