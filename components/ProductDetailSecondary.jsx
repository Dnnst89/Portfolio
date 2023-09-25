import ProductReview from "./ProductReview";
import ProductReviewForm from "./ProductReviewForm";

const ProductDetailSecondary = ({ id, description, reviews }) => {
  return (
    <main className="bg-resene" id="detail-table">
      <section className="flex  m-5 gap-5 description-section pt-10">
        <h1 className="m-1 text-xl">Descripción</h1>
        <p>{description}</p>
      </section>
      <section className="mt-2 size-section description-section">
        <h1 className="text-xl mr-5">Reseñas</h1>
        <table>
          <tbody className="tbody-clases">
            <tr className="border-b-[1px] border-grey flex gap-[160px] w-11/12 ">
              <th>Nombre de usuario</th>
              <th>Puntuación</th>
              <th>Comentario</th>
            </tr>
            {reviews
              ? reviews.map((item) => {
                  return (
                    <ProductReview
                      key={item.id}
                      comment={item.attributes.comment}
                      score={item.attributes.score}
                      user={
                        item.attributes.users_permissions_user.data.attributes
                          .username
                      }
                    />
                  );
                })
              : null}
          </tbody>
        </table>
      </section>
      <ProductReviewForm idProduct={id} />
    </main>
  );
};
export default ProductDetailSecondary;
