import React from "react";
import JobCard from "./JobCard";
import AuthButton from "./AuthButton";

const JobList = ({ jobs, page, setPage }) => {
  const pageSize = 5;
  const totalPages = Math.ceil(jobs.length / pageSize);
  const paginatedJobs = jobs.slice(page * pageSize, (page + 1) * pageSize);

  const handlePrevious = () => {
    setPage((p) => {
      const newPage = Math.max(0, p - 1);
      return newPage;
    });
  };

  const handleNext = () => {
    setPage((p) => {
      const newPage = Math.min(totalPages - 1, p + 1);
      return newPage;
    });
  };

  return (
    <div className="flex-1">
      {paginatedJobs.length > 0 ? (
        paginatedJobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <p className="text-gray-400 text-center">No jobs match the filters.</p>
      )}
      <div className="flex w-full justify-center gap-4 mt-4">
        <div className="w-20">
          <AuthButton
            label="Prev"
            isLoading={false}
            onClick={handlePrevious}
            disabled={page === 0}
          />
        </div>
        <span className="text-sm text-gray-400 px-4 py-2 bg-gray-800 mx-2 rounded">
          Page {page + 1} of {totalPages}
        </span>

        <div className="w-20 ">
          <AuthButton
            label="Next"
            isLoading={false}
            onClick={handleNext}
            disabled={page >= totalPages - 1}
          />
        </div>
      </div>
    </div>
  );
};

export default JobList;
