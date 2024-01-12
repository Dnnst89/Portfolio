"use client";
import { useState } from "react";
import useCartSummary from "@/hooks/useCartSummary";
import { formatTaxData } from "@/helpers";

const GifttCheckbox = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleList, setArticleList] = useState([]);
  const [hideSpan, setHideSpan] = useState(false);
  const { items } = useCartSummary({
    userId: 256,
  });
  //gift?.attributes?.variant?.data?.attributes?.product?.data.attributes.name
  const itemsOnCart = items.map(
    (gift) =>
      gift?.attributes?.variant?.data?.attributes?.product?.data.attributes
  );

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const selectedArticle = itemsOnCart.find(
      (item) => item.name === selectedValue
    );

    if (selectedArticle) {
      setSelectedArticle(selectedArticle);
      setArticleList([...articleList, selectedArticle]);
    }
  };

  const handleDeleteSpan = () => {
    setHideSpan(true);
  };
  return (
    <div className="flex justify-center align-baseline">
      <label htmlFor="">Selecciona los artículos a envolver</label>
      <div>
        <select onChange={handleSelectChange} className="cursor-pointer">
          <option value="" disabled selected>
            Seleccionar los artículo
          </option>

          {itemsOnCart.map((item) => (
            <option key={item.cabys} value={item.name}>
              <li>{item.name}</li>
            </option>
          ))}
        </select>
      </div>
      {/** shows all the gift in the cart */}
      <div className=" inline-flex items-baseline ">
        {articleList.length > 0 && (
          <div className="flex items-baseline w-[400px]">
            <ul>
              {/*  check if the option already exist in the list */}
              {articleList.map((article) => (
                <div key={article.cabys} className="m-3">
                  <div className=" text-sm rounde-s m-1 rounded p-1 border border-grey-300 border-solid ">
                    <div>{article.name}</div>
                    <button
                      onClick={handleDeleteSpan}
                      className="rounded-full bg-orange m-1 p-[5px] cursor-pointer"
                    >
                      {hideSpan && <span>x</span>}
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default GifttCheckbox;
