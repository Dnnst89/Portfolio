"use client";
import ResetPasswordForm from "@/components/resetPasswordForm";
import { useParams } from "next/navigation";

const ResetPassword = () => {
  const params = useParams();
  alert(params);
  console.log("token", params);
  return (
    <div>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;
