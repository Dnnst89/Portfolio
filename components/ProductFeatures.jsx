import React, { useState } from 'react';
import FeatureSelector from './ProductFeatureSelector';

const ProductFeatures = () => {
  const [featureCount, setFeatureCount] = useState(1);
  const [featureList, setFeatureList] = useState([
    { name: 'Color', options: ['Rojo', 'Azul'], value:['id1','id2'] },
  ]);

  //Aqui va lo que vamos a hacer con lo que se seleccionó
  const handleFeatureSelect = (featureName, selectedValue) => {
    handleAddFeature();
    console.log(`Selected ${featureName}: ${selectedValue}`);
  };

  //agregar el nuevo feature de selección 
  const handleAddFeature = () => {
    const newFeatureName = `Feature ${featureCount + 1}`;
    const randomOptions = [getRandomValue(), getRandomValue()];

    setFeatureList((prevList) => [
      ...prevList,
      { name: newFeatureName, options: randomOptions, value: randomOptions },
    ]);

    setFeatureCount((prevCount) => prevCount + 1);
  };

  const getRandomValue = () => {
    const possibleValues = ['Value 1', 'Value 2', 'Value 3'];
    const randomIndex = Math.floor(Math.random() * possibleValues.length);
    return possibleValues[randomIndex];
  };

  return (
    <div>
      {featureList.map((feature, index) => (
        <FeatureSelector
          key={index}//Aqui pondria por key el id de la variante padre
          featureName={feature.name}
          featureList={feature.options}
          onSelect={handleFeatureSelect}
        />
      ))}
    </div>
  );
};

export default ProductFeatures;
