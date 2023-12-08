import React from "react";

const Pagination = ({ nbPages, currentPage, setCurrentPage, pagesToShow = 5 }) => {
  const onPreviusPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSpecificPage = (number) => {
    setCurrentPage(number - 1);
  };

  // Determinar la cantidad de páginas a mostrar en dispositivos móviles
  const pagesToShowMobile = 3; // Puedes ajustar este valor según tus necesidades

  // Determinar el valor final de pagesToShow según el tamaño de la pantalla
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const actualPagesToShow = screenWidth <= 500 ? pagesToShowMobile : pagesToShow;

  const startPage = Math.max(1, currentPage +1 - Math.floor(actualPagesToShow / 2));
  const endPage = Math.min(startPage  + actualPagesToShow - 1, nbPages);

  const pageRange = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex flex-wrap max-w-screen-xl m-auto justify-center py-10">
      {nbPages > 1 && (
        <nav aria-label="">
          <ul className="list-style-none flex">
            <li>
              <button
                className={`relative min-w-[90px] block rounded px-3 py-1.5 text-sm text-white transition-all duration-300 pl-3 ml-2 ${currentPage === 0 ? "bg-[#484848]" : "bg-black"}`}
                disabled={currentPage === 0}
                onClick={onPreviusPage}
              >
                Anterior
              </button>
            </li>
            {pageRange.map((page) => (
              <li key={page}>
                <button
                  className={`relative block rounded bg-primary-500 mx-1 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 ${
                    page === currentPage + 1 ? "bg-white" : ""
                  }`}
                  onClick={() => onSpecificPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`relative min-w-[90px] block rounded px-3 py-1.5 text-sm text-white transition-all duration-300 pl-3 ml-2 ${currentPage === nbPages - 1 ? "bg-[#484848]" : "bg-black"}`}
                disabled={currentPage === nbPages - 1}
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

export default Pagination;
