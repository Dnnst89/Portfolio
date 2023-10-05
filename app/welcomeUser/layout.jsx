import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";

const WelcomeLayout = ({ children }) => {
  return (
    <>
      <ProtectedRoutes>{children}</ProtectedRoutes>
    </>
  );
};

export default WelcomeLayout;
