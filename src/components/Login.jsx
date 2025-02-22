import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "demouser" && password === "demopass") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/lesson-planner", { replace: true });
    } else {
      setError("Invalid credentials. Try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Login to Lesson Planner</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3"
        />
        <Button onClick={handleLogin} className="w-full bg-blue-600 text-white">
          Login
        </Button>
      </Card>
    </div>
  );
}
