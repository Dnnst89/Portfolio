"use client";
import NavigationMenu from "@/components/NavigationMenu";
import UserDataCard from "@/components/UserDataCard";

export default function Address() {
  return (
    <div className="max-w-screen-xl mt-5 md:mt-20 grid grid-cols-12 m-auto">
      <NavigationMenu />
      <UserDataCard title="Tus direcciones" />
    </div>
  );
}
