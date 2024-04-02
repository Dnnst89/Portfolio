import * as React from "react";

const SocialMedia = (props) => (
  <svg
    xmlns={props.url}
    width={props.width}
    height={props.height}
    viewBox={props.viewBox}
    {...props}
  >
    <path fill={props.fill} d={props.icon} />
  </svg>
);
export default SocialMedia;
