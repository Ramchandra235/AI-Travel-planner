"use client";

import { useEffect, useState } from "react";
import TripCard from "../components/TripCard";
import TripForm from "../components/TripForm";
import Navbar from "../components/Navbar";

export default function DashboardPage() {
  const [trips, setTrips] = useState([]);

  const [destination, setDestination] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [budgetTier, setBudgetTier] = useState("Medium");
  const [interests, setInterests] = useState("");

  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/trips",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setTrips(data);
      } else {
        setTrips([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createTrip = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/trips",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            destination,
            durationDays: Number(durationDays),
            budgetTier,
            interests: interests
              .split(",")
              .map((item) => item.trim()),
          }),
        }
      );

      if (response.ok) {
        fetchTrips();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const generateAITrip = async () => {
    try {
      setLoading(true);
      setError("");
      setItinerary("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/ai/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            destination,
            durationDays: Number(durationDays),
            budgetTier,
            interests: interests
              .split(",")
              .map((item) => item.trim()),
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.trip?.aiItinerary) {
        setItinerary(data.trip.aiItinerary);
      } else if (data.itinerary) {
        setItinerary(data.itinerary);
      } else {
        setError("Unable to generate itinerary.");
      }

      fetchTrips();
    } catch (error) {
      console.error(error);

      setError(
        "AI is busy. Please try again in a few seconds."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <Navbar />

      <div className="flex justify-between items-center mb-6">
<h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Trips
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-md"
        >
          Logout
        </button>
      </div>

      <TripForm
        destination={destination}
        setDestination={setDestination}
        durationDays={durationDays}
        setDurationDays={setDurationDays}
        budgetTier={budgetTier}
        setBudgetTier={setBudgetTier}
        interests={interests}
        setInterests={setInterests}
        createTrip={createTrip}
      />

      <button
        onClick={generateAITrip}
        disabled={loading}
      className="bg-blue-600 text-white px-5 py-2 rounded-lg mb-6 hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-md"
      >
        {loading
          ? "Generating..."
          : "Generate AI Itinerary"}
      </button>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {itinerary && (
        <div className="border rounded p-4 mb-6">
          <h2 className="text-2xl font-bold mb-3">
            AI Itinerary
          </h2>

          <pre className="whitespace-pre-wrap">
            {itinerary}
          </pre>
        </div>
      )}

      {trips.length === 0 ? (
        <p>No trips found</p>
      ) : (
        trips.map((trip) => (
          <TripCard
            key={trip._id}
            trip={trip}
          />
        ))
      )}
    </div>
  );
}