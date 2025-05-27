import React, { useState } from "react";
import AuthForm from "./AuthForm";

const FilterSection = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const fields = [
    { label: "Search", type: "text", name: "search", value: filters.search },
    { label: "Title", type: "text", name: "title", value: filters.title },
    {
      label: "Eligibility",
      type: "text",
      name: "eligibility",
      value: filters.eligibility,
    },
    { label: "Email", type: "email", name: "email", value: filters.email },
    {
      label: "Deadline After",
      type: "date",
      name: "deadlineAfter",
      value: filters.deadlineAfter,
    },
  ];

  return (
    <div className="w-full md:w-1/4 md:pr-4">
      <button
        className="md:hidden flex items-center text-white bg-blue-600 px-3 py-2 rounded-lg mb-4 shadow hover:bg-blue-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4h18M3 12h18M3 20h18"
          />
        </svg>
        <span className="font-semibold text-sm">Filters</span>
      </button>
      <div
        className={`md:block ${
          isOpen ? "block" : "hidden"
        } bg-gray-800 p-4 rounded-lg shadow-md transition-all duration-300`}
      >
        <AuthForm
          fields={fields}
          onSubmit={handleSubmit}
          buttonLabel="Apply Filters"
          isLoading={false}
          errors={{}}
          handleChange={handleChange}
        />

        <div className="mt-4">
          <label className="block text-sm text-gray-300 font-medium mb-1">
            Sort By
          </label>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="latest">Latest Jobs</option>
            <option value="oldest">Oldest Jobs</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
