"use client";
import logo from "../../assets/footer-logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-resene max-w-screen h-auto p-10 pt-5 mt-10 pb-5">
      <div className="grid grid-cols-12 max-w-screen-xl m-auto justify-center items-top">
        <section className="col-span-12 md:col-span-4 py-3 border-dashed border-grey-200 border-b-2 md:border-r-2 md:border-b-0 md:h-64">
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

        <section className="col-span-12 md:col-span-4 py-3 border-dashed border-grey-200 border-b-2 md:border-r-2 md:border-b-0 md:h-64">
          <div className="md:ml-5">
            <h1 className="text-lg">Contacto</h1>
          </div>
          <div className="ml-5 md:ml-10 text-sm">
            <ul className="list-disc space-y-2">
              <li className="w-auto">
                Costa Rica, San José, Escazú, San Rafael,{<br />} Plaza Maynar Local
                #20
              </li>
              <li>
                Correo: <Link
                  href={"mailto:hola@detinmarin.cr"}
                  className="hover:underline"
                >
                  <span className="underline">hola@detinmarin.cr</span>
                </Link>
              </li>
              <li>
                Correo: <Link
                  href={"tel:+506-8771-6588"}
                  className="hover:underline"
                >
                  <span className="underline">(+506) 8771-6588</span>
                </Link>
              </li>
              <li>
                Horario: Lunes a Sábado de 10am-7pm {<br />}y domingos de 11am-5pm
              </li>
            </ul>
          </div>
        </section>

        <section className="col-span-12 md:col-span-2 py-3 border-dashed border-grey-200 border-b-2 md:border-r-2 md:border-b-0 md:h-64">
          <div className="md:ml-5">
            <h1 className="text-lg">Productos</h1>
          </div>
          <div className="ml-5 md:ml-10 text-sm">
            <ul className="list-disc space-y-2">
              <li>Categorías</li>
              <li>Edades </li>
              <li>Marcas </li>
            </ul>
          </div>
        </section>

        <section className="col-span-12 md:col-span-2 py-3 md:h-64">
          <div className="md:ml-5">
            <h1 className="text-lg">Redes sociales</h1>
          </div>
          <div className="ml-5 md:ml-10 text-sm">
            <ul className="list-disc grid space-y-2">
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
              <Link href={"https://wa.me/50687716588"} className="hover:underline">
                <li>WhatsApp</li>
              </Link>
            </ul>
          </div>
        </section>

      </div>

    </div>
  );
};

export default Footer;
