import Image from "next/image";
import React, { useState } from "react";
import DefaultBtn from "../defaultBtn/DefaultBtn";
interface ExperienceType {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  projectUrl: string;
  description: string;
  image: string;
  achievements: string[];
}

const Experience: React.FC = () => {
  const [showAchievements, setShowAchievements] = useState<{
    [key: number]: boolean;
  }>({});

  const experiences: ExperienceType[] = [
    {
      id: 1,
      company: "Centauro Solutions",
      position: "Software Engineer",
      startDate: "Nov 2022",
      endDate: "Present",
      projectUrl: "https://www.detinmarin.cr/",
      description: "E-Commerce",
      image: "/centauro.svg",
      achievements: [
        "✔️ I implemented a robust and scalable platform from scratch, using React for the front-end, GraphQL and Strapi Headless CMS for efficient data management.",
        "✔️ I have developed expertise in implementing and managing cloud infrastructures using Amazon S3 and Amazon EC2.",
        "✔️ I integrated Next.js to enhance authentication and authorization processes, quickly adapting to the changing needs of the project.",
        "✔️ I ensured an accessible user experience across a wide range of devices, from mobile to desktops.",
        "✔️ I implemented Strapi, a powerful headless CMS, to efficiently manage the dynamic content of the E-commerce platform.",
        "✔️ I developed and implemented integrations of external delivery services using the SOAP protocol, crucial for efficient order management.",
        "✔️ I significantly improved the scalability, maintainability, and performance of the E-commerce project through this modern approach.",
        "✔️ I used Postman to consume external APIs, completing the payment process and ensuring a smooth and functional integration.",
        "✔️ I was responsible for identifying and solving problems efficiently, ensuring the project's smooth execution.",
        "✔️ I collaborated closely with a team of developers and designers, ensuring the timely delivery of high-quality software projects.",
        "✔️ I mastered tools like Visual Studio and version control systems (Git), which allowed me to contribute effectively to the team's workflow.",
        "✔️ I actively participated in an Agile development environment, using Jira Software and SCRUM methodologies to optimize our work process and delivery.",
      ],
    },
    {
      id: 2,
      company: "CSG Informática",
      position: "Frontend Developer",
      startDate: "May 2022",
      endDate: "Oct 2022",
      projectUrl: "",
      description: "Accounting Project",
      image: "/csg_informatica.svg",
      achievements: [
        "✔️ Developed REST APIs using .NET 6 Core and Entity Framework.",
        "✔️ Knowledge of data transfer objects (DTO), data annotations, LINQ for queries, asynchronous endpoints, anonymous functions lambda, migrations and MVC architecture.",
        "✔️ Fetching data with a modern tech stack, including JavaScript, React.js, Bootstrap, and CSS, to craft visually appealing and responsive web applications.",
        "✔️ Using Entity Framework, we migrate entities to SQL to store data.",
        "✔️ Utilized Git and GitHub for version control.",
      ],
    },
  ];

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
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
          >
            <Image
              src={experience.image}
              width={50}
              height={50}
              alt={experience.company}
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
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
              <div className="flex gap-2 mt-4">
                {experience.projectUrl && (
                  <DefaultBtn
                    description="View Project"
                    url={experience.projectUrl}
                    target="_blank"
                    type=""
                  ></DefaultBtn>
                )}
                <DefaultBtn
                  target=""
                  url=""
                  description="Achievements"
                  onclick={() => handleToggleAchievements(experience.id)}
                  type=""
                ></DefaultBtn>
              </div>
              {showAchievements[experience.id] && (
                <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <ul>
                    {experience.achievements.map((achievement, index) => (
                      <li
                        key={index}
                        className="text-gray-700 dark:text-gray-300"
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
