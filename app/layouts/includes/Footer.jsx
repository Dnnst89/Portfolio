"use client";
import logo from "../../assets/transparent.png";
import Image from "next/image";
import "../../../styles/footer.css";

const Footer = () => {
  return (
    <div className="centered-main-div">
      <div className=" main-container ">
        <section className="image-text-section">
          <Image
            src={logo}
            alt="Detinmarin Logo"
            style={{ width: "130px", height: "120px" }}
          />
          <p className="text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </section>
        <section className="products-section">
          <div className="product-star-div">
            <h1 className="text-lg product-star-div">Productos</h1>
          </div>
          <div className="text-sm wb-1">
            <p className="mb-2">categorías</p>
            <p className="mb-2">Por edades</p>
            <p className="mb-2">Alguna otra opción</p>
          </div>
        </section>
        <section className="products-section">
          <div className="product-star-div">
            <h1 className="text-lg product-star-div">Contacto</h1>
          </div>
          <div className="text-sm wb-1">
            <p className="mb-2">Dirección</p>
            <p className="mb-2">Correo electrónico </p>
            <p className="mb-2">Numero telefónico </p>
          </div>
        </section>
        <section className="products-section">
          <div className="product-star-div">
            <h1 className="text-lg product-star-div">Redes sociales</h1>
          </div>
          <div className="text-sm wb-1">
            <p className="mb-2">Facebook</p>
            <p className="mb-2">Instagram</p>
            <p className="mb-2">Twitter</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Footer;
