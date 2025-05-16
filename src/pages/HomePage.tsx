import { useState } from 'react';
import { useToilets } from '../hooks/useToilets';
import { getDistanceInKm } from '../utils/distance';
import { useReverseGeocode } from '../hooks/useReverseGeocode';

import Header from '../components/Header';
import Button from '../components/Button';
import RadiusControls from '../components/RadiusControls';
import Error from '../components/Error';
import Subheader from '../components/Subheader';
import ToiletCards from '../components/ToiletCards';

export default function HomePage() {
  const [locationError, setLocationError] = useState<string | null>(null);
  const [radius, setRadius] = useState(1);
  const [coords, setCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const { data: toilets, isLoading, error } = useToilets();
  const { data: address } = useReverseGeocode(
    coords?.lat ?? 0,
    coords?.lon ?? 0
  );

  const handleLocateMe = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLocationError(null);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocationError('Failed to fetch your location.');
      }
    );
  };

  const filteredToilets =
    toilets && coords
      ? toilets
          .map((t) => {
            const distance = getDistanceInKm(
              coords.lat,
              coords.lon,
              t.properties.latitude,
              t.properties.longitude
            );
            return { ...t, distance };
          })
          .filter((t) => t.distance <= radius) // within selected radius
          .sort((a, b) => a.distance - b.distance) // optional: closest first
      : toilets;

  return (
    <div className='p-2'>
      <div className='header flex flex-col'>
        <Header>Toilets in Copenhagen</Header>
        <Button onClick={handleLocateMe}>Find Nearest Toilets</Button>
        {coords && <RadiusControls onClick={setRadius} radius={radius} />}
      </div>

      {isLoading && <p className='text-center'>Loading toilets...</p>}

      <Error locationError={error ? 'Failed to load toilets.' : null} />
      <Error locationError={locationError} />

      {filteredToilets && coords ? (
        <Subheader
          title={`${filteredToilets.length.toString()} toilets in your area`}
          sub={address ?? `${coords.lat.toString()} / ${coords.lon.toString()}`}
        />
      ) : (
        <Subheader
          title={`${toilets?.length.toString() || '0'} total toilets available`}
        />
      )}

      <ToiletCards filteredToilets={filteredToilets} />
    </div>
  );
}
