import { useState } from "react";
import ProductReview from "./ProductReview";
import ProductReviewForm from "./ProductReviewForm";

const ProductDetailSecondary = ({ id, description, reviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  return (
    <main className="bg-resene" id="detail-table">
      <section className="grid md:flex md:items-baseline mx-auto gap-5 w-10/12 md:w-8/12 pt-10">
        <h1 className="w:full text-xl">Descripción</h1>
        <p className="w-full md:w-12/12 text-sm text-grey-100">{description}</p>
      </section>
      {reviews.length > 0 ? (
        <section className="grid md:flex md:items-baseline mx-auto gap-5 w-10/12 md:w-8/12 pt-10">
          <h1 className="text-xl mr-2">Reseñas</h1>
          <div className="w-12/12">
            <div>

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
            </div>
          </div>
        </section>
      ) : (
        <p className="mt-10 tflex w-full m-auto my-5 text-center">
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
