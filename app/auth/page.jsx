import React from 'react';
import SighIn from './signin/signIn';
import Link from 'next/link';

const Register = () => {
    return (
        <div className="flex justify-center w-full bg-white h-screen ">
            <div className="hover:underline p-2">
                <Link
                    href={{
                        pathname: '/auth/SighIn ',
                        query: { name: 'signin' },
                    }}
                >
                    Sign In
                </Link>
            </div>
            <div className="hover:underline p-2">
                <Link
                    href={{
                        pathname: '/auth/login',
                        query: { name: 'login' },
                    }}
                >
                    Log In
                </Link>
            </div>
        </div>
    );
};

export default Register;
