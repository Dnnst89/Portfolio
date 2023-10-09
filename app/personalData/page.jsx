"use client";
import NavigationMenu from "@/components/NavigationMenu.jsx";
import PersonalDataForm from "../../components/PersonalDataForm";
export default function PersonalData() {
  return (
    <div className="flex justify-center space-x-3 p-10">
      <NavigationMenu />
      <PersonalDataForm />
    </div>
  );
}
