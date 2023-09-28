"use client";
import toast, { Toaster } from "react-hot-toast";
const FailedPayment = ({ description }) => {
  return (
    <>
      {toast.error(`${description}...  Por favor intentelo nuevamente. `)}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #ffffff",
            padding: "16px",
            color: "#ffffff",
            background: "#f87171",
            height: "100px",
          },
        }}
      />
    </>
  );
};

export default FailedPayment;
