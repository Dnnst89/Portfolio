import React, { useState, useEffect } from "react";

const DistritoDropdown = ({
  provincias,
  provinciaSeleccionada,
  cantonSeleccionado,
  onDistritoChange,
  disable,
  defaultValue,
  handleAddress1,
}) => {
  const [selectedDistrito, setSelectedDistrito] = useState({
    id: defaultValue || "",
    nombre: "",
  });

  useEffect(() => {
    setSelectedDistrito({
      id: defaultValue || "",
      nombre:
        provincias[provinciaSeleccionada]?.cantones[cantonSeleccionado]
          ?.distritos[defaultValue] || "",
    });
  }, []);

  const handleDistritoChange = (value) => {
    const nombreDistrito =
      provincias[provinciaSeleccionada]?.cantones[cantonSeleccionado]
        ?.distritos[value];

    setSelectedDistrito({
      id: value,
      nombre: nombreDistrito || "",
    });

    onDistritoChange(nombreDistrito);
    handleAddress1(value);
  };

  return (
    <div className="col-span-12 md:col-span-6 grid content-baseline">
      <label>Distrito:</label>
      {!disable ? (
        <select
          className="bg-grey-400 w-full py-2 px-3 border border-gray-300 rounded-md"
          onChange={(e) => handleDistritoChange(e.target.value)}
          disabled={!disable}
          value={selectedDistrito.id}
        >
          <option value="">Selecciona un distrito</option>
          {Object.keys(
            provincias[provinciaSeleccionada]?.cantones[cantonSeleccionado]
              ?.distritos || {}
          ).map((codigo) => (
            <option key={codigo} value={codigo}>
              {
                provincias[provinciaSeleccionada]?.cantones[cantonSeleccionado]
                  ?.distritos[codigo]
              }
            </option>
          ))}
        </select>
      ) : (
        <select
          className="w-full py-2 px-3 border border-gray-300 rounded-md"
          onChange={(e) => handleDistritoChange(e.target.value)}
          disabled={!disable}
          value={selectedDistrito.id}
        >
          <option value="">Selecciona un distrito</option>
          {Object.keys(
            provincias[provinciaSeleccionada]?.cantones[cantonSeleccionado]
              ?.distritos || {}
          ).map((codigo) => (
            <option key={codigo} value={codigo}>
              {
                provincias[provinciaSeleccionada]?.cantones[cantonSeleccionado]
                  ?.distritos[codigo]
              }
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default DistritoDropdown;
