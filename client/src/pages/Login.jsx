import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:8001/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      navigate("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl mb-4 font-bold">Admin Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input type="text" placeholder="Username" className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="input mt-3" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn btn-primary mt-4 w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
