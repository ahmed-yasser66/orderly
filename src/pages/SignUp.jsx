import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/config";
import { useNavigate } from "react-router";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { EmailIcon, PasswordIcon } from "../assets/icons/icons";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useGoogleAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-white shadow-sm ">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Sign Up</h2>
          <p className="text-sm text-center text-gray-500 mb-4">
            Create your account!
          </p>

          <div className="text-center">
            <div className="form-control mb-3 ">
              <label className="input validator">
                <EmailIcon />
                <input
                  type="email"
                  placeholder="mail@site.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>
            <div className="form-control mb-3">
              <label className="input validator">
                <PasswordIcon />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  minlength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>
            </div>
            <div className="form-control mb-3">
              <label className="input validator">
                <PasswordIcon />
                <input
                  type="password"
                  required
                  placeholder="Confirm Password"
                  minlength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              <p className="validator-hint hidden">Passwords do not match</p>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            className="btn btn-primary w-full mb-2"
            onClick={handleSignUp}
          >
            Sign Up
          </button>

          <div className="divider">OR</div>

          <button className="btn btn-outline w-full mb-2" onClick={login}>
            <span className="text-xl mr-2">G</span>
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}
