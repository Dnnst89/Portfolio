"use client";
import Image from "next/image";

function GiftIdeasCard({ image, age, button, border }) {
  return (
    <div className=" m-4">
      <section className="mt-10 ">
        <div className={border}>
          <Image
            src={image}
            alt="heart image"
            style={{ width: "245px", height: "220px" }}
            className="rounded-[10px]"
          />
          <div className="flex justify-center mt-5">
            <h1>{age}</h1>
          </div>
          <div className="flex justify-center mt-5">
            <button className={button}> A EXPLORAR</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GiftIdeasCard;
