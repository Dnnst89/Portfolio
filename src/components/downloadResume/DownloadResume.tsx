import Image from "next/image";
import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";

const DownloadResume = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#0891b2]">
        Download My Resume
      </h2>
      <p className="text-gray-700 text-lg mb-4 text-center">
        Get to know my professional journey.
      </p>
      <div className="flex justify-center mb-4">
        <Image
          width={50}
          height={50}
          src="PDF_image.png"
          alt="Resume"
          className="h-48 w-auto"
        />{" "}
      </div>
      <div className="flex justify-center mb-6">
        <a
          href="/DannySotoResume.pdf"
          download="DannySotoResume.pdf"
          className="flex items-center justify-center px-4 py-2 bg-[#0891b2] text-white font-bold rounded-full shadow hover:bg-[#06b6d4] focus:outline-none"
        >
          <FaCloudDownloadAlt size={30} className="mr-2" />
          Download
        </a>
      </div>
    </div>
  );
};

export default DownloadResume;
