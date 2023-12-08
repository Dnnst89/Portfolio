import React from "react";
import { AiFillWarning } from "react-icons/ai";

const ErrorForm = ({ children }) => {
  return (
    <div className="flex gap-2 items-center text-[#dc2626] text-[10px] pl-3 mb-5 max-w-[220px] md:max-w-[238px]">
      <div>
        <AiFillWarning />
      </div>
      {children}
    </div>
  );
};

export default ErrorForm;
