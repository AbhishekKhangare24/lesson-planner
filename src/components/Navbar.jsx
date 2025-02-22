import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold">Lesson Planner</h1>
      {isAuthenticated && (
        <Button onClick={handleLogout} className="bg-red-500 px-4 py-2">
          Logout
        </Button>
      )}
    </nav>
  );
}
