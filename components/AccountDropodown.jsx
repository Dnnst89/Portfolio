import React, { useState, useRef, useEffect } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import HydrateSession from "@/hooks/hydrateSession";
import Link from "next/link";

const AccountDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const authUser = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("sessionData");
    };

    return (
        <>
            <HydrateSession />
            <div className="relative">
                <div className="grid grid-cols-2">
                    {authUser && (
                        <p className="px-4 py-2 text-orange">
                            Welcome, {authUser.username}
                        </p>
                    )}

                    <button className="block" onClick={toggleDropdown}>
                        <BiSolidUserCircle size={30} color="#67C3AD" />
                    </button>
                </div>

                {isOpen && (
                    <div
                        className="bg-floralwhite rounded-lg py-2 shadow-md absolute z-10"
                        ref={wrapperRef}
                    >
                        {authUser ? (
                            <>
                                <button
                                    className="block px-4 py-2 hover:bg-resene text-orange"
                                    onClick={handleLogout}
                                >
                                    Salir
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    className="block px-4 py-2 hover:bg-resene text-orange"
                                    href="/register/singname"
                                >
                                    Registrarme
                                </Link>
                                <Link
                                    className="block px-4 py-2 hover:bg-resene text-orange"
                                    href="/login"
                                >
                                    Ingresar
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default AccountDropdown;
