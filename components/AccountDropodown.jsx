'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { BiSolidUserCircle } from 'react-icons/bi';

const AccountDropodown = () => {
    const [isOpen, setIsOpen] = useState(false);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Cuando se da click en cualquier parte del documento
             * se cierra el dropdown
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsOpen(false);
                }
            }
            // Bind the event listener
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }
    const HandleDropDown = () => {
        setIsOpen(true);
    };
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    return (
        <>
            <div className="relative">
                <button className="block" onClick={() => HandleDropDown()}>
                    <BiSolidUserCircle size={30} color="#67C3AD" />
                </button>
                {isOpen ? (
                    <div
                        v-f="isOpen"
                        className="bg-floralwhite rounded-lg py-2 shadow-md absolute"
                        ref={wrapperRef}
                    >
                        <Link
                            className="block px-4 py-2 hover:bg-resene text-orange"
                            href="/signin"
                        >
                            Registrame
                        </Link>
                        <Link
                            className="block px-4 py-2 hover:bg-resene text-orange"
                            href="d"
                        >
                            Ingresar
                        </Link>
                        <Link
                            className="block px-4 py-2 hover:bg-resene text-orange"
                            href="d"
                        >
                            Soporte
                        </Link>
                        <Link
                            className="block px-4 py-2 hover:bg-resene text-orange"
                            href="d"
                        >
                            Salir
                        </Link>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
};

export default AccountDropodown;
