import React, { useState } from "react";
import FeatureSelector from "./ProductFeatureSelector";

const ProductFeatures = ({variantsList, setImages, setImage}) => {
  const [featureCount, setFeatureCount] = useState(1);

  // Usamos map para transformar cada variante en el formato deseado
  const variantesDict = variantsList.map((variante) => ({
    name: variante.attributes.type,
    options: {
      [variante.attributes.typeValue]: variante.id,
    },
  }));

  // Convertimos el array de objetos en un solo objeto usando reduce
  const resultado = variantesDict.reduce((acc, variante) => {
    acc[variante.name] = {
      options: {
        ...acc[variante.name]?.options, // Mantenemos las opciones existentes si ya hay alguna
        ...variante.options,
      },
    };
    return acc;
  }, {});

  const [featureList, setFeatureList] = useState([resultado]);

  //obtenemos las imagenes de la variante seleccionada
  const getImagesById = (id, variants) => {
    const variant = variants.find(variant => {
      return variant.id === id
    })
    if (variant) {
      return variant.attributes.images.data;
    }
    return [];
  };
  
  
  //Aqui va lo que vamos a hacer con lo que se seleccionó
  const handleFeatureSelect = (featureName, selectedValue) => {
    let variantImages=getImagesById(selectedValue, variantsList);
    setImages(variantImages);  
    setImage(variantImages[0].attributes.url)
    handleAddFeature();
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
    const possibleValues = ["Value 1", "Value 2", "Value 3"];
    const randomIndex = Math.floor(Math.random() * possibleValues.length);
    return possibleValues[randomIndex];
  };

  return (
    <div>
      {featureList.map((feature, index) => {
        const featureName = Object.keys(feature)[0]; // Obtén el nombre de la característica
        const featureOptions = feature[featureName].options; // Obtén las opciones de la característica

        return (
          <FeatureSelector
            key={index}
            featureName={featureName}
            featureList={featureOptions}
            onSelect={handleFeatureSelect}
          />
        );
      })}
    </div>
  );
};

export default ProductFeatures;
