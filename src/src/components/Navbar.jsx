import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-100 text-base-content shadow-sm rounded-b-xl px-6 py-4 relative z-10">
      <div className="flex-1">
        <a className="text-xl font-bold text-base-content hover:text-secondary cursor-pointer">
          ORDERLY
        </a>
      </div>
      <div className="flex gap-4">
        <Link to="/home" className="btn btn-ghost text-base-content hover:text-secondary">
          Home
        </Link>
        <Link to="/about-us" className="btn btn-ghost text-base-content hover:text-secondary">
          About
        </Link>
        <Link to="/contact-us" className="btn btn-ghost text-base-content hover:text-secondary">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
