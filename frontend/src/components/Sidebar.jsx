import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../customHooks/useAuth";

const Sidebar = ({ activeSection, setActiveSection, sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate: deleteUser } = useDeleteUser();

  const handleLogout = () => {
    const userEmail = localStorage.getItem("userEmail");
    deleteUser(userEmail, {
      onSuccess: () => {
        navigate("/", { state: { from: "profile" } });
      },
    });
  };

  return (
    <aside className="w-full md:w-64 bg-gray-900 text-gray-100 h-fit px-4 py-6 shadow-md">
      <button
        className="md:hidden flex items-center text-gray-100 mb-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span className="font-semibold">Menu</span>
      </button>

      <div className={`${isOpen ? "block" : "hidden"} md:block`}>
        <ul className="space-y-4">
          {sections.map((section) => (
            <li key={section.name}>
              <button
                onClick={() => setActiveSection(section.name)}
                className={`flex items-center w-full px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                  activeSection === section.name
                    ? "bg-blue-600 shadow-sm"
                    : "hover:bg-gray-700"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={section.icon} />
                </svg>
                <span className="text-sm font-medium">{section.name}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
