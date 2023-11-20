// ProductFeatureSelector

import React, { useState } from 'react';

const ProductFeatureSelector = ({ featureId, featureName, featureList, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const selectedFeature = event.target.value;
    const selectedFeatureValue = event.target.options[event.target.selectedIndex].text; // Cambiado a text
    const selectedBox = event.target.id;
    setSelectedValue(selectedFeature);
    onSelect(selectedFeature, selectedBox, selectedFeatureValue, featureName);
  };

  const generateUniqueId = (name) => {
    return `${name.toLowerCase().replace(/\s/g, '-')}-select`;
  };

  
  return (
    <div className='py-3 space-y-2 w-full h-fit border-dashed border-grey-200 border-t-2 grid grid-cols-12'>
      <h3 className='text-grey-100 font-bold col-span-12'>{featureName}</h3>
      <select
      className='col-span-10 md:col-span-7 text-white bg-lightblue font-bold  rounded-lg px-5 px-10 py-3 inline-flex items-center  '
        id={featureId}
        value={selectedValue}
        onChange={handleChange}
      >
        <option 
        className='font-semibold'
        value="" 
        disabled>
          Selec. {featureName}
        </option>
        {Object.entries(featureList).map(([key, value], index) => (
          <option 
          className='font-semibold'
          key={value} 
          value={value}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFeatureSelector;