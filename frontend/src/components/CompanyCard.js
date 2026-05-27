import React from "react";

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col justify-between w-full h-40">
      {/* Company Name */}
      <h2 className="text-lg font-bold mb-2">{company.name}</h2>

      {/* Company Details */}
      <div className="text-gray-600 flex-1">
        <p><span className="font-semibold">Location:</span> {company.location}</p>
        <p><span className="font-semibold">Industry:</span> {company.industry}</p>
      </div>

    </div>
  );
};

export default CompanyCard;
