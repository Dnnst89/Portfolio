"use client";
import React from 'react'
import { useQuery } from "@apollo/client";
import { GET_USER_ADDRESS } from "@/src/graphQl/queries/getUserAddress";
import NavigationMenu from "@/components/NavigationMenu";
import UserDataCard from "@/components/UserDataCard";
import Spinner from "@/components/Spinner";

export default function BasicAddressComponent({ id }) {

    const { data, error, loading } = useQuery(GET_USER_ADDRESS, {
        variables: {
            id: id,
        },
    });

    if (loading) {
        return <div className="  flex flex-col items-center h-fit col-span-12 mx-3  md:col-span-8">
            <h1 className="flex justify-center mt-3 text-xl  md:col-span-12">Cargando</h1>
            <Spinner />
        </div>;
    }
    if (error) return <p>Error al cargar datos: {error.message}</p>;

    const user = data?.usersPermissionsUser?.data?.attributes;

    return (
        <div className="max-w-screen-xl mt-5 md:mt-20 grid grid-cols-12 m-auto">
            <NavigationMenu />
            <UserDataCard
                title="Tu dirección"
                username={user?.username}
                province={user?.users_address?.data?.attributes?.province}
                canton={user?.users_address?.data?.attributes?.canton}
                addressLine1={user?.users_address?.data?.attributes?.addressLine1}
                addressLine2={user?.users_address?.data?.attributes?.addressLine2}
                country={user?.users_address?.data?.attributes?.country}
            />
        </div>
    );
}
