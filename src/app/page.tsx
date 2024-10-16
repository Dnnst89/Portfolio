"use client";
import Link from "next/link";
import { useState } from "react";
import { FaAngellist } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { GoHome, GoTools } from "react-icons/go";
import { CiFolderOn, CiMail } from "react-icons/ci";
import { BsCloudDownload } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";

import Main from "@/components/main/Main";
import Experience from "@/components/experience/Experience";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/skills/Skills";
import ContactMe from "@/components/contactMe/ContactMe";
import Hobbies from "@/components/hobbies/Hobbies";
import DownloadResume from "@/components/downloadResume/DownloadResume";
import SoftSkills from "@/components/softSkills/SoftSkills";
import SidebarBtn from "@/components/sidebarbtn/SidebarBtn";

interface Route {
  id: number;
  component: JSX.Element;
  description: string;
  icon: JSX.Element;
}

const routes: Route[] = [
  {
    id: 1,
    component: <Main />,
    description: "Home",
    icon: <GoHome size={25} style={{ color: "#0891b2" }} />,
  },
  {
    id: 2,
    component: <SoftSkills />,
    description: "Soft Skills",
    icon: <IoPersonOutline size={25} style={{ color: "#0891b2" }} />,
  },
  {
    id: 3,
    component: <Experience />,
    description: "Experience",
    icon: <CiFolderOn size={25} style={{ color: "#0891b2" }} />,
  },
  {
    id: 4,
    component: <Projects />,
    description: "Projects",
    icon: <GrUserWorker size={25} style={{ color: "#0891b2" }} />,
  },
  {
    id: 5,
    component: <Skills />,
    description: "Skills",
    icon: <GoTools size={25} style={{ color: "#0891b2" }} />,
  },
  {
    id: 7,
    component: <Hobbies />,
    description: "Hobbies",
    icon: <FaAngellist size={25} style={{ color: "#0891b2" }} />,
  },
  {
    id: 8,
    component: <ContactMe />,
    description: "Contact Me",
    icon: <CiMail size={25} style={{ color: "#0891b2" }} />,
  },
  {
    id: 9,
    component: <DownloadResume />,
    description: "Download Resume",
    icon: <BsCloudDownload size={25} style={{ color: "#0891b2" }} />,
  },
];

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState(routes[0].id);

  const handleRouteClick = (id: number) => {
    setActiveRoute(id);
    setIsSidebarOpen(false);
  };
  return (
    <div className="relative flex h-screen w-full">
      <div className="absolute top-4 right-4 z-50 lg:hidden">
        <SidebarBtn
          isOpen={isSidebarOpen}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>
      <div
        className={`fixed top-0 left-0 h-full flex flex-col items-center justify-between bg-gray-100 dark:bg-gray-800 py-6 transition-transform duration-300 transform lg:translate-x-0 lg:w-64 lg:z-40 ${
          isSidebarOpen
            ? "translate-x-0 w-64 z-40"
            : "-translate-x-full w-0 z-10"
        }`}
      >
        <div className="flex flex-col items-end gap-6 w-full px-4">
          {routes.map((route) => (
            <button
              key={route.id}
              className="flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 w-full"
              onClick={() => handleRouteClick(route.id)}
            >
              {route.icon}
              <span
                className={`${
                  isSidebarOpen ? "block ml-2" : "hidden"
                } lg:block hover:text-gray-900 ml-2 dark:hover:text-gray-50`}
              >
                {route.description}
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-col items-end gap-6 w-full px-4"></div>
      </div>
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {routes.find((route) => route.id === activeRoute)?.component}
        </div>
      </div>
    </div>
  );
}
