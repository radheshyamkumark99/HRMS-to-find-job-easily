import React from "react";

import ApplicantDetails from "./ApplicantDetails"; 
import { useGetApplicantsByHrEmail } from "../customHooks/useAppliedJob";

const ApplicantList = () => {
  const email = localStorage.getItem("userEmail"); 
  const {
    data: applicants,
    isLoading,
    isError,
    error,
  } = useGetApplicantsByHrEmail(email);

  if (isLoading) {
    return <p>Loading applicants...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (applicants?.length === 0) {
    return <p>No applicants are present.</p>;
  }

  return (
    <div className="space-y-4">
      {applicants?.map((applicant) => (
        <ApplicantDetails
          key={applicant.id}
          applicant={applicant}
          jobId={applicant.jobId}
        />
      ))}
    </div>
  );
};

export default ApplicantList;
