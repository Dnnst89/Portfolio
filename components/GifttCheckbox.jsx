"use client";
import { useState } from "react";
import useCartSummary from "@/hooks/useCartSummary";
import { AiOutlineClose } from "react-icons/ai";

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
  // Filter out the article specific name
  const handleDeleteSpan = (nameToRemove) => {
    console.log(nameToRemove);
    const updatedArticleList = articleList.filter(
      (item) => item.name !== nameToRemove
    );

    // Update the state with the filtered article list
    setArticleList(updatedArticleList);

    // Optionally, you can set a state to hide the span here if needed
    setHideSpan(true);
  };
  return (
    <div className="w-3/4 m-auto mt-10 mb-5 flex items-center space-x-5">
      <label htmlFor="">Selecciona los artículos a envolver</label>
      <div className="flex-col ">
        <select
          onChange={handleSelectChange}
          className="cursor-pointer w-[150px] "
        >
          <option value="" disabled selected className="text-xs font-bold">
            Seleccionar
          </option>

          {itemsOnCart.map((item) => (
            <option key={item.cabys} value={item.name}>
              <li>{item.name}</li>
            </option>
          ))}
        </select>
      </div>
      {/** shows all the gift in the cart */}
      <div className="flex">
        {articleList.length > 0 && (
          <ul className=" list-none p-0 w-[400px]">
            {/*  check if the option already exists in the list */}
            <div>Artículos seleccionados</div>

            {articleList.map((article) => (
              <li key={article.cabys} className="m-2">
                <div
                  className={`inline-flex items-center whitespace-nowrap rounded-[0.27rem]
                   border-solid border-2 border-aquamarine px-[0.65em] pb-[0.25em] pt-[0.35em]
                    text-center align-baseline text-[0.75em] leading-none text-black }`}
                >
                  <div>{article.name}</div>
                  <button
                    onClick={handleDeleteSpan}
                    className="inline-flex items-center m-1 p-[2px] cursor-pointer"
                  >
                    {/* Add any content or icon for the button if needed */}
                  </button>
                  <span className="ml-auto cursor-pointer">
                    <AiOutlineClose
                      size={15}
                      style={{
                        backgroundColor: "#ff7849",
                        borderRadius: "50%",
                        padding: "1px",
                        color: "#F6EEE5",
                      }}
                      onClick={() => handleDeleteSpan(article.name)}
                    />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default GifttCheckbox;
