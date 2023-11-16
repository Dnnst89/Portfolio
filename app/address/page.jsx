"use client";
import NavigationMenu from "@/components/NavigationMenu";
import UserDataCard from "@/components/UserDataCard";
import UserAddress from "@/src/graphQl/queries/getUserAddress";
import { useQuery } from "@apollo/client";
import { GET_USER_ADDRESS } from "@/src/graphQl/queries/getUserAddress";
import useStorage from "@/hooks/useStorage";

export default function Address() {

  const { user } = useStorage();
  const userId = user?.id;
  const { data, error } = useQuery(GET_USER_ADDRESS, {
    variables: {
      id: userId,
    },
  });

  if (error)
    return console.log(
      "Lo sentimos, ha ocurrido un error al cargar los datos"
    );

  console.log(data?.usersPermissionsUser?.data?.attributes?.users_address?.data?.attributes?.province)
  return (
    <div className="max-w-screen-xl mt-5 md:mt-20 grid grid-cols-12 m-auto">
      <NavigationMenu />
      <UserDataCard title="Tu dirección" username={data?.usersPermissionsUser?.data?.attributes?.username} province={data?.usersPermissionsUser?.data?.attributes?.users_address?.data?.attributes?.province} canton={data?.usersPermissionsUser?.data?.attributes?.users_address?.data?.attributes?.canton} addressLine1={data?.usersPermissionsUser?.data?.attributes?.users_address?.data?.attributes?.addressLine1} addressLine2={data?.usersPermissionsUser?.data?.attributes?.users_address?.data?.attributes?.addressLine2} />
    </div>
  );
}

