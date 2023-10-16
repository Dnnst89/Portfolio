import React from "react";

const Pagination = ({
  nbPages,
  currentPage,
  setCurrentPage,
}) => {
  const noPages = [];
  
  for (let index = 1; index <= nbPages; index++) {
    noPages.push(index);
  }
  const onPreviusPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSpecificPage = (number) => {
    setCurrentPage(number - 1);
    setCurrentPage(number - 1);
  };

  return (
    <div className="flex flex-wrap max-w-screen-xl m-auto justify-center py-10">
      <nav aria-label="">
        <ul className="list-style-none flex">
          <li>
            <button
              className="relative min-w-[90px] block rounded bg-[#484848] mr-2 px-3 py-1.5 text-sm text-white transition-all duration-300 dark:text-neutral-400 pr-3"
              disabled={currentPage === 0 ? true : false}
              onClick={onPreviusPage}
            >
              Anterior
            </button>
          </li>
          {noPages.map((noPage) => (
            <li key={noPage}>
              <button
                className={`relative block rounded bg-primary-500 mx-1 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 bg${noPage === currentPage + 1 ? "-white" : ""
                  }`}
                onClick={() => onSpecificPage(noPage)}
              >
                {noPage}
              </button>
            </li>
          ))}
          <li>
            <button
              href="#"
              className={`relative min-w-[90px] block rounded bg-[#484848] px-3 py-1.5 text-sm text-white transition-all duration-300 dark:text-neutral-400 pl-3 ml-2 ${currentPage === noPages - 1 ? "bg-black" : ""}`}
              disabled={currentPage === noPages.length - 1 ? true : false}
              onClick={onNextPage}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
