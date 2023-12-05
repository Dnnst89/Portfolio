"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function GiftIdeasCard({ ageRange, image, age, button, border, alt }) {
  const router = useRouter();
  return (
    //  <Link href={{ pathname: "/resultsByAge", query: { ageRange } }}>
    <div onClick={() => { return router.push(`/filtersResults/?query=${ageRange}`) }}>
      <div className=" m-4">
        <section className="mt-5 ">
          <div className={border}>
            <Image
              src={image}
              alt={alt}
              className="rounded-[10px] w-[140px] md:w-[220px]"
            />
            <div className="flex justify-center m-auto mt-5">
              <h1 className="text-xs md:text-xl ">{age}</h1>
            </div>
            <div className="flex justify-center m-auto mt-5">
              <button className={button}> A EXPLORAR</button>
            </div>
          </div>
        </section>
      </div>
    </div>
    // </Link>
  );
}

export default GiftIdeasCard;
