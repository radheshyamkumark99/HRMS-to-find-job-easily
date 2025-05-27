import { Link } from "react-router-dom";
import { useFetchJobsByEmail } from "../customHooks/useJob";

const JobSection = ({ hrEmail, setSelectedJobId, onJobClick }) => {
  const {
    data: jobs = [],
    isLoading,
    error,
  } = useFetchJobsByEmail(hrEmail);

  if (isLoading) return <p className="text-gray-400">Loading jobs...</p>;
  if (error)
    return <p className="text-red-500">Error loading jobs: {error.message}</p>;

  return (
    <div>
      <Link to="/post-job">
        <button className="mb-6 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          + Create a Job
        </button>
      </Link>
      {jobs.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {jobs.map((job) => (
            <li
              key={job.id}
              onClick={() => {
                setSelectedJobId(job.id);
                onJobClick(job.id);
              }}
              className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition cursor-pointer"
            >
              <h3 className="text-gray-100 font-medium">{job.title}</h3>
              <p className="text-gray-400 text-sm truncate">
                {job.description}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Posted: {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No jobs posted yet.</p>
      )}
    </div>
  );
};

export default JobSection;
