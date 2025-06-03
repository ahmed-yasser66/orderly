const Navbar = () => {
  return (
    <div className="navbar bg-base-100 text-base-content shadow-sm rounded-b-xl px-6 py-4">
      <div className="flex-1">
        <a className="text-xl font-bold text-base-content hover:text-secondary">ORDERLY</a>
      </div>
      <div className="flex gap-4">
        <a className="btn btn-ghost text-base-content hover:text-secondary">Home</a>
        <a className="btn btn-ghost text-base-content hover:text-secondary">About</a>
        <a className="btn btn-ghost text-base-content hover:text-secondary">Contact</a>
      </div>
    </div>
  );
};

export default Navbar;



//*! Sign in page , Sign up Page , Home Page, Routing
//*! Authentication with Firebase, Space Creation, Space Joining, History, 