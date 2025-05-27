import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  isPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-gray-300 text-sm font-medium mb-1">
        {label}
      </label>
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        ) : (
          <input
            type={isPassword && showPassword ? "text" : type}
            name={name}
            {...(type !== "file" && { value })}
            onChange={onChange}
            className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept={type === "file" ? "application/pdf" : undefined}
            required
          />
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bg-gray-800 right-3 top-1/2 transform -translate-y-1/2 "
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
