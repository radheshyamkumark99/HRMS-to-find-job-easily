// src/components/Loading.js
import React from 'react';

const Loading = () => (
  <div className="flex justify-center items-center">
    <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
    </svg>
  </div>
);

export default Loading;