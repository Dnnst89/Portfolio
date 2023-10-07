"use client";
import Link from "next/link";

export default function Button({ link, description, bgColor }) {
  return (
    <Link href={link}>
      <button className={`bg-${bgColor} p-3 rounded-sm text-white`}>
        {description}
      </button>
    </Link>
  );
}
