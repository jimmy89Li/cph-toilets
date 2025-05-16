export default function Error({
  locationError,
}: {
  locationError: string | null;
}) {
  if (!locationError) return;
  return (
    <p className='mt-4 text-red-600 bg-red-100 p-3 rounded'>{locationError}</p>
  );
}
