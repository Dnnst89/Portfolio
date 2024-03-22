import * as React from "react";
const SocialMedia = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={128}
    height={128}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill={props.fill} d={props.icon} />
  </svg>
);
export default SocialMedia;
