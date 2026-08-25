import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>🍔 Foodie</h2>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;