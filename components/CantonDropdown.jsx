import React, { useState, useEffect } from "react";

const CantonDropdown = ({
  provincias,
  provinciaSeleccionada,
  onCantonChange,
  disable,
  defaultValue,
  handleCanton,
}) => {
  const [selectedCanton, setSelectedCanton] = useState({
    id: defaultValue || "",
    nombre: "",
  });

  useEffect(() => {
    const cantonDefault = defaultValue || "";
    setSelectedCanton({
      id: cantonDefault,
      nombre:
        provincias[provinciaSeleccionada]?.cantones[cantonDefault]?.nombre ||
        "",
    });
  }, [provincias]);

  const handleCantonChange = (value) => {
    const nombre =
      provincias[provinciaSeleccionada]?.cantones[value]?.nombre || "";
    setSelectedCanton({
      id: value,
      nombre: nombre,
    });
    onCantonChange(value);
    handleCanton(nombre);
  };

  return (
    <div className="col-span-12 md:col-span-6 grid content-baseline">
      <label>Canton:</label>

      {!disable ? (
        <select
          className="bg-grey-400 w-full py-2 px-3 border border-gray-300 rounded-md"
          onChange={(e) => handleCantonChange(e.target.value)}
          disabled={!disable}
          value={selectedCanton.id}
        >
          <option value="">Selecciona un canton</option>
          {Object.keys(provincias[provinciaSeleccionada]?.cantones || {}).map(
            (codigo) => (
              <option key={codigo} value={codigo}>
                {provincias[provinciaSeleccionada]?.cantones[codigo].nombre}
              </option>
            )
          )}
        </select>
      ) : (
        <select
          className=" w-full py-2 px-3 border border-gray-300 rounded-md"
          onChange={(e) => handleCantonChange(e.target.value)}
          disabled={!disable}
          value={selectedCanton.id}
        >
          <option value="">Selecciona un canton</option>
          {Object.keys(provincias[provinciaSeleccionada]?.cantones || {}).map(
            (codigo) => (
              <option key={codigo} value={codigo}>
                {provincias[provinciaSeleccionada]?.cantones[codigo].nombre}
              </option>
            )
          )}
        </select>
      )}
    </div>
  );
};

export default CantonDropdown;
