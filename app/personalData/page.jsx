"use client";
import NavigationMenu from "@/components/NavigationMenu.jsx";
import PersonalDataForm from "../../components/PersonalDataForm";
import useProtectionRoute from "@/hooks/useProtectionRoute";
export default function PersonalData() {
  useProtectionRoute()
  return (
    <div className="max-w-screen-xl mt-5 md:mt-20 grid grid-cols-12 m-auto">
      <NavigationMenu />
      <PersonalDataForm />
    </div>
  );
}
