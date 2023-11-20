"use client";
import { useState, useEffect } from "react";
import LocationSearchInput from "./LocationSearchInput";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useRouter } from "next/navigation";
const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
const LIBRARIES = ["places"];
const Map = ({
  onMarkerChange,
  zoom,
  country,
  province,
  canton,
  address1,
  address2,
  handleLat,
  handleLng,
}) => {
  const [latitude, setLatitude] = useState(9.92421981523312);
  const [longitude, setLongitude] = useState(-84.13679786429938);
  const router = useRouter();

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const address = province + "," + canton + "," + address1 + "," + address2;
  //const [address, setAddress] = useState("Costa Rica, Perez Zeledon");

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);

      setLatitude(latLng.lat);
      setLongitude(latLng.lng);
      handleLat(latLng.lat);
      handleLng(latLng.lng);
      //debugger;
      //alert("cargaron", JSON.stringify(latLng));
    } catch (error) {
      console.error("Error al seleccionar la ubicación:", error);
    }
  };
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (latLng) => {
    setSelectedLocation(latLng);
  };
  useEffect(() => {
    handleSelect(address);
    const map = document.getElementById("map");
    console.log("second", map);
    if (map == null) {
      console.log("es nulo", router);
    }
  }, [latitude, handleSelect, address]);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  useEffect(() => {
    // Verifica si la inicialización ya ha ocurrido
    if (!isMapInitialized) {
      handleSelect(address);
      setIsMapInitialized(true);
    }
  }, [isMapInitialized]);

  const handleMapClick = async (event) => {
    const newMarkerPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setLatitude(event.latLng.lat());
    setLongitude(event.latLng.lng());
    handleLat(event.latLng.lat());
    handleLng(event.latLng.lng());
    //alert("direccion", address);
    setMarkerPosition(newMarkerPosition);
    onMarkerChange(newMarkerPosition);
  };
  //handleSelect(address);
  useEffect(() => {
    const mapElement = document.getElementById("map");

    if (mapElement && window.google) {
      const google = window.google;
      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: zoom,
      };

      // Crea un nuevo mapa
      const newMap = new google.maps.Map(mapElement, mapOptions);
      setMap(newMap);
      router.refresh();

      // Añade el marcador si hay una posición
      if (markerPosition) {
        new google.maps.Marker({
          position: markerPosition,
          map: newMap,
        });
      }
    }
  }, [latitude, longitude, zoom, markerPosition]);
  const handleMapLoad = (map) => {
    // Se llama cuando el mapa se carga
    setMap(map);
  };
  return (
    <LoadScript googleMapsApiKey={`${KEY}`} libraries={LIBRARIES}>
      <GoogleMap
        key={router.asPath}
        onLoad={handleMapLoad}
        id="map"
        mapContainerStyle={mapContainerStyle}
        center={{ lat: latitude, lng: longitude } || { lat: 0, lng: 0 }}
        zoom={zoom}
        onClick={handleMapClick}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
