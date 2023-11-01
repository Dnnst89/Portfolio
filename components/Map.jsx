"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
const Map = ({ latitude, longitude, zoom }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  return (
    <LoadScript googleMapsApiKey={`${KEY}`}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: latitude, lng: longitude }}
        zoom={zoom}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
