"use client";
import NavidationMenu from "@/components/NavigationMenu";
import AddressForm from "@/components/AddressForm";
export default function AddAddress() {
  return (
    <div className="flex space-x-3 justify-center mt-10">
      <NavidationMenu />
      <AddressForm />
    </div>
  );
}
