"use client";
import React, { useEffect, useState } from "react";

const FailedPayment = ({ description }) => {
  // Render the component only if isVisible is true
  return (
    <div>
      <div className="flex justify-center items-center rounded-sm w-[500px] h-[100px] z-50 bg-[#ef4444] absolute top-0 left-0 right-0 mx-auto">
        <h2 className="text-white text-2xl font-semibold">{description}</h2>
        <p>Por favor inténtalo nuevamente.</p>
      </div>
    </div>
  );
};

export default FailedPayment;
