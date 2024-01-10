"use client";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import GetCategories from "@/src/graphQl/queries/getCategories";
import { useLazyQuery, useQuery } from "@apollo/client";

const NavCategories = () => {
  const [clickedItem, setClickedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [getCategories] = useLazyQuery(GetCategories);
  const [menuItems, setMenuItems] = useState([]);
  const router = useRouter();
  // const getData = async () => { //se trae las categorias desde algolia(mayor cantidad de consultas innecesarias)
  //   const { data } = await algoliaInstace.get(
  //     "development_api::category.category/"
  //   );
  //   setMenuItems(data.hits);
  // };

  useEffect(() => {
    const getData = async () => {
      //obtiene la data directamente de strapi
      let currentPage = 1;
      let pageSize = 10;
      let fetchedData = []; // para ir juntando los datos de cada pagina
      let pageCount = 1;

      do {
        //debemos hacer un primer recorrido ya que el dato paeCount de la consulta es incierto
        try {
          const { data, error, loading } = await getCategories({
            variables: {
              page: currentPage,
              pageSize,
            },
          });

          const categories = data?.categories;

          fetchedData = fetchedData.concat(categories?.data);
          pageCount = categories?.meta?.pagination?.pageCount;
          currentPage++;
          setLoading(loading);
        } catch (error) {
          console.log(error);
        }
      } while (currentPage <= pageCount);
      setMenuItems(fetchedData);
      setLoading(loading);
    };
    getData();
    setLoading(false);
  }, []);

  const handleItemClick = (item) => {
    // if (clickedItem === id) {
    //   // Si se hace clic nuevamente en el mismo elemento, deselecciona
    //   setClickedItem(null);
    // } else {
    //   setClickedItem(id);
    // }
    // console.log(window.location.pathname, "pathname");
    // console.log(window.location.search, "search");

    return (window.location.href = `/filtersResults/?category=${item?.attributes?.name}`);
  };

  return (
    <>
      <nav
        aria-label="Menú categorías"
        role="navigation"
        className="grid grid-cols-1 h-[50px] mt-[0.5px] bg-resene"
      >
        <ul className="flex md:justify-center content-center text-[#333333]  overflow-y-scroll scrollbar scrollbar-none">
          {menuItems && menuItems.length ? (
            menuItems.map((item, index) => (
              <li
                key={item.id}
                className="px-3 hover:underline font-bold cursor-grab flex justify-center items-center"
              >
                <button
                  id={index}
                  onClick={() => {
                    handleItemClick(item);
                  }}
                  className="w-max"
                >
                  {item?.attributes?.name}
                </button>
              </li>
            ))
          ) : (
            <Spinner />
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavCategories;
// flex items-center text-[13px] text-[#333333] px-2 h-2 overflow-y-scroll scrollbar scrollbar-none
