import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const category = job.eligibility?.split(' ')[0] || 'General'; 
  const shortDesc = job.description.length > 100 ? `${job.description.slice(0, 100)}...` : job.description;

  return (
    <div
      className="bg-gray-800 rounded-lg p-4 mb-4 hover:bg-gray-700 "
    >
      <Link to={`/jobs/${job.id}`} className='no-underline hover:no-underline focus:no-underline'>
        <h3 className="text-lg font-semibold text-gray-100">{job.title}</h3>
        <p className="text-gray-400 text-sm mt-1">{shortDesc}</p>
        <div className="flex justify-between mt-2 text-gray-500 text-sm">
          <span>Category: {category}</span>
          <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
        </div>
      </Link>
    </div>
  );
};

export default JobCard;