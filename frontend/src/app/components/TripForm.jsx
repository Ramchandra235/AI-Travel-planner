export default function TripForm({
  destination,
  setDestination,
  durationDays,
  setDurationDays,
  budgetTier,
  setBudgetTier,
  interests,
  setInterests,
  createTrip,
}) {
  return (
    <form
      onSubmit={createTrip}
      className="border p-4 rounded mb-6"
    >
      <h2 className="text-xl font-bold mb-3">
        Create Trip
      </h2>

      <input
        type="text"
        placeholder="Destination"
        className="border p-2 w-full mb-2"
        value={destination}
        onChange={(e) =>
          setDestination(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Days"
        className="border p-2 w-full mb-2"
        value={durationDays}
        onChange={(e) =>
          setDurationDays(e.target.value)
        }
      />

      <select
        className="border p-2 w-full mb-2"
        value={budgetTier}
        onChange={(e) =>
          setBudgetTier(e.target.value)
        }
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="text"
        placeholder="Food,Culture,Shopping"
        className="border p-2 w-full mb-2"
        value={interests}
        onChange={(e) =>
          setInterests(e.target.value)
        }
      />

      <button
        type="submit"
        className="bg-black text-white p-2 w-full"
      >
        Create Trip
      </button>
    </form>
  );
}