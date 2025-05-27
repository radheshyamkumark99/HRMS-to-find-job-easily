import React from "react";

const FeedbackCard = ({ feedback }) => {
  const { name, stars, description, date } = feedback;

  const renderStars = (rating) => {
    const maxStars = 5;
    return Array.from({ length: maxStars }, (_, index) => (
      <span
        key={index}
        className={index < rating ? "text-yellow-400" : "text-gray-500"}
      >
        {index < rating ? "★" : "☆"}
      </span>
    ));
  };

  return (
    <div className="bg-gray-800 text-gray-100 drop-shadow-md overflow-hidden rounded-xl my-4 w-80 flex flex-col hover:shadow-lg transition-shadow">
      <div className="p-5">
        <h1 className="font-semibold text-lg truncate mb-2">{name}</h1>
        <div className="flex mb-2">{renderStars(stars)}</div>
        <p className="text-sm text-gray-400 line-clamp-3 mb-2">{description}</p>
        <p className="text-xs text-gray-500">
          {new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default FeedbackCard;
