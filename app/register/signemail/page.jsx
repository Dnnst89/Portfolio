"use client";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import RegisterFormTwo from "@/components/RegisterFormTwo";
import "../../../styles/fonts.css";

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
