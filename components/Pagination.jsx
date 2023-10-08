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
              className="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
              disabled={currentPage === 0 ? true : false}
              onClick={onPreviusPage}
            >
              Anterior
            </button>
          </li>
          {noPages.map((noPage) => (
            <li key={noPage}>
              <button
                className={`relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 bg${noPage === currentPage + 1 ? "-white" : ""
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
              className="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
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
