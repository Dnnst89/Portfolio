"use client";
import React, { useState, useEffect } from "react";
import FeatureSelector from "./ProductFeatureSelector";
import { useLazyQuery, useQuery } from "@apollo/client";
import GET_VARIANT_BY_ID from "@/src/graphQl/queries/getVariantByID";

const ProductFeatures = ({ variantsList, setImages, setImage, setvariantSelected }) => {

  const [featureCount, setFeatureCount] = useState(1);
  const [variantInfo, setVariantInfo] = useState(variantsList);// objeto con las variantes hijas de la seleccion actual
  const [featureObject, setFeatureObject] = useState({});
  const [getVariant] = useLazyQuery(GET_VARIANT_BY_ID);





  const getVariantDictionary = (variantsList) => {
    // Usamos map para transformar cada variante en el formato deseado
    const variantsDict = variantsList.map((variante) => ({
      name: variante.attributes.type,
      options: {
        [variante.attributes.typeValue]: variante.id,
      },
    }));

    // Convertimos el array de objetos en un solo objeto usando reduce
    const result = variantsDict.reduce((acc, variante) => {
      acc[variante.name] = {
        options: {
          ...acc[variante.name]?.options, // Mantenemos las opciones existentes si ya hay alguna
          ...variante.options,
        },
      };
      return acc;
    }, {});

    return result
  }
  const result = getVariantDictionary(variantInfo);

  const [featureList, setFeatureList] = useState([result]);//lista de caracteristicas que se van renderizando en componentes
  useEffect(() => {
    //console.log("🚀 ~ file: ProductFeatures.jsx:151 ~ removeFeaturesFromIndex ~ featureList:", featureList)
    //console.log("🚀 ~ file: ProductFeatures.jsx:102 ~ addKeyValuePair ~ jsonObject:", featureObject)
    //console.log("🚀 ~ file: ProductFeatures.jsx:47 ~ useEffect ~ variantInfo:", variantInfo)
  }, [featureObject]);

/**
   * 
   * @author Fabián Fernández Chaves
   * @param {number} id id del child seleccionado
   * @param {object} variants objeto con las variantes hijas
   */
  const getImagesById = (id, variants) => {
    const variant = variants.find(variant => {
      return variant.id === id
    })
    if (variant) {
      return variant.attributes.images.data;
    }
    return [];
  };

  /**
   * Usa el id para obtener las imagenes que corresponden al 
   * child seleccionado
   * @author Fabián Fernández Chaves
   * @param {number} selectedValue id del child seleccionado
   */
  const chanceImages = async (selectedValue) => {
    try {
      const { data } = await getVariant({
        //llamo la query para traer la shopping session
        variables: { id: selectedValue },

      });
      let variantData = data?.variant?.data?.attributes.images.data;
      
      //let variantImages = getImagesById(selectedValue, variantInfo);
      setImages(variantData);
      setImage(variantData[0].attributes.url)
      
    } catch (error) {
      console.log(error);
    }
    
  }

  
  const addFeaturetoObject = (key, value, selectedValue) => {
    // Crear una copia del objeto JSON existente
    const updatedFeatureObject = { ...featureObject };

    // Agregar el nuevo par clave-valor
    updatedFeatureObject[key] = value;

    // Actualizar el estado con el nuevo objeto JSON
    setFeatureObject(updatedFeatureObject);
    let variant={
      variantId: selectedValue,
      features: updatedFeatureObject
    }
    setvariantSelected(variant);
    
  };

  //Aqui va lo que vamos a hacer con lo que se seleccionó
  const handleFeatureSelect = async (selectedValue, selectedBox, selectedFeatureValue, featureName) => {
    
    try {
      const { data } = await getVariant({
        //llamo la query para traer la shopping session
        variables: { id: selectedValue },
      });
      const variantData = data?.variant?.data?.attributes.childVariants;
      setVariantInfo(variantData.data);
      if (variantData && variantData.data.length > 0) {
        // Obtener el diccionario de la variante
        let data = getVariantDictionary(variantData.data);
        // Actualizar la lista de características y el contador
        setFeatureList((prevList) => [
          ...prevList,
          data,
        ]);
        //setFeatureCount((prevCount) => prevCount + 1);
      }
      //handleAddFeature();
      removeFeaturesFromIndex(selectedBox);
      chanceImages(selectedValue);
      addFeaturetoObject(featureName, selectedFeatureValue, selectedValue)
    } catch (error) {
      console.log(error);
    }
  };


  
  //agregar el nuevo feature de selección
  const handleAddFeature = () => {
    if (variantInfo && variantInfo.data.length > 0) {
      // Obtener el diccionario de la variante
      let data = getVariantDictionary(variantInfo.data);
      // Actualizar la lista de características y el contador
      setFeatureList((prevList) => [
        ...prevList,
        data,
      ]);
      setFeatureCount((prevCount) => prevCount + 1);
    }
  };

  const removeFeaturesFromIndex = (index) => {
    //console.log("🚀 removeFeaturesFromIndex ~ index:", index,"🚀 removeFeaturesFromIndex ~ featureList.length:",featureList)

    if (index < featureList.length-1) {// si el identificador del select es menor a la cantidad de items en featureList
      console.log("Borrando")
      // Actualiza la lista de características desde el índice dado en adelante
      const trimmedList = featureList.slice(0, index + 1);
      // Actualiza el estado de la lista de características y el contador
      setFeatureList(trimmedList);
      //setFeatureCount(index); // Ajusta el contador según el índice eliminado
    } else {
      console.error("Índice no válido");
    }
  };

  return (
    <div>
      {featureList.map((feature, index) => {
        const featureName = Object.keys(feature)[0]; // Obtén el nombre de la característica
        const featureOptions = feature[featureName].options; // Obtén las opciones de la característica

        return (
          <FeatureSelector
            featureId={index}
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
