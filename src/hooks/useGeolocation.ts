import { useEffect, useState } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation(pos.coords);
    });
  }, []);

  return location;
}
