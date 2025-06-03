import { Link } from "react-router";
import { EmailIcon, PasswordIcon } from "../assets/icons/icons";
import { handleWarning } from "../components/alerts";
import { api } from "../Firebase/api_util";
import { useState } from "react";
import { useNavigate } from "react-router";
// import { FcGoogle as GoogleIcon } from "react-icons/fc"; // Fallback if <feFuncG /> was a typo

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      setUser(user);
      // ✅ Continue login
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
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-white shadow-sm ">
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

          <div className="form-control mb-4 pl-10">
            <label className="label cursor-pointer">
              <input type="checkbox" className="checkbox" />
              <span className="label-text ml-2">Remember me</span>
            </label>
          </div>

          <button
            className="btn btn-primary w-full mb-2"
            onClick={handleEmailLogin}
          >
            Login
          </button>
          <Link
            to="/signup"
            className="btn btn-accent btn-outline-primary w-full mb-2"
          >
            Sign Up
          </Link>

          <div className="divider">OR</div>

          <button
            className="btn btn-outline w-full mb-2"
            onClick={handleGoogleLogin}
          >
            {/* Replace with a proper Google icon component */}
            <span className="text-xl mr-2">G</span>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
