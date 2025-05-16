import type { ToiletFeature } from '../types/toilet';
import ToiletCard from './ToiletCard';

export default function ToiletCards({
  filteredToilets,
}: {
  filteredToilets: ToiletFeature[] | undefined;
}) {
  if (!filteredToilets) return;
  return (
    <ul className='mt-6 space-y-4'>
      {filteredToilets.map((toilet) => {
        return <ToiletCard toilet={toilet} key={toilet.id} />;
      })}
    </ul>
  );
}
