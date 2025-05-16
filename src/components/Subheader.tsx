export default function Subheader({
  title,
  sub,
}: {
  title: string;
  sub?: string;
}) {
  return (
    <p className='text-center'>
      <strong>{title}</strong>
      <br />
      {sub && <em>({sub})</em>}
    </p>
  );
}
