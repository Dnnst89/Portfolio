// ProductFeatureSelector

import React, { useState } from 'react';

const ProductFeatureSelector = ({ featureName, featureList, onSelect }) => {
    const [selectedValue, setSelectedValue] = useState('');
  
    const handleChange = (event) => {
      const selectedFeature = event.target.value;
      setSelectedValue(selectedFeature);
      onSelect(featureName, selectedFeature);
    };
  
    const generateUniqueId = (name) => {
      return `${name.toLowerCase().replace(/\s/g, '-')}-select`;
    };
  
    return (
        <div className='py-3 space-y-2 w-full h-fit border-t grid'>
        <h3 className='font-bold'>{featureName}</h3>
        <select
          id={generateUniqueId(featureName)}
          value={selectedValue}
          onChange={handleChange}
        >
          <option value="" disabled>
            Selecciona {featureName}
          </option>
          {Object.entries(featureList).map(([key, value], index) => (
            <option key={index} value={value}>
              {key}
            </option>
          ))}
        </select>
      </div>
    );
  };

export default ProductFeatureSelector;