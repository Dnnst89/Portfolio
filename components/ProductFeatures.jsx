"use client";
import React, { useState, useEffect } from "react";
import FeatureSelector from "./ProductFeatureSelector";
import { useLazyQuery, useQuery } from "@apollo/client";
import GET_VARIANT_BY_ID from "@/src/graphQl/queries/getVariantByID";

/**
 * Componente de características del producto. Se van presentando las opciones de caracteristicas según lo seleccionado.
 * @param {Array} props.variantsList - Lista de variantes del producto. Trae un objeto con todas y cada una de las variantes relacionadas al producto
 * @param {Function} props.setImages - Función para establecer las imágenes en carrusel del producto.
 * @param {Function} props.setImage - Función para establecer la imagen actual del producto.
 * @param {Function} props.setvariantSelected - Función para establecer la variante seleccionada. {variant: objetoVariante, features: objetoFeatures}
 * @param {Function} props.setPrice - Función para establecer el precio del producto.
 * @param {Function} props.setEnableButton - Función para habilitar/deshabilitar el botón.
 */
const ProductFeatures = ({
  variantData,
  variantsList,
  setImages,
  setImage,
  setvariantSelected,
  setPrice,
  setEnableButton,
}) => {
  const [featureCount, setFeatureCount] = useState(1);
  const [variantInfo, setVariantInfo] = useState(variantsList); // objeto con las variantes hijas de la seleccion actual
  const [featureObject, setFeatureObject] = useState({});
  const [getVariant] = useLazyQuery(GET_VARIANT_BY_ID);

  const colorTypeParentVariant =
    variantData?.variant?.data?.attributes?.parentVariant?.data?.attributes
      ?.type;
  const colorValueParentVariant =
    variantData?.variant?.data?.attributes?.parentVariant?.data?.attributes
      ?.typeValue;
  const colorTypeVariant = variantData?.variant?.data?.attributes?.type;
  const colorValueVariant = variantData?.variant?.data?.attributes?.typeValue;

  const featuresSelected = {};
  if (
    colorTypeParentVariant !== undefined &&
    colorValueParentVariant !== undefined
  ) {
    featuresSelected[colorTypeParentVariant] = colorValueParentVariant;
  }

  // Agregar propiedades solo si colorTypeVariant y colorValueVariant no son indefinidos
  if (colorTypeVariant !== undefined && colorValueVariant !== undefined) {
    featuresSelected[colorTypeVariant] = colorValueVariant;
  }

  //pone el boton en enabled ya que en el detalle de pedido desde le carrito no se utiliza los dropdowns
  useEffect(() => {
    if (variantData && variantData.variant && variantData.variant.data) {
      setEnableButton(
        variantData?.variant?.data?.attributes?.childVariants?.data?.length == 0
      );
    }
  }, [variantData, setEnableButton]);
  /**
   * Obtiene un diccionario de variantes a partir de la lista de variantes.
   * @param {Array} variantsList - Lista de variantes del producto.
   * @returns {Object} - Diccionario de variantes.
   */
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

    return result;
  };

  const result = getVariantDictionary(variantInfo);
  const [featureList, setFeatureList] = useState([result]); //lista de caracteristicas que se van renderizando en componentes

  /**
   * Obtiene las imágenes correspondientes a un ID de variante.
   * @param {number} id - ID de la variante.
   * @param {Array} variants - Lista de variantes.
   * @returns {Array} - Lista de imágenes.
   */
  const getImagesById = (id, variants) => {
    const variant = variants.find((variant) => {
      return variant.id === id;
    });
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
      setImage(variantData[0].attributes.url);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Agrega una característica al objeto de características.
   * @param {string} key - Clave de la característica.
   * @param {any} value - Valor de la característica.
   * @param {Object} variantObject - Objeto de la variante.
   */
  const addFeaturetoObject = (key, value, variantObject) => {
    // Crear una copia del objeto JSON existente
    const position = Object.keys(featureObject).indexOf(key);
    const keysArray = Object.keys(featureObject);
    // Recorrer las claves y eliminar desde el índice especificado en adelante
    if (position >= 0) {
      for (let i = position; i < keysArray.length; i++) {
        const key = keysArray[i];
        delete featureObject[key];
      }
    }
    //si la variante no tiene padre, el objeto de features se vacia, para eliminar features anteriores, aca va la logica para eliminar los features anteriores
    const updatedFeatureObject =
      variantObject?.variant?.data?.attributes?.parentVariant.data == null
        ? {}
        : { ...featureObject };
    // Agregar el nuevo par clave-valor si ya existe se sobreescribe
    updatedFeatureObject[key] = value;
    // Actualizar el estado con el nuevo objeto JSON
    setFeatureObject(updatedFeatureObject);
    // Verificar si variantObject está definido y tiene la propiedad 'data'

    if (variantObject?.variant?.data?.attributes) {
      let variant = {
        variant: variantObject?.variant,
        features: updatedFeatureObject,
      };
      setvariantSelected(variant);
      setPrice(variant.variant.data.attributes.price);
    } else {
      console.warn("Warnning: variantObject or its properties are undefined");
    }
  };

  /**
   * Maneja la selección de una característica.
   * @param {number} selectedValue - Valor de la opción seleccionada.
   * @param {string} selectedBox - select en el que se seleccionó la opción.
   * @param {any} selectedFeatureValue - Valor de la característica seleccionada.
   * @param {string} featureName - Nombre de la característica.
   */
  const handleFeatureSelect = async (
    selectedValue,
    selectedBox,
    selectedFeatureValue,
    featureName
  ) => {
    try {
      removeFeaturesFromIndex(selectedBox);
      chanceImages(selectedValue);
      const { data } = await getVariant({
        //llamo la query para traer la shopping session
        variables: { id: selectedValue },
      });

      setEnableButton(
        data.variant.data.attributes.childVariants.data.length == 0
      );
      const variantData = data?.variant?.data?.attributes.childVariants;
      setVariantInfo(variantData.data);
      if (variantData && variantData.data.length > 0) {
        // Obtener el diccionario de la variante
        let data = getVariantDictionary(variantData.data);
        // Actualizar la lista de características y el contador
        setFeatureList((prevList) => [...prevList, data]);
        //setFeatureCount((prevCount) => prevCount + 1);
      }
      //handleAddFeature();
      addFeaturetoObject(featureName, selectedFeatureValue, data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Elimina características a partir de un índice dado.
   * @param {number} index - Índice desde el cual eliminar características.
   */
  const removeFeaturesFromIndex = (index) => {
    if (index < featureList.length - 1) {
      // si el identificador del select es menor a la cantidad de items en featureList
      // Actualiza la lista de características desde el índice dado en adelante
      let end = Number(index) + 1;
      const trimmedList = featureList.slice(0, end);
      // Actualiza el estado de la lista de características y el contador
      setFeatureList(trimmedList);
      //setFeatureCount(index); // Ajusta el contador según el índice eliminado
    } else {
      console.warn("Warnning: Invalid Index");
    }
  };

  return (
    <div>
      <h3 className="text-[#484848] text-lg underline font-bold pt-2 pb-5">
        Características:
      </h3>

      {featuresSelected !== null &&
      featuresSelected !== undefined &&
      Object.keys(featuresSelected).some(
        (key) => featuresSelected[key] !== undefined
      )
        ? Object.keys(featuresSelected).map((key, index) => {
            const value = featuresSelected[key];
            const variantFeatureSelected = key;
            const variantfeatureOptions = {};
            variantfeatureOptions[variantFeatureSelected] = value;
            // Aquí debes definir qué es exactamente `variantfeatureOptions`
            if (variantFeatureSelected !== "null") {
              return (
                <FeatureSelector
                  variantData={variantData || null}
                  key={index}
                  featureId={index}
                  featureName={variantFeatureSelected}
                  featureSelectedList={variantfeatureOptions || null}
                  onSelect={handleFeatureSelect}
                />
              );
            }
          })
        : featureList.map((feature, index) => {
            const featureName = Object.keys(feature)[0];
            const featureOptions = feature[featureName].options;

            if (featureName !== "null") {
              return (
                <FeatureSelector
                  variantData={variantData || null}
                  key={index}
                  featureId={index}
                  featureName={featureName}
                  featureList={featureOptions}
                  onSelect={handleFeatureSelect}
                />
              );
            }
          })}
    </div>
  );
};

export default ProductFeatures;
