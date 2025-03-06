import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility"; // Add this line
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"; // Add this line

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);