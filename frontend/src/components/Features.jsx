import React from "react";
import {
  RiSearchLine,
  RiShieldCheckLine,
  RiToolsLine,
  RiRadarLine,
} from "react-icons/ri";

const Features = () => {
  const features = [
    {
      title: "Easy Job Search",
      detail: "AI-powered filtering tailored to your skills and interests.",
      icon: <RiSearchLine className="w-8 h-8 text-white" />,
    },
    {
      title: "Secure Applications",
      detail: "Your data is encrypted and handled with utmost care.",
      icon: <RiShieldCheckLine className="w-8 h-8 text-white" />,
    },
    {
      title: "HR Tools",
      detail: "Streamlined hiring from applicant filtering to interviews.",
      icon: <RiToolsLine className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <section className="bg-gray-900 w-full py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col gap-8 md:w-1/2">
          <h2 className="text-4xl font-bold text-white mb-4">Features</h2>
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.detail}</p>
            </div>
          ))}
        </div>
        <div className="relative mt-12 md:mt-0 md:w-1/2 flex justify-center">
          <div className="w-[120px] h-[120px] rounded-full border-[3px] border-blue-600 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center relative">
            <div className="absolute w-12 h-12 bg-transparent rounded-full flex items-center justify-center">
              <RiRadarLine className="w-6 h-6 text-blue-600" />
            </div>

            <div className="absolute -top-10 right-[50%] translate-x-1/2 flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-800 text-white flex items-center justify-center rounded-full shadow-lg border border-blue-600">
                {features[0].icon}
              </div>
            </div>
            <div className="absolute bottom-2 right-[-20px] flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-800 text-white flex items-center justify-center rounded-full shadow-lg border border-blue-600">
                {features[1].icon}
              </div>
            </div>
            <div className="absolute bottom-2 left-[-20px] flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-800 text-white flex items-center justify-center rounded-full shadow-lg border border-blue-600">
                {features[2].icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
