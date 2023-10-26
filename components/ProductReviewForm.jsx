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
        const { loading, error, data } = createReview({
          variables: { comment, score, product, users_permissions_user },
        });

        reset();
        setRating(0);
        captchaRef.current.reset();

        if (error) {
          toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
            autoClose: 5000
          })
        } else {
          toast.success("Gracias por tu reseña!", {
            autoClose: 5000,
          });
        }

      } else {
        toast.error("Por favor selecciona la casilla de verificación", {
          autoClose: 5000,
        });
      }

    } catch (error) {
      toast.error(error.message, {
        autoClose: 5000,
      });
    }
  });

  return (
    <>
      {sessionData && (
        <form onSubmit={onSubmit} className="md:p-5 w-full col-start-2 col-span-10 md:col-start-4 md:col-span-6 m-auto">


          <div className="space-y-3 w-full">
            <label htmlFor="message" className="text-lg w-full">
              Danos tu opinión del producto
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Escribe aquí tu opinión..."
              {...register("comment", {
                required: {
                  value: true,
                  message: "Debes ingresar el comentario",
                },
                maxLength: {
                  value: 800,
                  message:
                    "El comentario es muy extenso",
                },
              })}
            ></textarea>
            <p className="text-red text-xs">
              {errors.comment?.message}
            </p>
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
                        id="rating"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        {...register("rating", { required: true })}
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
            {errors.rating && <span className="text-red text-xs">Debes ingresar una calificación</span>}
            <div className="flex justify-end">
              {" "}
              <ReCAPTCHA
                sitekey="6LfFDLAoAAAAAJ25iZdqlICdDvwwkhxsDMZqdHs_"
                //sitekey="6LfCrUYoAAAAAPgdh0MpvKzzHvhksbGTM3cP1prU"
                ref={captchaRef}
              />
            </div>
            <div className="flex justify-end pb-5">
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
