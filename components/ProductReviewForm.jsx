import { useForm } from "react-hook-form";
import AddReview from "@/src/graphQl/queries/addReview";
import { useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useRef } from "react";

function ProductReviewForm({ idProduct }) {
  const sessionData = JSON.parse(localStorage.getItem("userData"));
  const captchaRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [createUser] = useMutation(AddReview);

  const onSubmit = handleSubmit((data) => {
    const comment = data.comment;
    const score = parseInt(data.score);
    const product = idProduct;
    const users_permissions_user = sessionData.user.id;
    const token = captchaRef.current.getValue();

    try {
      if (token) {
        createUser({
          variables: { comment, score, product, users_permissions_user },
        });

        toast.success("Gracias por tu reseña!😍", {
          autoClose: 5000,
        });
        reset();
        captchaRef.current.reset();
      } else {
        toast.error("Por favor selecciona la casilla de verificación");
      }
    } catch {
      toast.error(
        "Lo sentimos, no se ha podido ingresar la reseña. Intentalo de nuevo más tarde😥"
      );
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col items-center space-y-3 p-10">
        <label htmlFor="message">Danos tu opinión del producto</label>
        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-5/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Escribe aquí tu opinión..."
          {...register("comment", { required: true })}
        ></textarea>
        {errors.comment && <span>Debes ingresar el comentario</span>}
        <label>Dale una calificasión</label>
        <select {...register("score")}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <div>
          <Toaster />
        </div>
        <ReCAPTCHA
          sitekey="6LfCrUYoAAAAAPgdh0MpvKzzHvhksbGTM3cP1prU"
          ref={captchaRef}
        />
        <button
          type="submit"
          className="bg-aquamarine text-white p-2 rounded-md mb-5"
        >
          Enviar reseña
        </button>
      </div>
    </form>
  );
}

export default ProductReviewForm;
