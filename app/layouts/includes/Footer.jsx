"use client";
import logo from "../../assets/footer-logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-resene max-w-screen h-auto p-10 pt-5 mt-10 pb-5">
      <div className="flex flex-wrap max-w-screen-xl m-auto justify-center items-top">
        <section className="border-b-2 md:border-r-2 md:border-b-0 border-dashed border-grey-200 pb-4 pl-6 w-full md:w-2/6 grid place-content-center md:h-52 content-baseline">
          <Image
            src={logo}
            alt="Detinmarin Logo"
            style={{ width: "162px", height: "85px" }}
            className="mb-5"
          />
          <p className="text-sm">
            Tienda colectiva de diseño local enfocado a la infancia.{<br />}Marcas
            y productos amigables con el medio ambiente y respetuosos con la niñez
          </p>
        </section>

        <section className="border-b-2 md:border-r-2 md:border-b-0 border-dashed border-grey-200 pb-4 pl-6 w-full md:w-2/6 grid place-content-center md:h-52 content-baseline">
          <div>
            <h1 className="text-lg relative right-5 top-4">Contacto</h1>
          </div>
          <ul className="ml-1 text-sm list-disc space-y-1 mt-5 ">
            <li className="w-auto">
              Costa Rica, San Jose, Escazu, San Rafael,{<br />} Plaza Maynar Local
              #20
            </li>
            <li>
              Correo: <span className="underline">hola@detinmarin.cr </span>
            </li>
            <li>
              Teléfono: <span className="underline">(506) 8771-6588</span>
            </li>
            <li>
              Horario: Lunes a Sabado de 10am-7pm {<br />}y domingos de 11am-5pm
            </li>
          </ul>
          
        </section>

        <section className="border-b-2 md:border-r-2 md:border-b-0 border-dashed border-grey-200 pb-4 pl-6 w-full md:w-1/6 grid place-content-center md:h-52 content-baseline">
          <div>
            <h1 className="text-lg relative md:right-5 top-4">Productos</h1>
          </div>

          <ul className="text-sm list-disc p-6 space-y-1">
            <li>Categorías</li>
            <li>Edades </li>
            <li>Marcas </li>
          </ul>
        </section>

        <section className="w-full md:w-1/6 grid place-content-center pl-6 md:h-52 content-baseline">
          <div>
            <h1 className="text-lg relative md:right-5 top-4">Redes sociales</h1>
          </div>
          <ul className="text-sm list-disc p-6 flex flex-col space-y-1">
            <Link
              href={"https://www.facebook.com/detinmarin.cr7"}
              className="hover:underline space-y-5 "
            >
              <li>Facebook</li>
            </Link>
            <Link
              href={"https://www.instagram.com/detinmarin.cr/"}
              className="hover:underline"
            >
              <li>Instagram</li>
            </Link>
            <Link href={""} className="hover:underline">
              <li>WhatsApp</li>
            </Link>
          </ul>
        </section>

      </div>

    </div>
  );
};

export default Footer;
