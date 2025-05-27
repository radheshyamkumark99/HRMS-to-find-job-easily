import React from 'react';
import Loading from './Loading';

const AuthButton = ({ label, isLoading, onClick, disabled, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || isLoading}
    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 transition-colors cursor-pointer"
  >
    {isLoading ? <Loading /> : label}
  </button>
);

export default AuthButton;