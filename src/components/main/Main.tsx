import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa"; // Import social media icons

const Main = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 text-center">
      {/* Center the content */}
      <div className="mb-8 md:mb-12 lg:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Welcome 🎉
        </h1>
        <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 dark:text-gray-400">
          Discover my recent work and envision the possibilities for your next
          project.
        </p>
      </div>
      <div className="text-center">
        <Image
          src="/profile.svg"
          width={50}
          height={50}
          alt="Profile image"
          className="w-[200px] h-[200px]  rounded-full mx-auto mb-4"
        />
         <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-6 text-center">
            Hello, I&apos;m Danny 👋
          </h2>
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              I&apos;m an experienced <strong>Web Developer</strong> specializing in
              innovative <strong>E-commerce</strong> and
              <strong>E-learning platforms</strong>. My expertise lies in
              <strong>React</strong>, <strong>TypeScript</strong>,
              <strong>Next.js</strong>, and a wide array of modern web
              technologies.
            </p>
            <p>
              I have a proven track record at industry-leading companies
              including <strong>360Training</strong>,
              <strong>Centauro Solutions</strong>, and
              <strong>CSG Informática</strong>. I&apos;m distinguished by my ability
              to rapidly adapt to emerging web technologies and deliver
              <strong>responsive</strong>, <strong>accessible</strong> web
              applications that enhance user experience and operational
              efficiency. I&apos;m skilled in
              <strong>full-stack development</strong>,
              <strong>performance optimization</strong>, and comprehensive
              testing using modern frameworks and tools.
            </p>
            <p>
              I am passionate about creating dynamic web solutions through
              collaborative teamwork in <strong>Agile environments</strong>,
              consistently delivering high-quality web applications that drive
              business growth and user satisfaction.
            </p>
          </div>
        <div className="mt-4 flex justify-center space-x-4">
          <Link
            href="https://linkedin.com/in/dannyst89"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin
              size={30}
              className="text-gray-900 dark:text-gray-50 hover:text-blue-600 transition"
            />
          </Link>
          <Link
            href="https://github.com/DannyST89"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub
              size={30}
              className="text-gray-900 dark:text-gray-50 hover:text-gray-700 transition"
            />
          </Link>
          <Link
            href="https://www.instagram.com/gallito2401/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              size={30}
              className="text-gray-900 dark:text-gray-50 hover:text-pink-500 transition"
            />
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=100079033674689&mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook
              size={30}
              className="text-gray-900 dark:text-gray-50 hover:text-blue-600 transition"
            />
          </Link>
        </div>
      </div>
      <div className="mt-8 flex justify-center space-x-4"></div>
    </div>
  );
};

export default Main;