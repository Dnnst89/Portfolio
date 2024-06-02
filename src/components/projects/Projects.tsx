import React, { useState } from "react";
import DefaultBtn from "../defaultBtn/DefaultBtn";
import Image from "next/image";
interface ProjectCardProps {
  project: ProjectTypes; // Define the type of the project prop
}
interface ProjectTypes {
  title: string;
  subtitle: string;
  projectURL: string;
  image: string;
  description: string;
}

const projects: ProjectTypes[] = [
  {
    title: "Beoutdoors",
    subtitle: "Tour operator",
    projectURL: "https://beoutdoors.netlify.app/",
    image: "beoutdoors.webp",
    description: `Embark on an immersive journey through La Fortuna de San Carlos, Costa Rica, courtesy of my tour operator website. Designed and developed by me, this platform serves as a gateway to unparalleled adventures in the captivating region of San Carlos. I meticulously crafted every aspect of the website to offer visitors a seamless and enriching experience.
    Through this project, I aimed to provide a comprehensive solution for travelers seeking unforgettable experiences in La Fortuna. By leveraging my expertise in web development, I created a user-friendly interface that effortlessly connects users with a diverse range of tour options and knowledgeable guides.
    Visitors to the website can explore a variety of thrilling outdoor excursions, tranquil nature walks, and immersive cultural experiences tailored to their preferences. Whether it's adrenaline-pumping activities or serene moments amidst nature, my platform ensures that every traveler finds their ideal adventure.`,
  },
  {
    title: "Birds and Breakfast",
    subtitle: "Ecolodge",
    projectURL: "https://breadandbreakfast.netlify.app/",
    image: "breakfast.jpg",
    description: `Explore Birds and Breakfast, a project showcasing
    a destination for birdwatching and conservation experiences. Located in
    Costa Rica, this website reflects my dedication to sustainable travel
    practices and highlights the beauty of nature. Discover the essence of
    conservation, exclusivity, regeneration and local support.`,
  },
  {
    title: "Citas Mascotas",
    subtitle: "Pet Registration",
    projectURL: "https://citas-mascotas-reactjs.netlify.app/",
    image: "petregister.png",
    description: `Welcome to my pet registration website, a project I developed to streamline the process of registering beloved pets and ensuring their safety and well-being. With a passion for pets and a knack for web development, I created this platform to offer pet owners a convenient and efficient way to register their furry companions.
    At the heart of this project lies a commitment to pet care and responsible ownership.`,
  },
  {
    title: "Carrito de compras",
    subtitle: "Shopping Cart",
    projectURL: "https://carrito-compra-js-html.netlify.app/",
    image: "cart.png",
    description: `My 'Add Product to Cart' page simplifies online shopping by providing a user-friendly interface to quickly select and purchase desired items.`,
  },
  {
    title: "Lawyer site",
    subtitle: "Lawyer",
    projectURL: "https://mylawyersite.netlify.app/",
    image: "lawyer.png",
    description: `Welcome to my lawyer website project, a professional platform crafted to provide individuals and businesses with easy access to legal services and information. As the developer behind this project, I've designed it to offer a seamless user experience, allowing visitors to explore various legal resources and services effortlessly.`,
  },
];

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <Image
        src={project.image}
        alt={project.title}
        height={50}
        width={50}
        className="w-full h-40 object-cover object-center"
      />
      <div className="p-4">
        <DefaultBtn
          url={project.projectURL}
          description="View Project"
          target="_blank"
        />
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <h4 className="text-gray-600 mb-4">{project.subtitle}</h4>
        <p className="text-gray-700">
          {showFullDescription
            ? project.description
            : `${project.description.slice(0, 100)}...`}
          <button
            className="text-[#0891b2] hover:underline"
            onClick={toggleDescription}
          >
            {showFullDescription ? "Show less" : "Show more"}
          </button>
        </p>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-semibold mb-4">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
