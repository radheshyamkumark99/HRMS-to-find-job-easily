import React from "react";
import { useParams, Link } from "react-router-dom";

import AuthCard from "../components/AuthCard";
import AuthButton from "../components/AuthButton";
import EligibilityList from "../components/EligibilityList";
import { useFetchJobById } from "../customHooks/useJob";

const JobDetailsPage = () => {
  const { jobId } = useParams();

  
  const { data: job, isLoading } = useFetchJobById(jobId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <p>Job not found.</p>
      </div>
    );
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 md:p-10">
      <AuthCard title={job.title}>
        <div className="animate-fadeIn">
          <p className="text-gray-300 mb-6 leading-relaxed">
            {job.description}
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Eligibility
            </h3>
            <EligibilityList eligibility={job.eligibility} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
            <p>
              <span className="font-semibold text-white">Deadline:</span>{" "}
              {new Date(job.deadline).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold text-white">Posted:</span>{" "}
              {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link to={`/jobs/${jobId}/apply`}>
              <AuthButton label="Apply Now" isLoading={false} />
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
};

export default JobDetailsPage;
