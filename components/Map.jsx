"use client";
import { useState, useEffect } from "react";
import LocationSearchInput from "./LocationSearchInput";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
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

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  const [markerPosition, setMarkerPosition] = useState(null);
  const add = province + "," + canton + "," + address1 + "," + address2;
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
    //  handleSelect(address);
  }, [latitude]);

  const handleMapClick = async (event) => {
    const newMarkerPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    //alert("direccion", address);
    setMarkerPosition(newMarkerPosition);
    onMarkerChange(newMarkerPosition);
  };
  //handleSelect(address);

  return (
    <LoadScript googleMapsApiKey={`${KEY}`} libraries={LIBRARIES}>
      <LocationSearchInput onLocationSelect={handleLocationSelect} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selectedLocation || { lat: 0, lng: 0 }}
        zoom={zoom}
        onClick={handleMapClick}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
