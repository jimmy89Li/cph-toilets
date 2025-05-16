import { useQuery } from '@tanstack/react-query';
import { fetchToilets } from '../api/toilets';
import type { ToiletFeature } from '../types/toilet';

export function useToilets(enabled: boolean = true) {
  return useQuery<ToiletFeature[]>({
    queryKey: ['toilets'],
    queryFn: fetchToilets,
    enabled, // Only runs when "enabled" is true
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function getMapLink(lat: number, lon: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat.toString()},${lon.toString()}`;
}
