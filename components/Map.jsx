"use client";
import { useState, useEffect } from "react";
import LocationSearchInput from "./LocationSearchInput";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

const Map = ({ onMarkerChange, latitude, longitude, zoom }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapClick = (event) => {
    const newMarkerPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(newMarkerPosition);
    onMarkerChange(newMarkerPosition);
  };
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (latLng) => {
    setSelectedLocation(latLng);
    //alert("ss", selectedLocation);
  };

  return (
    <LoadScript googleMapsApiKey={`${KEY}`} libraries={["places"]}>
      <LocationSearchInput onLocationSelect={handleLocationSelect} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ selectedLocation } || { lat: latitude, lng: longitude }}
        zoom={zoom}
        onClick={handleMapClick}
      >
        {markerPosition && <Marker position={markerPosition} />}
        <Marker position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
