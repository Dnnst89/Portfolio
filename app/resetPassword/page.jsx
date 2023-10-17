"use client";
/**
 * This page take the returned token from the email
 * send it to resetPasswrodForm
 */
import ResetPasswordForm from "@/components/resetPasswordForm";
//Get the url params
const ResetPassword = () => {
  //Extract the token
  const code = window?.location?.search?.split("=")[1];
  return (
    <div>
      <ResetPasswordForm code={code} />
    </div>
  );
};

export default ResetPassword;
