// File: src/App.js
import React, { useState } from "react";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isRegister, setIsRegister] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [focusedInput, setFocusedInput] = useState("");

  const BACKEND_URL = "http://localhost:5000"; // <-- your backend URL

  // 🔹 REGISTER
  async function register(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (data.message) {
        alert("Registered successfully. Please login.");
        setIsRegister(false);
      } else {
        alert("Registration failed: " + (data.error || JSON.stringify(data)));
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed due to network error");
    }
  }

  // 🔹 LOGIN
  async function login(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log("Login response:", data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        alert("Login failed: " + (data.message || JSON.stringify(data)));
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed due to network error");
    }
  }

  // 🔹 LOGOUT
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  // 🔹 DASHBOARD
  async function getDashboard() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
      } else {
        alert("Failed to get dashboard: " + (data.message || JSON.stringify(data)));
      }
    } catch (err) {
      console.error("Dashboard error:", err);
      alert("Failed to get dashboard due to network error");
    }
  }

  // 🔹 PROFILE
  async function getProfile() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        alert(JSON.stringify(data, null, 2));
      } else {
        alert("Failed to fetch profile: " + (data.message || JSON.stringify(data)));
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      alert("Error fetching profile: check backend or network");
    }
  }

  const inputFocusStyle = {
    borderWidth: "2px",
    borderStyle: "solid",
    outline: "none",
  };

  // 👉 LOGIN / REGISTER PAGE
  if (!token) {
    return (
      <div style={styles.page}>
        <form style={styles.card} onSubmit={isRegister ? register : login}>
          <h2 style={{ marginBottom: "20px" }}>{isRegister ? "Register" : "Login"}</h2>

          {isRegister && (
            <input
              style={{
                ...styles.input,
                ...(focusedInput === "username" && {
                  ...inputFocusStyle,
                  borderImageSource: "linear-gradient(45deg, #ff416c, #ff4b2b)",
                  borderImageSlice: 1,
                }),
              }}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocusedInput("username")}
              onBlur={() => setFocusedInput("")}
            />
          )}

          <input
            style={{
              ...styles.input,
              ...(focusedInput === "email" && {
                ...inputFocusStyle,
                borderImageSource: "linear-gradient(45deg, #1fa2ff, #12d8fa, #a6ffcb)",
                borderImageSlice: 1,
              }),
            }}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput("")}
          />

          <input
            style={{
              ...styles.input,
              ...(focusedInput === "password" && {
                ...inputFocusStyle,
                borderImageSource: "linear-gradient(45deg, #f7971e, #ffd200)",
                borderImageSlice: 1,
              }),
            }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput("")}
          />

          <button style={styles.btn}>{isRegister ? "Register" : "Login"}</button>

          <p style={styles.link} onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Already have an account? Login" : "No account? Register"}
          </p>
        </form>
      </div>
    );
  }

  // 👉 DASHBOARD PAGE
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

        <button style={styles.btn} onClick={getDashboard}>
          Get Dashboard
        </button>

        <button style={styles.btn} onClick={getProfile}>
          Get Profile
        </button>

        <button
          style={{ ...styles.btn, background: "linear-gradient(45deg, #ff416c, #ff4b2b)" }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e0eafc, #cfdef3)",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    width: "360px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    textAlign: "center",
    border: "4px solid",
    borderImageSlice: 1,
    borderImageSource: "linear-gradient(45deg, #6a11cb, #2575fc)",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    borderRadius: "10px",
    border: "2px solid transparent",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    backgroundClip: "padding-box",
    fontSize: "14px",
  },
  btn: {
    width: "100%",
    padding: "12px",
    marginTop: "16px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(45deg, #6a11cb, #2575fc)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "transform 0.2s ease",
  },
  link: {
    marginTop: "14px",
    color: "#6a11cb",
    cursor: "pointer",
    fontSize: "14px",
  },
};
