import { getMapLink } from '../hooks/useToilets';
import type { ToiletFeature } from '../types/toilet';

export default function ToiletCard({ toilet }: { toilet: ToiletFeature }) {
  return (
    <div>
      <li
        key={toilet.id}
        className='p-4 border rounded shadow'
        data-cy='toilet-card'
      >
        <h2 className='text-lg font-semibold'>
          {toilet.properties.toilet_lokalitet}
        </h2>
        <p>
          {toilet.properties.vejnavn_husnummer}, {toilet.properties.postnummer}
        </p>
        <p>
          {toilet.properties.aabningstid_doegn} · Handicap access:{' '}
          {toilet.properties.handicapadgang}
        </p>
        {toilet.distance && (
          <p className='text-sm text-gray-400'>
            Distance: {toilet.distance.toFixed(2)} km
          </p>
        )}
        <a
          href={getMapLink(
            toilet.properties.latitude,
            toilet.properties.longitude
          )}
          target='_blank'
          rel='noopener noreferrer'
          className='text-purple-300 font-bold'
        >
          Get Directions
        </a>
      </li>
    </div>
  );
}
