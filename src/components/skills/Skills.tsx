import React from "react";
import {
  FaCode,
  FaDatabase,
  FaToolbox,
  FaFileCode,
  FaHtml5,
  FaCss3,
  FaGit,
  FaGithub,
  FaBitbucket,
  FaNpm,
  FaFigma,
  FaReact,
} from "react-icons/fa";
import {
  SiRedux,
  SiTailwindcss,
  SiPostman,
  SiAmazons3,
  SiAmazonec2,
  SiAmazonroute53,
  SiNextdotjs,
  SiPnpm,
  SiJest,
  SiStorybook,
} from "react-icons/si";
import { DiSqllite, DiScrum } from "react-icons/di";
import { GrGraphQl } from "react-icons/gr";
import { IoLogoJavascript } from "react-icons/io";

const Skills = () => {
  // Skills data organized by categories
  const categories = [
    {
      title: "Programming Languages",
      skills: [
        {
          icon: IoLogoJavascript,
          text: "Javascript",
          color: "text-yellow-500",
        },
        { icon: FaCode, text: "Typescript", color: "text-blue-500" },
        { icon: FaHtml5, text: "HTML", color: "text-red-500" },
        { icon: FaCss3, text: "CSS", color: "text-blue-500" },
        { icon: FaDatabase, text: "SQL", color: "text-green-500" },
      ],
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { icon: SiRedux, text: "Redux", color: "text-purple-500" },
        { icon: SiNextdotjs, text: "Next JS", color: "text-gray-800" },
        { icon: FaReact, text: "React", color: "text-blue-500" },
      ],
    },
    {
      title: "UI/CSS Frameworks",
      skills: [
        { icon: SiTailwindcss, text: "Tailwind CSS", color: "text-cyan-500" },
        { icon: FaToolbox, text: "ShadCN/UI", color: "text-gray-600" },
      ],
    },
    {
      title: "Development Tools",
      skills: [
        { icon: GrGraphQl, text: "GraphQL", color: "text-pink-500" },
        { icon: SiPostman, text: "Postman", color: "text-orange-500" },
        { icon: FaGit, text: "Git", color: "text-red-500" },
        { icon: FaFigma, text: "Figma", color: "text-purple-500" },
        { icon: SiStorybook, text: "Storybook", color: "text-pink-500" },
      ],
    },
    {
      title: "Package Managers",
      skills: [
        { icon: FaNpm, text: "NPM", color: "text-red-500" },
        { icon: SiPnpm, text: "PNPM", color: "text-yellow-600" },
      ],
    },
    {
      title: "Testing & Quality",
      skills: [
        { icon: SiJest, text: "Jest", color: "text-red-600" },
        { icon: FaCode, text: "React Testing Library", color: "text-red-500" },
      ],
    },
    {
      title: "Amazon Web Services",
      skills: [
        { icon: SiAmazons3, text: "S3", color: "text-green-500" },
        { icon: SiAmazonec2, text: "EC2", color: "text-orange-500" },
        { icon: SiAmazonroute53, text: "Route53", color: "text-purple-500" },
      ],
    },
    {
      title: "Methodologies & Platforms",
      skills: [
        { icon: DiScrum, text: "Scrum", color: "text-blue-500" },
        { icon: FaGithub, text: "Github", color: "text-gray-800" },
        { icon: FaBitbucket, text: "Bitbucket", color: "text-blue-500" },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-semibold mb-4">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mapping over the categories */}
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md p-4"
          >
            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
            {/* Mapping over the skills within each category */}
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="flex items-center mb-2">
                <skill.icon className={`mr-2 w-8 h-8 ${skill.color}`} />
                <span>{skill.text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;