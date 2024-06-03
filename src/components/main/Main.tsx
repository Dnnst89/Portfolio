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
      {" "}
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Hello, I&lsquo;m Danny 👋
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-[1070px] mx-auto leading-relaxed">
          Developer with experience in creating innovative web solutions,
          focused on delivering highly efficient and accessible
          <strong> E-commerce platforms</strong>. Distinguished by my ability to
          <strong> adapt to new technologies </strong> and work methodologies, I
          have contributed to the success of complex projects,
          <strong> continuously improving</strong> user experience and
          operational efficiency. Collaborating with{" "}
          <strong> multidisciplinary teams </strong>, I am passionate about
          driving<strong> innovation </strong>and excellence in every aspect of
          software development.
        </p>
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
