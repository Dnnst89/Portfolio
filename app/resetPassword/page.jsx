"use client";
/**
 * This page take the returned token from the email
 * send it to resetPasswrodForm
 */
import { useEffect, useState } from "react";
import ResetPasswordForm from "@/components/resetPasswordForm";
import useProtectionRoute from "@/hooks/useProtectionRoute";
//Get the url params
const ResetPassword = () => {
  useProtectionRoute()
  const [code, setCode] = useState(null);

  useEffect(() => {
    //Extract the token
    const code = window?.location?.search?.split("=")[1];
    setCode(code);
  }, []);
  return (
    <div>
      <ResetPasswordForm code={code} />
    </div>
  );
};

export default ResetPassword;
