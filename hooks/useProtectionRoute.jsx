import React from 'react'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
//Hook para proteccion de rutas, 
//si recibe true en toLogin sirve para proteger rutas como login o register
const useProtectionRoute = (toLogin = false) => {
    const router = useRouter();
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData?.user?.id && !toLogin) {
            return router.push("/");
        }
        if (userData?.user?.id && toLogin) {
            return router.push("/");
        }
    }, [router]);
};

export default useProtectionRoute