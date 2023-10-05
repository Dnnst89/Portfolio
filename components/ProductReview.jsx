"use client";
import { useState } from "react";

export default function ProductReview({ comment, score, user }) {
  const [showFullComment, setShowFullComment] = useState(false);
  const stars = [];
  const noStars = [];
  const truncatedComment = comment.slice(0, 100);
  const lastSpaceIndex = truncatedComment.lastIndexOf(" ");
  const toggleComment = () => {
    setShowFullComment(!showFullComment);
  };

  for (let i = 1; i <= score; i++) {
    stars.push(i);
  }

  for (let i = score; i < 5; i++) {
    noStars.push(i);
  }

  return (
    <tr className="border-b-2 border-grey-200/50 flex text-sm">
      <td className="px-4 py-2 w-1/3 overflow-hidden whitespace-nowrap">
        {user}
      </td>
      <td className="px-4 py-2 w-1/3 overflow-hidden">
        <div className="flex items-center whitespace-nowrap">
          {stars.map((star) => (
            <svg
              key={star}
              className="w-4 h-4 text-yellow-300 mr-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          {noStars.map((star) => (
            <svg
              key={star}
              className="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            {score} de 5 estrellas
          </p>
        </div>
      </td>
      <td className="px-4 py-2 w-2/3 text-grey-100">
        {showFullComment ? comment : truncatedComment}
        {comment.length > 100 && lastSpaceIndex !== -1 && (
          <span>
            {showFullComment ? null : "... "}
            <br />
            <button
              onClick={toggleComment}
              className="text-lightblue  transition duration-100 opacity-60 hover:opacity-100"
            >
              {showFullComment ? "Leer menos" : "Leer más"}
            </button>
          </span>
        )}
      </td>
    </tr>
  );
}
