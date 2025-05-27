import React from "react";
import { Link } from "react-router-dom";
import jobsData from "../constants/jobData";

const JobCard = ({ job }) => {
  const date = new Date(job.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      to={`/jobs/${job.id}`}
      className="bg-gray-800 hover:ring-2 hover:ring-blue-500 transition-all rounded-2xl p-6 flex flex-col gap-4 shadow-md hover:shadow-xl min-h-[220px]"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white truncate">
          {job.title}
        </h3>
        <span className="text-sm text-gray-400">{date}</span>
      </div>

      <p className="text-base text-gray-300 line-clamp-3">{job.description}</p>

      <div className="flex justify-between items-center mt-auto">
        <span className="text-sm text-gray-400">
          {job.company || "Unknown Company"}
        </span>
        <span className="text-sm text-gray-400">
          {job.location || "Remote"}
        </span>
      </div>
    </Link>
  );
};

const FeaturedJobs = () => {
  const jobs = jobsData.slice(0, 3);

  return (
    <section className="w-full bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-white mb-12">
          Featured <span className="text-blue-600">Jobs</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
