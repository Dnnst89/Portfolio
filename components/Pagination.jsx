import React from "react";

const Pagination = ({
  hitsPerPage,
  nbHits,
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
    <div>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              disabled={currentPage === 0 ? true : false}
              onClick={onPreviusPage}
            >
              Anterior
            </button>
          </li>
          {noPages.map((noPage) => (
            <li key={noPage}>
              <button
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white bg${
                  noPage === currentPage + 1 ? "-white" : ""
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
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
