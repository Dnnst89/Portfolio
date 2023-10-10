"use client";
import { useRouter } from "next/navigation";
export default function ConfirmedEmail() {
  const router = useRouter();
  return (
    <div>
      <h1>Gracias por registrarte!</h1>
      <p>Tu correo se ha confirmado correctamente.</p>
      <button onClick={() => router.push("/")}></button>
    </div>
  );
}
