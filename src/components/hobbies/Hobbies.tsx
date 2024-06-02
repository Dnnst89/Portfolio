import React from "react";
import {
  FaBook,
  FaGuitar,
  FaPlane,
  FaBinoculars,
  FaGamepad,
  FaHiking,
  FaCampground,
  FaFish,
  FaLeaf,
} from "react-icons/fa";

const hobbies = [
  {
    id: 1,
    name: "Reading",
    description:
      "Enjoying a good book is one of the best ways to relax and learn.",
    icon: <FaBook className="text-4xl text-[#3AA6B9]" />,
  },
  {
    id: 2,
    name: "Playing Guitar",
    description:
      "Strumming chords and creating music on the guitar is a fantastic way to unwind and express creativity.",
    icon: <FaGuitar className="text-4xl text-[#3AA6B9]" />,
  },
  {
    id: 3,
    name: "Traveling",
    description: "Exploring new places and cultures expands your horizons.",
    icon: <FaPlane className="text-4xl text-[#3AA6B9]" />,
  },
  {
    id: 4,
    name: "Bird Watching",
    description:
      "Observing birds in their natural habitat is a peaceful and educational hobby.",
    icon: <FaBinoculars className="text-4xl text-[#3AA6B9]" />,
  },
  {
    id: 5,
    name: "Video Games",
    description:
      "Playing video games can be both entertaining and a great way to improve problem-solving skills.",
    icon: <FaGamepad className="text-4xl text-[#3AA6B9]" />,
  },
  {
    id: 6,
    name: "Hiking",
    description:
      "Hiking through nature trails and mountains provides a great workout and a way to enjoy the outdoors.",
    icon: <FaHiking className="text-4xl text-[#3AA6B9]" />,
  },
  {
    id: 7,
    name: "Camping",
    description:
      "Camping under the stars is a great way to connect with nature and enjoy some peaceful time away.",
    icon: <FaCampground className="text-4xl text-[#3AA6B9]" />,
  },
  {
    id: 8,
    name: "Fishing",
    description:
      "Fishing is a relaxing hobby that allows you to enjoy the tranquility of nature while waiting for a catch.",
    icon: <FaFish className="text-4xl text-[#3AA6B9]" />,
  },
];

const Hobbies = () => {
  return (
    <div className="text-center p-5 bg-gray-100 rounded-lg w-11/12 mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">Hobbies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hobbies.map((hobby) => (
          <div
            key={hobby.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:bg-blue-100 cursor-pointer"
          >
            {hobby.icon}
            <h3 className="text-xl font-semibold mt-2 mb-1">{hobby.name}</h3>
            <FaLeaf className=" text-[#40A578]" />
            <p className="text-gray-600 text-sm text-center flex items-center">
              {hobby.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hobbies;
