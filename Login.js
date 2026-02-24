import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // ✅ sync autofill values with state
  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.value) {
        setForm((prev) => ({
          ...prev,
          [input.name]: input.value,
        }));
      }
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password || (isSignup && !form.name)) {
      alert("Please fill all fields");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    // ✅ SIGNUP
    if (isSignup) {
      if (savedUser && savedUser.email === form.email) {
        alert("User already exists. Please login.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(form));
      alert("Signup successful! Please login.");

      setIsSignup(false);
      setForm({ name: "", email: "", password: "" });
      return;
    }

    // ✅ LOGIN
    if (!savedUser) {
      alert("No account found. Please signup.");
      return;
    }

    if (
      form.email === savedUser.email &&
      form.password === savedUser.password
    ) {
      localStorage.setItem("loggedIn", "true");
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{isSignup ? "Signup" : "Login to AlgoMonitor"}</h2>

        <form onSubmit={handleSubmit} autoComplete="on">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit">
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          {isSignup ? "Already have an account?" : "New user?"}
          <span
            onClick={() => {
              setIsSignup(!isSignup);
              setForm({ name: "", email: "", password: "" });
            }}
            style={{
              color: "#2563eb",
              cursor: "pointer",
              marginLeft: "8px",
              fontWeight: "bold",
            }}
          >
            {isSignup ? "Login" : "Signup"}
          </span>
        </p>
      </div>
    </div>
  );
}