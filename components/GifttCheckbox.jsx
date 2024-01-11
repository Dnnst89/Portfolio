"use client";
import { useState } from "react";
import styles from "../styles/giftCheckbox.module.css";

const GifttCheckbox = ({ props }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleList, setArticleList] = useState([]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const selectedArticle = articles.find(
      (article) => article.title === selectedValue
    );

    if (selectedArticle) {
      setSelectedArticle(selectedArticle);
      setArticleList([...articleList, selectedArticle]);
    }
  };
  const articles = [
    { id: 1, title: "Article 1" },
    { id: 2, title: "Article 2" },
    { id: 3, title: "Article 3" },
    // Add more articles as needed
  ];
  return (
    <div className="flex justify-center align-baseline">
      <label htmlFor="">Envolver regalo</label>
      <div>
        <select
          onChange={handleSelectChange}
          value={selectedArticle ? selectedArticle.title : ""}
          className="cursor-pointer"
        >
          {articles.map((item) => (
            <option key={item.id} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      <div className=" inline-flex items-baseline ">
        {articleList.length > 0 && (
          <div className="flex items-baseline w-[400px]">
            <ul>
              {articleList.map((article) => (
                <div key={article.id} className="m-3">
                  <span className="cursor-pointer text-sm rounde-s m-1 rounded p-1 border border-grey-300 border-solid ">
                    {article.title}
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
