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
                  Costa Rica, San José, Escazú, Guachipelín{<br />}
                </li>
                <li>
                  Correo:{" "}
                  <Link
                    href={"mailto:hola@detinmarin.cr"}
                    className="hover:underline"
                  >
                    <span className="underline">hola@detinmarincr.com</span>
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
                      url={"http://www.w3.org/2000/svg"}
                      fill={"#67C3AD"}
                      height={30}
                      width={30}
                      viewBox={"0 0 24 24"}
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
                      url={"http://www.w3.org/2000/svg"}
                      fill={"#67C3AD"}
                      height={30}
                      width={30}
                      viewBox={"0 0 24 24"}
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
                    href={"https://www.tiktok.com/@detinmarin.cr"}
                    className="hover:underline"
                  >
                    <SocialMedia
                      url={"http://www.w3.org/2000/svg"}
                      fill={"#67C3AD"}
                      height={30}
                      width={30}
                      viewBox={"0 0 256 256"}
                      icon={`M224 68a44.05 44.05 0 0 1-44-44a12 12 0 0 0-12-12h-40a12 12
                        0 0 0-12 12v132a16 16 0 1 1-22.85-14.47a12 12 0 0 0 6.85-10.84V88a12
                        12 0 0 0-14.1-11.81a79.35 79.35 0 0 0-47.08 27.74A81.84 81.84 0 0 0
                        20 156a80 80 0 0 0 160 0v-33.33a107.47 107.47 0 0 0 44 9.33a12 12 0
                        0 0 12-12V80a12 12 0 0 0-12-12m-12 39.15a83.05 83.05 0 0 1-37-14.91a12
                        12 0 0 0-19 9.76v54a56 56 0 0 1-112 0a57.86 57.86 0 0 1 32-51.56V124a40
                        40 0 1 0 64 32V36h17.06A68.21 68.21 0 0 0 212 90.94Z`}
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
