import React from "react";

const AgePagination = ({
  nbPages,
  currentPage,
  setCurrentPage,
}) => {
  const pagesToShow = 3; 
  const halfPagesToShow = Math.floor(pagesToShow / 2);

  const firstPage = Math.max(1, currentPage - halfPagesToShow);
  const lastPage = Math.min(nbPages, firstPage + pagesToShow - 1);

  const onPageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onPreviusPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextPage = () => {
    if (currentPage < nbPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    
    <div className="flex flex-wrap max-w-screen-xl m-auto justify-center py-10">
      {nbPages > 0 && (
      <nav aria-label="">
        <ul className="list-style-none flex">
          <li>
            <button
              className={`relative min-w-[90px] block rounded bg-[#484848] px-3 py-1.5 text-sm text-white transition-all duration-300 pl-3 ml-2 ${currentPage ===  1 ? "bg-[#484840]" : "bg-black"}`}
              disabled={currentPage === 1}
              onClick={onPreviusPage}
            >
              Anterior
            </button>
          </li>
          {Array.from({ length: lastPage - firstPage + 1 }, (_, i) => (
            <li key={i}>
              <button
                className={`relative block rounded bg-primary-500 mx-1 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 ${
                  firstPage + i === currentPage ? "bg-white" : ""
                }`}
                onClick={() => onPageClick(firstPage + i)}
              >
                {firstPage + i}
              </button>
            </li>
          ))}
          <li>
            <button
              className={`relative min-w-[90px] block rounded  px-3 py-1.5 text-sm text-white transition-all duration-300 pl-3 ml-2 ${currentPage === nbPages  ? "bg-[#484848]" : "bg-black"}`}
              disabled={currentPage === nbPages}
              onClick={onNextPage}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
      )}
    </div>
  );
};

export default AgePagination;
