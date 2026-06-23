"use client";

export default function TripCard({ trip }) {
  const deleteTrip = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/trips/${trip._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
<div className="bg-white rounded-xl p-5 shadow-lg mb-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
<h2 className="text-2xl font-bold text-blue-600">
        {trip.destination}
      </h2>

      <p className="mt-2 text-black">
        Days: {trip.durationDays}
      </p>

      <p className="mt-2 text-black">
        Budget: {trip.budgetTier}
      </p>

      <p className="mt-2 text-black">
        Interests: {trip.interests?.join(", ")}
      </p>

      <button
        onClick={deleteTrip}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete Trip
      </button>
    </div>
  );
}