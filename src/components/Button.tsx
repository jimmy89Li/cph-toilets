import React from 'react';

type ButtonProps = {
  children: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className='bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 mb-4 w-full max-w-xl m-auto'
    >
      {children}
    </button>
  );
}
