import ProductReview from "./ProductReview";

const ProductDetailSecondary = ({ description, reviews }) => {
  return (
    <main className="bg-resene" id="detail-table">
      <section className="flex items-center m-5 gap-5 description-section pt-10">
        <h1 className="m-1 text-lg">Descripción</h1>
        <p>{description}</p>
      </section>
      <section className="mt-2 size-section description-section">
        <h1 className="text-lg mr-5">Reviews</h1>
        <table>
          <tbody className="tbody-clases">
            <tr className="border-b-[1px] border-grey flex gap-[257px] ">
              <th>Nombre</th>
              <th>Puntuacion</th>
              <th>Comentario</th>
            </tr>
            {reviews
              ? reviews.map((item) => {
                return <ProductReview key={item.id} comment={item.attributes.comment} score={item.attributes.score} user={item.attributes.users_permissions_user.data.attributes.username} />;
              })
              : null}
          </tbody>
        </table>
      </section>
    </main>
  );
};
export default ProductDetailSecondary;
