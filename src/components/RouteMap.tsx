import React from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";

interface RouteMapProps {
  routeDetails: {
    legs: Array<{
      from: string;
      to: string;
      distance: number;
      duration: number;
      geometry: string;
    }>;
    total_distance: number;
    total_duration: number;
  } | null;
}

const RouteMap: React.FC<RouteMapProps> = ({ routeDetails }) => {
  if (!routeDetails || !routeDetails.legs.length) {
    return (
      <div className="card-container flex items-center justify-center">
        <p className="text-gray-500">Map will appear here</p>
      </div>
    );
  }

  const polylines: [number, number][][] = routeDetails.legs.map((leg) =>
    polyline.decode(leg.geometry)
  );
  const allCoords = polylines.flat();

  // Dynamic center based on the first and last coordinates
  const center: [number, number] =
    allCoords.length > 0
      ? [
          (allCoords[0][0] + allCoords[allCoords.length - 1][0]) / 2,
          (allCoords[0][1] + allCoords[allCoords.length - 1][1]) / 2,
        ]
      : [51.505, -0.09]; 

  return (
    <div className="card-container">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Route Map</h2>
      <div className="map-container">
        <MapContainer
          bounds={allCoords.length > 0 ? allCoords : undefined}
          center={center}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {polylines.map((polyline, idx) => (
            <Polyline key={idx} positions={polyline} color="blue" />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default RouteMap;