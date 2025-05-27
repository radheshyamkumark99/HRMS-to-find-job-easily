import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { useFetchJobById } from "../customHooks/useJob";
import {
  useSendRoomIdToApplicant,
  useUpdateApplicationStatus,
} from "../customHooks/useAppliedJob";
import AuthButton from "./AuthButton";

const ApplicantDetails = ({ applicant, jobId }) => {
  const navigate = useNavigate();
  const { data: job } = useFetchJobById(jobId);

const { mutate: updateStatus } = useUpdateApplicationStatus();

  const { mutate: sendRoomId } = useSendRoomIdToApplicant();

  const roomId = localStorage.getItem("roomId");

  const handleStatusChange = (status) => {
    updateStatus(
      { applicantEmail: applicant.applicantEmail, jobId: job.id, status },
      {
        onSuccess: () => {
          navigate("/profile/hr");
        },
      }
    );
  };

  const handleScheduleInterview = () => {
    if (!roomId) {
      alert("Please create a Room ID first.");
      navigate("/profile/hr");
    } else {
      sendRoomId(
        {
          applicantEmail: applicant.applicantEmail,
          hrEmail: job.email,
          jobId: job.id,
          roomId,
        },
        {
          onSuccess: () => {
            navigate(`/interviews/${roomId}`);
          },
        }
      );
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-xl max-w-4xl mx-auto space-y-6">
      <div className="text-2xl font-bold text-white">{job?.title}</div>

      <div className="max-h-40 overflow-y-auto custom-scrollbar bg-gray-800 p-4 rounded-md text-sm text-gray-300">
        {job?.description}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">
          Applicant Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-800 p-3 rounded-md text-gray-300 flex flex-col">
            <span className="mb-1">Email:</span>
            <span className="text-gray-100 break-words">
              {applicant.applicantEmail}
            </span>
          </div>
          <div className="bg-gray-800 p-3 rounded-md text-gray-300 flex flex-col">
            <span className="mb-1">Resume:</span>
            <a
              href={applicant.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline break-words"
            >
              View Resume
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
        <button
          onClick={() => handleStatusChange("accepted")}
          className="flex items-center justify-center py-2 px-4 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FaRegCheckCircle className="mr-2" /> Send Offer
        </button>

        <button
          onClick={() => handleStatusChange("rejected")}
          className="flex items-center justify-center py-2 px-4 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <FaRegTimesCircle className="mr-2" /> Reject
        </button>
      </div>

      <div className="mt-4">
        <button
          onClick={handleScheduleInterview}
          className="w-full py-2 px-4 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition"
        >
          Schedule Interview
        </button>
      </div>
    </div>
  );
};

export default ApplicantDetails;
