"use client";
import useStorage from "@/hooks/useStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children, toLogin = false }) => {
  const { user } = useSelector((x) => x.auth);
  const userData = useStorage();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user || (!userData?.user?.id && !toLogin)) {
      if (window.location.pathname === "/") return;
      return router.push("/");
    }
    if (user || (userData?.user.id && toLogin)) {
      return router.push("/");
    }
    setLoading(false);
  }, [children, router, user, toLogin, userData]);
  return loading ? <></> : children;
};

export default ProtectedRoutes;
