export default function Header({ children }: { children: string }) {
  return (
    <h1 className='text-4xl sm:text-5xl font-bold mb-4 text-center'>
      {children}
    </h1>
  );
}
