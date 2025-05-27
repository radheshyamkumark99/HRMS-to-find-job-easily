import React from 'react';
import { Link } from 'react-router-dom';
const AuthCard = ({ title, children, footerLink, footerText, footerLinkText }) => (
  <div
    className="max-w-md w-full mx-auto bg-gray-800 rounded-xl shadow-lg p-8"
  >
    <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">{title}</h2>
    {children}
    <p className="mt-4 text-center text-gray-400">
      {footerText}{' '}
      <Link to={footerLink} className="text-blue-500 hover:underline">
        {footerLinkText}
      </Link>
    </p>
  </div>
);

export default AuthCard;