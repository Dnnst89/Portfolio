import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import {
  AiOutlineTeam,
  AiOutlineSolution,
  AiOutlineClockCircle,
  AiOutlineAntDesign,
  AiOutlineEdit,
} from "react-icons/ai";

const SoftSkills = () => {
  const softSkills = [
    {
      title: "Communication",
      icon: <AiOutlineEdit className="text-[#FF9EAA] mr-2" size={50} />,
      skills: [
        {
          name: "Verbal Communication",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Written Communication",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Active Listening",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Presentation Skills",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        // Add more skills
      ],
    },
    {
      title: "Teamwork",
      icon: <AiOutlineTeam className="text-[#FF9EAA] mr-2" size={50} />,
      skills: [
        {
          name: "Collaboration",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Leadership",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Conflict Resolution",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Supporting Others",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        // Add more skills
      ],
    },
    {
      title: "Problem-solving",
      icon: <AiOutlineSolution className="text-[#FF9EAA] mr-2" size={50} />,
      image: "/communication.jpg", // Add the path to the image
      skills: [
        {
          name: "Critical Thinking",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Decision Making",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Analytical Skills",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Creative Thinking",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
      ],
    },
    {
      title: "Time Management",
      icon: <AiOutlineClockCircle className="text-[#FF9EAA] mr-2" size={50} />,
      skills: [
        {
          name: "Prioritization",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Organization",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Meeting Deadlines",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Time Estimation",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
      ],
    },
    {
      title: "Adaptability",
      icon: <AiOutlineAntDesign className="text-[#FF9EAA]  mr-2" size={50} />,
      skills: [
        {
          name: "Flexibility",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Open-mindedness",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Resilience",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Embracing Change",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
      ],
    },
    {
      title: "Work Under Pressure",
      icon: <AiOutlineAntDesign className="text-[#FF9EAA] mr-2" size={50} />,
      skills: [
        {
          name: "Time Management",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Problem-solving",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Decision Making",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
        {
          name: "Prioritization",
          icon: <FiCheckCircle className="text-[#3AA6B9] mr-2" />,
        },
      ],
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6 text-center">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Soft Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {softSkills.map((category, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex flex-col justify-center items-center border border-gray-200 dark:border-gray-600 transition duration-300 hover:border-green-500"
          >
            {category.icon}
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">
              {category.title}
            </h3>
            <ul className="list-disc ml-6">
              {category.skills.map((skill, skillIndex) => (
                <li
                  key={skillIndex}
                  className="text-gray-700 dark:text-gray-300 flex items-center"
                >
                  {skill.icon}
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoftSkills;
