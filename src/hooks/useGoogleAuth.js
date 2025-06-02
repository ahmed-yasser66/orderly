// src/hooks/useGoogleAuth.js
import { useState } from "react";
import { signInWithGoogle } from "../Firebase/config";

export default function useGoogleAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async () => {
    try {
      const result = await signInWithGoogle();
      const userData = result.user;
      setUser(userData);
      console.log("Logged in user:", userData);
    } catch (err) {
      console.error("Google login error:", err);
      setError(err);
    }
  };

  return { user, error, login };
}
