import ProductReview from "./ProductReview";
import ProductReviewForm from "./ProductReviewForm";

const ProductDetailSecondary = ({ id, description, reviews }) => {
  return (
    <main className="bg-resene" id="detail-table">
      <section className="flex mx-auto m-5 gap-5 w-6/12 pt-10">
        <h1 className="m-1 text-xl">Descripción</h1>
        <p>{description}</p>
      </section>
      <section className="w-3/4 mt-10 flex mx-auto">
        <h1 className="text-xl mr-5">Reseñas</h1>
        <table>
          <tbody className="tbody-clases">
            <tr className="border-b-[1px] border-grey flex gap-[170px] w-11/12 ">
              <th>Nombre de usuario</th>
              <th>Puntuación</th>
              <th className="ml-[40px]">Comentario</th>
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
