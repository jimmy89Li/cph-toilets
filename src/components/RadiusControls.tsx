type RadiusControlsProps = {
  onClick: (radius: number) => void;
  radius: number;
};

const range = [0.5, 1, 2, 5];

export default function RadiusControls({
  onClick,
  radius,
}: RadiusControlsProps) {
  return (
    <div className='mb-4 space-x-1.5 flex justify-center'>
      {range.map((r, i) => (
        <button
          key={i}
          onClick={() => {
            onClick(r);
          }}
          className={`px-1 py-2 rounded border grow-1 basis-10 ${
            radius === r
              ? 'bg-purple-800 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {`≤ ${r.toString()}km`}
        </button>
      ))}
    </div>
  );
}
