import React from 'react';

export default function Tooltip({ text }) {
  return (
    <div className="relative inline-block">
      <button
        className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-sm text-neutral-700"
        aria-label="Help"
      >
        ?
      </button>
      <div className="absolute z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition duration-200 right-0 -top-12 w-64 bg-white border border-neutral-200 rounded-md p-3 text-sm text-neutral-700 shadow-md">
        {text}
      </div>
    </div>
  );
}
