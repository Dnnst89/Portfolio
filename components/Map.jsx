"use client";
import { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { requestEstimation, createFakeData } from "@/api/moovin/estimation";
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
  const router = useRouter();

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

    /*
    const shipmentInfo = createFakeData(
      newMarkerPosition.lat,
      newMarkerPosition.lng
    ); 
     const estimation = await requestEstimation(shipmentInfo);
    alert("direccion", estimation);
    */
    setLatitude(event.latLng.lat());
    setLongitude(event.latLng.lng());
    handleLat(event.latLng.lat());
    handleLng(event.latLng.lng());

    setMarkerPosition(newMarkerPosition);
    onMarkerChange(newMarkerPosition);
  };

  const [map, setMap] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: KEY,
    libraries: ["places"],
  });

  const handleMapLoad = (map) => {
    mapRef.current = map;
    setMap(map);
  };
  if (address !== undefined || address !== null) {
    handleSelect(address);
  }

  useEffect(() => {
    if (address !== undefined || address !== null) {
      handleSelect(address);
    }
    return () => {
      // Destruir el mapa si es necesario
      mapRef.current = null; // Si necesitas resetear la referencia del mapa
    };
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={{ lat: latitude, lng: longitude }}
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
