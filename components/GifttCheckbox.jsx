"use client";
import { useState } from "react";
import useCartSummary from "@/hooks/useCartSummary";
import { AiOutlineClose } from "react-icons/ai";
import { AddGiftInfo } from "@/src/graphQl/queries/addGiftInfo";
import useStorage from "@/hooks/useStorage";
import { useMutation } from "@apollo/client";
const GifttCheckbox = (onSubmit) => {
  const [wrappedGifts] = useMutation(AddGiftInfo);
  const [articleList, setArticleList] = useState([]);
  // brings the authorized user in session
  const { user } = useStorage();
  const userId = user?.id;
  //alert(userId);
  const { items } = useCartSummary({
    userId: userId,
  });
  //gift?.attributes?.variant?.data?.attributes?.product?.data.attributes.name
  const itemsOnCart = items.map(
    (gift) =>
      gift?.attributes?.variant?.data?.attributes?.product?.data.attributes
  );

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    // Check if the selected item is not already in articleList
    const isItemNotInList = articleList.every(
      (item) => item.name !== selectedValue
    );

    if (isItemNotInList) {
      // Find the selected item in itemsOnCart
      const selectedArticle = itemsOnCart.find(
        (item) => item.name === selectedValue
      );

      if (selectedArticle) {
        // Add the selected item to articleList
        setArticleList([...articleList, selectedArticle]);
      }
    }
  };
  // Filter out the article specific name
  const handleDeleteSpan = (nameToRemove) => {
    const updatedArticleList = articleList.filter(
      (item) => item.name !== nameToRemove
    );

    // Update the state with the filtered article list
    setArticleList(updatedArticleList);
  };

  const handleSubmitWrappedGifts = async () => {
    const description = articleList.map((article) => article.name).join(", ");
    try {
      const { data } = await wrappedGifts({
        variables: { id: userId, des: description },
      });
      // If the mutation is successful, call the onSubmit callback
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.error("No fue posible realizar la acción", mutationError);
    }
  };

  return (
    <div className="flex flex-col h-[200px] m-auto mt-10 mb-5 items-center space-x-5">
      <div>
        <select onChange={handleSelectChange} className="cursor-pointer">
          <option value="" disabled selected className="text-xs font-bold">
            Seleccionar
          </option>

          {itemsOnCart.map((item) => (
            <option key={item.cabys} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {/** shows all the gift in the cart */}
      <div className="flex flex-col">
        <div className="font-bold">
          <p className="">Artículos seleccionados</p>{" "}
        </div>
        {articleList.length > 0 && (
          <ul className="list-none p-0 w-max-[400px]">
            {articleList.map((article) => (
              <li key={article.cabys} className="mb-2">
                <div
                  className="inline-flex items-center whitespace-nowrap rounded-[0.27rem]
                   border-solid border-2 border-aquamarine px-[0.65em] pb-[0.25em] pt-[0.35em]
                    text-center align-baseline text-[0.75em] leading-none text-black "
                >
                  <div>{article.name}</div>
                  <span className="ml-auto cursor-pointer pl-1">
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
