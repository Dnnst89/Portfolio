import { algoliaInstace } from "@/src/axios/algoliaIntance/config";
import ProductDetail from "@/components/ProductDetail";
import ProductDetailTable from "@/components/ProductDetailSecondary";
import RelatedItems from "@/components/RelatedItems";
import { atRule } from "postcss";
import { Convergence } from "next/font/google";

async function getData(id) {
  try {
    const res = await fetch(
      `http://ec2-54-189-90-96.us-west-2.compute.amazonaws.com:1337/api/products/${id}?populate=*`
    );
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Post({ params }) {
  const { id } = params;

  const { attributes } = await getData(id);
  const coverImage = attributes.coverImage.data;

  const materials = attributes.materials.data;
  let one = materials[0];
  const material = one.attributes.name;

  const variants = attributes.variants.data;
  let two = variants[0];
  const variant = two.attributes;

  const categories = attributes.categories.data;
  let three = categories[0];
  const category = three.attributes.name;

  const { name, description, defaultPrice, sku } = attributes;

  return (
    <main>
      <ProductDetail
        name={name}
        description={description}
        defaultPrice={defaultPrice}
        sku={sku}
        coverImage={coverImage}
        material={material}
        variant={variant}
        category={category}
      />
      <ProductDetailTable description={description} />
      <RelatedItems />
    </main>
  );
}

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  const decreaseCounter = () => {
    if (quantity === 0) return;
    setQuantity((prev) => --prev);
  };

  const increaseCounter = () => {
    setQuantity((prev) => ++prev);
  };
  const handleClick = () => {
    // Find the element you want to scroll to
    const element = document.querySelector("#detail-table");

    // Scroll to the element
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="bg-floralwhite" target="_blank" rel="noopener noreferrer">
        <div className=" p-5 flex">
          {/* imagen principal grande */}
          <div className="w-6/12 flex justify-center">
            <img
              width="500"
              height="800"
              src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
              alt="tailwind logo"
              className="rounded-xl w-100 h-800"
            />
          </div>
          {/* parte derecha de la imagen principal grande*/}
          <div className="w-6/12 flex flex-col">
            <h2 className="flex justify-end">Ref 000</h2>
            <h1 className="mb-3">Nombre del producto</h1>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua."
            </p>
            <a onClick={() => handleClick()}>
              <button className="flex justify-start text-lightblue">
                Leer mas
              </button>
            </a>
            {/* imagenes iconos y caracteristicas */}
            <div className="  flex">
              {/* primera caja */}
              <div className="w-3/6">
                <div className="flex mt-5">
                  <img
                    width="50"
                    height="50"
                    src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
                    alt="tailwind logo"
                    className="rounded-full mx-2"
                  />
                  <p>Caracteristica del producto</p>
                </div>

                <div className="flex mt-5">
                  <img
                    width="50"
                    height="50"
                    src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
                    alt="tailwind logo"
                    className="rounded-full mx-2"
                  />
                  <p>Caracteristica del producto</p>
                </div>

                <div className="flex mt-5">
                  <img
                    width="50"
                    height="50"
                    src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
                    alt="tailwind logo"
                    className="rounded-full mx-2"
                  />
                  <p>Caracteristica del producto</p>
                </div>
              </div>
              {/* segunda caja */}
              <div className=" w-3/6">
                <div className="flex mt-5">
                  <img
                    width="50"
                    height="50"
                    src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
                    alt="tailwind logo"
                    className="rounded-full mx-2"
                  />
                  <p>Caracteristica del producto</p>
                </div>

                <div className="flex mt-5">
                  <img
                    width="50"
                    height="50"
                    src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
                    alt="tailwind logo"
                    className="rounded-full mx-2"
                  />
                  <p>Caracteristica del producto</p>
                </div>

                <div className="flex mt-5">
                  <img
                    width="50"
                    height="50"
                    src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
                    alt="tailwind logo"
                    className="rounded-full mx-2"
                  />
                  <p>Caracteristica del producto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //imagenes debajo de la principal */}
        <div className="flex ">
          <div className="flex h-32  w-6/12 justify-center">
            <img
              width="125"
              height="100"
              src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
              alt="tailwind logo"
              className="rounded-xl mx-2"
            />
            <img
              width="125"
              height="100"
              src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
              alt="tailwind logo"
              className="rounded-xl mx-2"
            />
            <img
              width="125"
              height="100"
              src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
              alt="tailwind logo"
              className="rounded-xl mx-2"
            />
          </div>
          {/* precio, cantidad y carrito */}
          <div className=" w-6/12 flex justify-between items-center p-4">
            <span className="font-bold">$58.00</span>
            <div className="flex flex-col items-end p-3">
              <div className="flex items-center mb-2 ">
                <span className="text-grey">Cantidad:</span>
                <div className="bg-resene rounded-full m-3 w-[120px] flex items-center justify-center p-2 space-x-4">
                  <button className=" bg-grey-100 rounded-full text-white">
                    <BiMinus onClick={decreaseCounter} />
                  </button>
                  <span>{quantity}</span>
                  <button className=" bg-grey-100 rounded-full  text-white">
                    <BiPlus onClick={increaseCounter} />
                  </button>
                </div>
              </div>
              <div className="bg-aquamarine rounded-sm p-3  mx-4">
                <Link href={"/cart"}>
                  <button className="text-white text-sm">
                    Agregar al carrito
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  const { data } = await res.json();

  const paths = data.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: true };
}
