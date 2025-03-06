import React, { useState, FormEvent } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

interface TripFormData {
  current_location: string;
  pickup_location: string;
  dropoff_location: string;
  current_cycle_used: number;
}

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

interface TripFormProps {
  onSubmit: (data: TripResponse) => void;
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<TripFormData>({
    current_location: "",
    pickup_location: "",
    dropoff_location: "",
    current_cycle_used: 0,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "current_cycle_used" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post<TripResponse>(
        "https://spotter-backend-test.onrender.com/api/plan-trip/",
        formData
      );
      onSubmit(response.data);
    } catch (err) {
      setError("Failed to calculate route. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Plan Your Route
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Current Location</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              name="current_location"
              value={formData.current_location}
              onChange={handleChange}
              placeholder="Enter location..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Pickup Location</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              name="pickup_location"
              value={formData.pickup_location}
              onChange={handleChange}
              placeholder="Enter location..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Dropoff Location</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              name="dropoff_location"
              value={formData.dropoff_location}
              onChange={handleChange}
              placeholder="Enter location..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Current Cycle Used (Hours)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaClock className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="number"
              name="current_cycle_used"
              value={formData.current_cycle_used}
              onChange={handleChange}
              placeholder="Enter hours..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="70"
              step="0.1"
              required
            />
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="custom-button"
        >
          Calculate Route
        </button>
      </form>
    </div>
  );
};

export default TripForm;