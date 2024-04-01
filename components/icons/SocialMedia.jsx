import * as React from "react";

const SocialMedia = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox={props.viewBox}
    {...props}
  >
    <path fill={props.fill} d={props.icon} />
  </svg>
);
export default SocialMedia;
