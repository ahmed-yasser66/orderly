
import { Link } from "react-router-dom";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { EmailIcon, PasswordIcon } from "../assets/icons/icons";
export default function Auth() {
  const { login } = useGoogleAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-white shadow-sm ">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Sign in</h2>
          <p className="text-sm text-center text-gray-500 mb-4">
            Please enter your login and password!
          </p>

          <div className="text-center">
            <div className="form-control mb-3 ">
              <label className="input validator">
                <EmailIcon />
                <input type="email" placeholder="mail@site.com" required />
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
          </div>

          <div className="form-control mb-4 pl-10">
            <label className="label cursor-pointer">
              <input type="checkbox" className="checkbox" />
              <span className="label-text ml-2">Remember me</span>
            </label>
          </div>

          <button className="btn btn-primary w-full mb-2">Login</button>
          <Link to="/signup" className="btn btn-accent btn-outline-primary w-full mb-2">
            Sign Up
          </Link>

          <div className="divider">OR</div>

          <button className="btn btn-outline w-full mb-2" onClick={login}>
            {/* Replace with a proper Google icon component */}
            <span className="text-xl mr-2">G</span>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
