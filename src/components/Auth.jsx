// src/components/Auth.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../Firebase/api_util"; // Your API layer
import { EmailIcon, PasswordIcon } from "../assets/icons/icons";
import { handleWarning } from "./alerts";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../features/slices/adminReducer";
// import { FcGoogle as GoogleIcon } from "react-icons/fc"; // Fallback if <feFuncG /> was a typo

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  console.log(admin);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await api.auth.login(email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        // 👇 Show warning and sign out
        handleWarning();
        await api.auth.signOut(); // Prevent access
        return;
      }

      // ✅ Continue login
      dispatch(setAdmin({ id: user.uid }));

      navigate("/home"); // or your home page
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Invalid email or password.");
          break;
        default:
          setError(err.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await api.auth.loginWithGoogle();
      const user = result.user;
      setUser(user);
      console.log(user);
      dispatch(setAdmin({ id: user.uid }));

      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <form
        className="card w-full max-w-md bg-white shadow-xl"
        onSubmit={handleEmailLogin}
      >
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Sign in</h2>
          <p className="text-sm text-center text-gray-500 mb-4">
            Please enter your login and password!
          </p>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="form-control mb-3 text-center">
            <label className="input validator">
              <EmailIcon />
              <input
                type="email"
                placeholder="mail@site.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div className="form-control mb-3 text-center">
            <label className="input validator">
              <PasswordIcon />
              <input
                type="password"
                required
                placeholder="Password"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <div className="form-control mb-4">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="label-text ml-2">Remember password</span>
            </label>
          </div>

          <button className="btn btn-primary w-full mb-2" type="submit">
            Login
          </button>

          <button
            type="button"
            className="btn btn-accent btn-outline-primary w-full mb-2"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>

          <div className="divider">OR</div>

          <button
            type="button"
            className="btn btn-outline w-full mb-2"
            onClick={handleGoogleLogin}
          >
            {/* <GoogleIcon className="text-xl mr-2" /> */}
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
}
