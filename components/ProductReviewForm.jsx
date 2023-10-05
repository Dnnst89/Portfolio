import { useForm } from "react-hook-form";
import AddReview from "@/src/graphQl/queries/addReview";
import { useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useRef, useState } from "react";
import { FaStar } from "react-icons/fa";

function ProductReviewForm({ idProduct }) {
  const [rating, setRating] = useState(null);
  const sessionData = JSON.parse(localStorage.getItem("userData"));
  const captchaRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [createReview] = useMutation(AddReview);

  const onSubmit = handleSubmit((data) => {
    const comment = data.comment;
    const score = parseInt(rating);
    const product = idProduct;
    const users_permissions_user = sessionData.user.id;
    const token = captchaRef.current.getValue();

    try {
      if (token) {
        createReview({
          variables: { comment, score, product, users_permissions_user },
        });

        toast.success("Gracias por tu reseña!", {
          autoClose: 5000,
        });
        reset();
        setRating(0);
        captchaRef.current.reset();
      } else {
        toast.error("Por favor selecciona la casilla de verificación", {
          autoClose: 5000,
        });
      }
    } catch {
      toast.error(
        "Lo sentimos, no se ha podido ingresar la reseña. Intentalo de nuevo más tarde😥",
        {
          autoClose: 5000,
        }
      );
    }
  });

  return (
    <>
      {sessionData && (
        <form onSubmit={onSubmit} className="p-5 w-5/12 ">
          <div>
            <Toaster />
          </div>

          <div className="text-center">
            <label htmlFor="message" className="">
              Danos tu opinión del producto
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Escribe aquí tu opinión..."
              {...register("comment", { required: true })}
            ></textarea>
            {errors.comment && <span>Debes ingresar el comentario</span>}
            <div className="flex space-x-2">
              <label>Dale una calificación</label>
              <div className="flex">
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;

                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        className="hidden"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                      />
                      <FaStar
                        className="star"
                        color={ratingValue <= rating ? "#ffc107" : "#ABABAB"}
                        size={20}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-end">
              {" "}
              <ReCAPTCHA
                sitekey="6LfCrUYoAAAAAPgdh0MpvKzzHvhksbGTM3cP1prU"
                ref={captchaRef}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-aquamarine p-2 rounded-md text-white mt-5 mr-10"
              >
                Enviar reseña
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default ProductReviewForm;
