"use client";
/**
 * This page take the returned token from the email
 * send it to resetPasswrodForm
 */
import ResetPasswordForm from "@/components/resetPasswordForm";
//Get the url params
const ResetPassword = (params) => {
  //Extract the token
  const { code } = params.searchParams;
  return (
    <div>
      <ResetPasswordForm code={code} />
    </div>
  );
};

export default ResetPassword;
