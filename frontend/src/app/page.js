export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        AI Travel Planner
      </h1>

      <a
        href="/register"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register
      </a>

      <a
        href="/login"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Login
      </a>

      <a
        href="/dashboard"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Dashboard
      </a>
    </div>
  );
}