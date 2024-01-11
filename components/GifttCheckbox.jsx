"use client";
import { useState } from "react";
import useCartSummary from "@/hooks/useCartSummary";
import { formatTaxData } from "@/helpers";

const GifttCheckbox = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleList, setArticleList] = useState([]);

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
  return (
    <div className="flex justify-center align-baseline">
      <label htmlFor="">Envolver regalo</label>
      <div>
        <select onChange={handleSelectChange} className="cursor-pointer">
          {itemsOnCart.map((item) => (
            <option key={item.cabys} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {/** shows all the gift in the cart */}
      <div className=" inline-flex items-baseline ">
        {articleList.length > 0 && (
          <div className="flex items-baseline w-[400px]">
            <ul>
              {articleList.map((article) => (
                <div key={article.cabys} className="m-3">
                  <span className="cursor-pointer text-sm rounde-s m-1 rounded p-1 border border-grey-300 border-solid ">
                    {article.name}
                    <span>x</span>
                  </span>
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
