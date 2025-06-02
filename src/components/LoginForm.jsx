// LoginForm.jsx
import { useState } from "react";
import { Link } from "react-router";
import { auth } from "../Firebase/config";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Remember Me: Choose persistence
      const persistence = rememberMe
        ? "local" // stays signed in even after browser restart
        : "session"; // signed out on tab/browser close

      // Set persistence before login
      const {
        browserLocalPersistence,
        browserSessionPersistence,
        setPersistence,
      } = await import("firebase/auth");

      await setPersistence(
        auth,
        persistence === "local"
          ? browserLocalPersistence
          : browserSessionPersistence
      );

      // Login
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <form onSubmit={handleLogin} className="max-w-sm mx-auto p-4 space-y-4">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Login
        </h1>

        {error && <div className="text-red-500">{error}</div>}
        <div className="flex items-center border rounded px-2 py-1">
          <input
            className="flex-1 outline-none"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center border rounded px-2 py-1">
          <input
            className="flex-1 outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
        <div className="text-sm text-center">
          Don't have an account?{" "}
          <Link to={"signup"} className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </section>
  );
}
