"use client";
import NavigationMenu from "@/components/NavigationMenu.jsx";
import PersonalDataForm from "../../components/PersonalDataForm";
import useProtectionRoute from "@/hooks/useProtectionRoute";
export default function PersonalData() {
  useProtectionRoute()
  return (
    <div className="flex justify-center space-x-3 p-10">
      <NavigationMenu />
      <PersonalDataForm />
    </div>
  );
}
