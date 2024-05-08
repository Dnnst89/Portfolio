import React, { useState, useEffect } from "react";

const ProvinciaDropdown = ({
  provincias,
  onProvinciaChange,
  disable,
  defaultValue,
  handleProvince,
}) => {
  const [selectedProvince, setSelectedProvince] = useState({
    id: defaultValue || "",
    nombre: "",
  });

  useEffect(() => {
    // Actualizar el estado con el valor por defecto proporcionado
    setSelectedProvince({
      id: defaultValue || "",
      nombre: provincias[defaultValue]?.nombre || "",
    });
  }, [defaultValue, provincias]);

  const handleProvinceChange = (value) => {
    // Actualizar el estado con el nuevo valor seleccionado
    setSelectedProvince({
      id: value,
      nombre: provincias[value]?.nombre || "",
    });

    onProvinciaChange(value);
    handleProvince(value, provincias);
  };

  return (
    <div className="col-span-12 md:col-span-6 grid content-baseline">
      <label>Provincia:</label>
      {!disable ? (
        <select
          className="bg-grey-400 w-full py-2 px-3 border border-gray-300 rounded-md"
          onChange={(e) => handleProvinceChange(e.target.value)}
          disabled={!disable}
          value={selectedProvince.id}
        >
          <option value="">Selecciona una provincia</option>
          {Object.keys(provincias).map((codigo) => (
            <option key={codigo} value={codigo}>
              {provincias[codigo].nombre}
            </option>
          ))}
        </select>
      ) : (
        <select
          className="w-full py-2 px-3 border border-gray-300 rounded-md"
          onChange={(e) => handleProvinceChange(e.target.value)}
          disabled={!disable}
          value={selectedProvince.id}
        >
          <option value="">Selecciona una provincia</option>
          {Object.keys(provincias).map((codigo) => (
            <option key={codigo} value={codigo}>
              {provincias[codigo].nombre}
            </option>
          ))}
        </select>
      )}

      {/* Puedes acceder al ID y al nombre seleccionado */}
    </div>
  );
};

export default ProvinciaDropdown;
