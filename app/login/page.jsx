"use client";

import LoginForm from "@/components/LoginForm";
import ProtectedRoutes from "@/components/ProtectedRoutes";

const LogInPage = () => {
  return (
    <>
      <ProtectedRoutes toLogin={true}>
        <LoginForm />
      </ProtectedRoutes>
    </>
  );
};

export default LogInPage;
