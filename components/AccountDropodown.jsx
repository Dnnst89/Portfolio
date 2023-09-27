import React, { useState, useRef, useEffect } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import useSession from "@/hooks/useSession";
import Link from "next/link";
import { updateShoppingSession } from "@/redux/features/cart-slice";
import { useRouter } from "next/navigation";

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
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
    router.push("/");
    router.refresh();
    dispatch(logout());
    dispatch(updateShoppingSession(null));
    localStorage.removeItem("userData");
    localStorage.removeItem("cartSession");
    document.cookie = "userData=null";
  };
  useSession();
  return (
    <>
      <div className="relative grid grid-cols-2">
        <div className="">
          {authUser && (
            <p className="px-4 py-2 text-orange">
              Welcome, {authUser.username}
            </p>
          )}
        </div>
        <button className="block" onClick={toggleDropdown}>
          <BiSolidUserCircle size={30} color="#67C3AD" />
        </button>
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
