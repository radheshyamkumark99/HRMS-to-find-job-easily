import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchUser } from "../customHooks/useAuth";
import { logo } from "../assets";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email || "");
  }, []);

  const { data, isLoading } = useFetchUser(userEmail);
  const isHR = data?.role === "HR";
  const userName = data?.name.split(" ")[0];
  const name =
    userName?.charAt(0).toUpperCase() + userName?.slice(1).toLowerCase();

  const profilePath = isHR ? "/profile/hr" : "/profile/applicant";

  const isLoggedIn = Boolean(userEmail && data);

  const handleProfileClick = () => {
    navigate(profilePath);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <header className="bg-gray-900 text-white  shadow-md">
      <div className="container mx-auto flex justify-between px-2 items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-23 w-23" />
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-xl text-[#2865FC] font-bold hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="text-xl text-[#2865FC] font-bold hover:text-blue-400"
          >
            Jobs
          </Link>
          <Link
            to="/contact"
            className="text-xl text-[#2865FC] font-bold hover:text-blue-400"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:block">
          {isLoggedIn ? (
            <span
              onClick={handleProfileClick}
              className="cursor-pointer hover:text-blue-400 bg-gray-800 p-3 rounded-full"
            >
              {name}
            </span>
          ) : (
            <Link to="/login">
              <button className="py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700">
                Login
              </button>
            </Link>
          )}
        </div>
        <div className="md:hidden   ">
          <button
            onClick={toggleMenu}
            className="text-white p-0 m-0 bg-transparent border-none outline-none"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-4">
          <Link
            to="/"
            className="text-xl text-[#2865FC] font-bold"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="text-xl text-[#2865FC] font-bold"
            onClick={toggleMenu}
          >
            Jobs
          </Link>
          <Link
            to="/contact"
            className="text-xl text-[#2865FC] font-bold"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          {isLoggedIn ? (
            <span
              onClick={handleProfileClick}
              className="cursor-pointer hover:text-blue-400"
            >
              {userName}
            </span>
          ) : (
            <Link to="/login">
              <button
                onClick={toggleMenu}
                className="py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
