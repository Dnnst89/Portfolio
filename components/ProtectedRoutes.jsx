"use client";
import useStorage from "@/hooks/useStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children, toLogin = false }) => {
  const { user } = useStorage();
  const userData = useSelector((x) => x.auth.user);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (!user?.id && !userData?.id && !toLogin) {
      if (window.location.pathname === "/") return;
      return router.push("/");
    }
    if (user?.id && toLogin) {
      return router.push("/");
    }
    setLoading(false);
  }, [children, router, user, toLogin, userData]);
  return loading ? <></> : children;
};

export default ProtectedRoutes;
