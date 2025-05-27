import React, { useEffect, useState } from "react";

import FilterSection from "../components/FilterSection";
import JobList from "../components/JobList";
import { useFetchAllJobs } from "../customHooks/useJob";

const DashboardPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    title: "",
    eligibility: "",
    email: "",
    deadlineAfter: "",
    sort: 'latest'
  });
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(0);
  }, [filters]);
    const { data: jobs = [], isLoading} = useFetchAllJobs();

  const filteredJobs = jobs
    .filter(
      (job) =>
        (filters.search
          ? job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            job.description.toLowerCase().includes(filters.search.toLowerCase())
          : true) &&
        (filters.title
          ? job.title.toLowerCase().includes(filters.title.toLowerCase())
          : true) &&
        (filters.eligibility
          ? job.eligibility
              .toLowerCase()
              .includes(filters.eligibility.toLowerCase())
          : true) &&
        (filters.email
          ? job.email.toLowerCase().includes(filters.email.toLowerCase())
          : true) &&
        (filters.deadlineAfter
          ? new Date(job.deadline) >= new Date(filters.deadlineAfter)
          : true)
    )
    .sort((a, b) =>
      filters.sort === "latest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
          Loading...
        </div>
      );
    }

  return (
    <div className="min-h-fit bg-gray-900 p-4 md:p-8 md:px-32 mb-2">
      <div className="flex flex-col md:flex-row">
        <FilterSection filters={filters} setFilters={setFilters} />
        <JobList jobs={filteredJobs} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default DashboardPage;
