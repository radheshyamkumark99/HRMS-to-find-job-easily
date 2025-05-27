import React, { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { useGetAppliedJobsByApplicantEmail } from "../customHooks/useAppliedJob";
import RoomForm from "../components/RoomForm";

const UserProfilePage = () => {
  const [activeSection, setActiveSection] = useState("Profile");
  const userEmail = localStorage.getItem("userEmail") || "";

  const {
    data: appliedJobs = [],
    isLoading: jobsLoading,
    error: jobsError,
  } = useGetAppliedJobsByApplicantEmail(userEmail);

  const sections = [
    {
      name: "Profile",
      icon: "M12 12a4 4 0 100-8 4 4 0 000 8zM12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z",
    },
    {
      name: "Applied Jobs",
      icon: "M4 6h16v2H4zm0 4h16v2H4zm0 4h16v2H4z",
    },
  ];

  const sectionRef = useRef({
    Profile: () => (
      <div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 p-6 rounded-2xl shadow-xl max-w-md mx-auto"
      >
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <p className="text-gray-100 text-center text-lg font-semibold">
          Name: Applicant User
        </p>
        <p className="text-gray-400 text-center">Email: {userEmail}</p>
        <p className="text-gray-400 text-center">Role: Applicant</p>
      </div>
    ),
    "Applied Jobs": () => (
      <div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {jobsLoading && (
          <p className="text-gray-400 text-center">Loading applied jobs...</p>
        )}
        {jobsError && (
          <p className="text-red-500 text-center">Error loading jobs</p>
        )}
        {appliedJobs.length > 0 ? (
          <ul className="space-y-4">
            {appliedJobs.map((job) => (
              <li
                key={job.id}
                className="p-4 bg-gray-700 rounded-xl shadow hover:bg-gray-600"
              >
                <p className="text-gray-100 font-semibold text-lg">
                  {job.title}
                </p>
                <p className="text-gray-400 text-sm">{job.description}</p>
                <p className="text-gray-500 text-sm">
                  Applied: {new Date(job.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-400 text-sm">
                  Email: {job.applicantEmail}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-center">No jobs applied yet.</p>
        )}
      </div>
    ),
    "Join Room": () => {
      <div>
        <RoomForm />
      </div>;
    },
  });

  return (
    <div className="h-fit  bg-gray-900 flex flex-col md:flex-row">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sections={sections}
      />
      <main className="flex-1 p-6 md:p-8">
        <h1 className="text-2xl text-gray-100 font-bold mb-6">
          Applicant Dashboard
        </h1>
        {sectionRef.current[activeSection]()}
      </main>
    </div>
  );
};

export default UserProfilePage;
