'use client';
import Link from 'next/link';
import { BiSolidUserCircle } from 'react-icons/bi';
const AccountDropodown = () => {
    return (
        <>
            <div className="relative">
                <button className="block">
                    <Link href="/signin">
                        <BiSolidUserCircle size={30} color="#67C3AD" />
                    </Link>{' '}
                </button>
                <div
                    v-f="isOpen"
                    className="bg-resene rounded-lg py-2 shadow-md absolute "
                >
                    <Link className="block px-4 py-2" href="/signin">
                        Optiones
                    </Link>
                    <Link className="block px-4 py-2" href="d">
                        Soporte
                    </Link>
                    <Link className="block px-4 py-2" href="d">
                        Salir
                    </Link>
                </div>
            </div>
        </>
    );
};

export default AccountDropodown;
