"use client";
import { useState, useEffect, useRef } from "react";
import LocationSearchInput from "./LocationSearchInput";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
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

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

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
  handleSelect(address);


  const [map, setMap] = useState(null);
  const mapRef = useRef(null);


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: KEY,
    libraries: ['places'],
  });

  const handleMapLoad = (map) => {
    mapRef.current = map;
    setMap(map);
  };


  useEffect(() => {
    return () => {
      // Destruir el mapa si es necesario
      mapRef.current = null; // Si necesitas resetear la referencia del mapa

    }
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={{ lat: latitude, lng: longitude } || { lat: 0, lng: 0 }}
      zoom={zoom}
      onLoad={handleMapLoad}
      onClick={handleMapClick}
    >
      {/* Marcadores u otros elementos en el mapa */}
      {map && markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  ) : null;
};

export default Map;
