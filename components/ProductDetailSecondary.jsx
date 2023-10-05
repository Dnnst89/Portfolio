import { useState } from "react";
import ProductReview from "./ProductReview";
import ProductReviewForm from "./ProductReviewForm";

const ProductDetailSecondary = ({ id, description, reviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  return (
    <main className="bg-resene" id="detail-table">
      <section className="flex items-baseline mx-auto gap-5 w-8/12 pt-10">
        <h1 className="text-xl">Descripción</h1>
        <p className="w-8/12 text-sm text-grey-100">{description}</p>
      </section>
      {reviews.length > 0 ? (
        <section className="mt-10 flex justify-center">
          <h1 className="text-xl mr-2">Reseñas</h1>
          <table className="w-7/12">
            <tr className="border-b-2 border-grey-200/50 flex">
              <th className="px-4 py-2 w-1/3 text-left whitespace-nowrap">
                Nombre de usuario
              </th>
              <th className="px-4 py-2 w-1/3 text-left">Puntuación</th>
              <th className="px-4 py-2 w-2/3 text-left text-grey-100">
                Comentario
              </th>
            </tr>
            {showAllReviews
              ? reviews.map((item) => (
                  <ProductReview
                    key={item.id}
                    comment={item.attributes.comment}
                    score={item.attributes.score}
                    user={
                      item.attributes.users_permissions_user.data.attributes
                        .username
                    }
                  />
                ))
              : reviews
                  .slice(0, 3)
                  .map((item) => (
                    <ProductReview
                      key={item.id}
                      comment={item.attributes.comment}
                      score={item.attributes.score}
                      user={
                        item.attributes.users_permissions_user.data.attributes
                          .username
                      }
                    />
                  ))}
          </table>
        </section>
      ) : (
        <p className="mt-10 text-xl text-center">
          Aún no hay reseñas de este producto
        </p>
      )}
      {reviews.length > 3 ? (
        <button
          className="flex mx-auto pt-2 pb-10 text-lightblue transition duration-100 opacity-60 hover:opacity-100"
          onClick={() => setShowAllReviews(!showAllReviews)}
        >
          {showAllReviews ? "Ver menos reseñas" : "Ver más reseñas"}
        </button>
      ) : (
        ""
      )}

      <div className="flex justify-center">
        <ProductReviewForm idProduct={id} />
      </div>
    </main>
  );
};
export default ProductDetailSecondary;
