import React from "react";

function SearchItem({ hit, components }) {
  return (
    <div>
      <div className="aa-ItemContent">
        <div className="ItemCategory">{hit.name}</div>
        <div className="aa-ItemContentBody">
          {/* <div className="aa-ItemContentTitle">
            <components.Highlight hit={hit} attribute="name" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;