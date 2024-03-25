"use client";
import SocialMedia from "@/components/icons/SocialMedia";
import logo from "../../assets/footer-logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
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
              Tienda colectiva de diseño local enfocado a la infancia.{<br />}
              Marcas y productos amigables con el medio ambiente y respetuosos
              con la niñez
            </p>
          </section>

          <section className="col-span-12 md:col-span-4 py-3 border-dashed border-grey-200 border-b-2 md:border-r-2 md:border-b-0 md:h-64">
            <div className="md:ml-5">
              <h1 className="text-lg">Contacto</h1>
            </div>
            <div className="ml-5 md:ml-10 text-sm">
              <ul className="list-disc space-y-2">
                <li className="w-auto">
                  Costa Rica, San José, Escazú, San Rafael,{<br />} Plaza Maynar
                  Local #20
                </li>
                <li>
                  Correo:{" "}
                  <Link
                    href={"mailto:hola@detinmarin.cr"}
                    className="hover:underline"
                  >
                    <span className="underline">hola@detinmarin.cr</span>
                  </Link>
                </li>
                <li>
                  Teléfono:{" "}
                  <Link
                    aria-label="Teléfono de contacto +506-8771-6588"
                    href={"tel:+506-8771-6588"}
                    className="hover:underline"
                  >
                    <span className="underline">(+506) 8771-6588</span>
                  </Link>
                </li>
                <li>
                  Horario: Lunes a Sábado de 10am-7pm {<br />}y Domingos de
                  11am-5pm
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
            <div className="md:ml-5 text-sm">
              <ul className=" flex list-none  gap-3">
                <li>
                  <Link
                    href={"https://www.facebook.com/detinmarin.cr7"}
                    className="hover:underline ga"
                  >
                    <SocialMedia
                      fill={"#67C3AD"}
                      height={30}
                      width={30}
                      icon={`M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 
                      9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 
                      1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 
                      1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02`}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href={"https://www.instagram.com/detinmarin.cr/"}
                    className="hover:underline"
                  >
                    <SocialMedia
                      fill={"#67C3AD"}
                      height={30}
                      width={30}
                      icon={`M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 
                      22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 
                      18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4
                       4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 
                       0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5
                      5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3`}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href={"https://wa.me/50687716588"}
                    className="hover:underline"
                  >
                    <SocialMedia
                      fill={"#67C3AD"}
                      height={30}
                      width={30}
                      icon={`M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01`}
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
