"use client";
import React, { useEffect, useState } from "react";

const FailedPayment = ({ description }) => {
  // State to track the visibility of the component
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the component after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 3000 milliseconds (3 seconds)

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Render the component only if isVisible is true
  return isVisible ? (
    <div>
      <div className="flex justify-center items-center rounded-sm w-[500px] h-[100px] z-50 bg-[#ef4444] absolute top-0 left-0 right-0 mx-auto">
        <h2 className="text-white text-2xl font-semibold">{description}</h2>
        <p>Por favor inténtalo nuevamente.</p>
      </div>
    </div>
  ) : null;
};

export default FailedPayment;
