import type { ToiletApiResponse, ToiletFeature } from '../types/toilet';

const API_URL = import.meta.env.VITE_TOILETS_API as string;

export async function fetchToilets(): Promise<ToiletFeature[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error('Failed to fetch toilets');
  }

  const data = (await res.json()) as ToiletApiResponse;
  return data.features;
}
