import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">AI-Powered Lesson Planner</h1>
      <Link
        to="/lesson-planner"
        className="bg-blue-500 text-white px-6 py-3 rounded"
      >
        Start Planning
      </Link>
    </div>
  );
}
