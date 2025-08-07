"use client";

import Image from "next/image";
import React, { useState } from "react";
import { experiences } from "@/lib/db";
import DefaultBtn from "../defaultBtn/DefaultBtn";

const Experience: React.FC = () => {
  const [showAchievements, setShowAchievements] = useState<{
    [key: number]: boolean;
  }>({});

  const handleToggleAchievements = (id: number) => {
    setShowAchievements((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Experience
        </h2>
      </div>
      <div className="grid gap-8"> {/* Removed grid-cols-2/3 here */}
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-6 flex flex-col md:flex-row items-start gap-6" // Added flex layout
          >
            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center border rounded-lg p-2">
              <Image
                src={experience.image || "/placeholder.svg"}
                width={128} // Increased width for better display in the new layout
                height={128} // Increased height
                alt={experience.company}
                className="object-contain max-w-full max-h-full"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                {experience.company}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {experience.position}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {experience.startDate} - {experience.endDate}
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {experience.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {experience.projectUrl && experience.projectUrl.length > 0 && (
                  experience.projectUrl
                    .filter(url => url && url.trim() !== "") // Filter out empty URLs
                    .map((url, index) => (
                      <DefaultBtn
                        key={index}
                        description={`Project ${index + 1}`}
                        url={url}
                        target="_blank"
                        type=""
                      />
                    ))
                )}
                <DefaultBtn
                  target=""
                  url=""
                  description="Achievements"
                  onclick={() => handleToggleAchievements(experience.id)}
                  type=""
                />
              </div>
              {showAchievements[experience.id] && (
                <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <ul>
                    {experience.achievements.map((achievement, index) => (
                      <li
                        key={index}
                        className="text-gray-700 dark:text-gray-300 list-disc ml-5"
                      >
                        {achievement}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleToggleAchievements(experience.id)}
                    className="mt-4 text-sm text-[#0891b2] hover:text-[#06b6d4] transition"
                  >
                    Close Achievements
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
