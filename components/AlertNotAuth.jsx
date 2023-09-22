import { useRouter } from "next/navigation";
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

const AlertNotAuth = ({ t }) => {

    const router = useRouter();
    return (

        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5"></div>
                    <div className="ml-3 flex-1">
                        <p className="mt-1 text-sm text-gray-500">
                            Lo sentimos, debe estar registrado.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => {
                        toast.remove(t.id);
                        router.push('/login');
                    }}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Cerrar
                </button>
            </div>
        </div>

    )
}

export default AlertNotAuth