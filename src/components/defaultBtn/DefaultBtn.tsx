import Link from "next/link";
import React from "react";
import { FiExternalLink } from "react-icons/fi";

interface BtnType {
  onclick?: () => void;
  description: string;
  url: string;
  target: string;
  type: string;
  //styles: React.CSSProperties;
}

const DefaultBtn = (props: BtnType) => {
  return (
    <Link
      type={props.type}
      onClick={props.onclick}
      passHref
      href={props.url}
      target={props.target}
      className="flex items-center justify-center text-sm rounded-full border bg-[#0891b2]
      text-[#f8fafc] shadow hover:bg-[#06b6d4] transition"
      style={{ height: "auto", width: "50%", padding: "10px 0" }}
    >
      <span className="flex items-center">
        {props.description}
        <FiExternalLink className="ml-2" />
      </span>
    </Link>
  );
};

export default DefaultBtn;
