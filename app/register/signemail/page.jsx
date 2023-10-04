"use client";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import RegisterFormTwo from "@/components/RegisterFormTwo";

const SingEmail = () => {
  return (
    <>
      <ProtectedRoutes toLogin={true}>
        <RegisterFormTwo />
      </ProtectedRoutes>
    </>
  );
};

export default SingEmail;
