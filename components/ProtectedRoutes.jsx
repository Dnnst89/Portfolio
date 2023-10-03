"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children, toLogin = false }) => {
  const { user } = useSelector((x) => x.auth);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user && !toLogin) {
      if (window.location.pathname === "/") return;
      return router.push("/");
    }
    if (user && toLogin) {
      return router.push("/");
    }
    setLoading(false);
  }, [children, router, user, toLogin]);
  return loading ? <></> : children;
};

export default ProtectedRoutes;
