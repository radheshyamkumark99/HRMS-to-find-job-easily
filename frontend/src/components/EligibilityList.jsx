import React from "react";

const EligibilityList = ({ eligibility }) => {
  const items = eligibility
    ? eligibility.split(/\./).map((item) => item.trim()).filter(item=>item.length>0)
    : [];

  return (
    <ul className="list-disc list-inside text-gray-300">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default EligibilityList;
