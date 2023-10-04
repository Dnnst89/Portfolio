"use client";
import Image from "next/image";
import Link from "next/link";

function GiftIdeasCard({ ageRange, image, age, button, border }) {

  return (
    <Link href={`/resultsByAge/${ageRange}`}>
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
    </Link>
  );
}

export default GiftIdeasCard;
