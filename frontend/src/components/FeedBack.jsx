import React from "react";
import Slider from "react-slick";
import FeedbackCard from "./FeedBackCard";
import feedbackData from "../constants/feedbacks";

const FeedBack = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="w-full bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            What Our <span className="text-blue-600">Users Say</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Genuine voices from job seekers and recruiters.
          </p>
        </div>

        <Slider {...settings} className="mx-2 md:mx-0">
          {feedbackData.map((feedback, index) => (
            <div key={index} className="px-3">
              <FeedbackCard feedback={feedback} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeedBack;
