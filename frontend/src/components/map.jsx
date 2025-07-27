"use client";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
};

const Map = ({ initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPosition(([lat, lng]) => [
  //       lat + Math.random() * 0.0005,
  //       lng + Math.random() * 0.0005,
  //     ]);
  //   }, 2000);
  //
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <MapContainer
      style={{ height: "100vh", width: "100%" }}
      center={position}
      zoom={20}
      scrollWheelZoom={false}
    >
      <MapUpdater position={position} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Simulated vehicle position. <br /> Updating every 2 seconds.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
