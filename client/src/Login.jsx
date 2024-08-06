import React, { useState, useEffect } from "react";
import axios from "./axiosConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [message, setMessage] = useState("");

  // Fetch the CSRF token by hitting an endpoint that sets the cookie
  const fetchCsrfToken = async () => {
    await fetch("http://localhost:8000/", { credentials: "include" });
  };

  useEffect(() => {
    const getCsrfToken = () => {
      const name = "XSRF-TOKEN=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookies = decodedCookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name)) {
          return cookie.substring(name.length);
        }
      }
      return "";
    };

    setCsrfToken(getCsrfToken());
  });

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
        _csrf: csrfToken, // Include CSRF token in the request
      }, {
        headers: {
          'X-CSRF-Token': csrfToken // Set CSRF token header
        }
      });
      setMessage(response.data);
    } catch (error) {
      setMessage(
        "Login failed: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input type="hidden" name="_csrf" value={csrfToken} /> {/* Hidden CSRF token field */}
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
