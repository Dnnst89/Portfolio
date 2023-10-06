"use client";
import NavigationMenu from "@/components/NavigationMenu";
import UserDataCard from "@/components/UserDataCard";

export default function Address() {
  return (
    <div className="sm:block md:flex lg:flex sm:space-x-0 md:space-x-4 lg:space-x-4 justify-center p-10">
      <NavigationMenu />
      <UserDataCard title="Tus direcciones" />
    </div>
  );
}
