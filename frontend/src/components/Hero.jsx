import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full bg-gray-900 text-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Find Your <span className="text-blue-600">Dream Job</span>
          </h1>
          <p className="text-base md:text-lg text-gray-400 mb-6 max-w-md mx-auto md:mx-0">
            Unlock opportunities, connect with top employers, and begin the
            journey to your ideal career.
          </p>
          <Link to="/jobs">
            <button className="inline-block py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-medium tracking-wide">
              Explore Jobs
            </button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Professional workspace"
            className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
