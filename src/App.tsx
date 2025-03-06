import React, { useState } from "react";
import TripForm from "./components/TripForm";
import RouteMap from "./components/RouteMap";
import ELDLogSheet from "./components/ELDLogSheet";

interface TripResponse {
  route_details: {
    legs: Array<{
      from: string;
      to: string;
      distance: number;
      duration: number;
      geometry: string;
    }>;
    total_distance: number;
    total_duration: number;
  };
  log_sheets: Array<{
    date: string;
    grid: string[];
    events: Array<{
      status: string;
      start: string;
      end: string;
      duration: number;
      activity?: string;
    }>;
    totals: {
      driving: number;
      on_duty: number;
      off_duty: number;
      sleeper: number;
    };
  }>;
}

const App: React.FC = () => {
  const [tripData, setTripData] = useState<TripResponse | null>(null);

  const handleTripSubmit = (data: TripResponse) => {
    setTripData(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Route & Log Planner
          </h1>
          <p className="text-gray-600">
            Plan your route and generate ELD logs efficiently
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TripForm onSubmit={handleTripSubmit} />
          </div>
          <div className="space-y-6">
            <RouteMap routeDetails={tripData?.route_details || null} />
            <ELDLogSheet logSheets={tripData?.log_sheets || null} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;