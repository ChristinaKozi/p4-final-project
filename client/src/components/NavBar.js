import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import { UserContext } from "../contexts/UserContext";

function NavBar() {
  const {user, setUser} = useContext(UserContext)

  function handleLogoutClick() {
    if (!user) {
      return;
    }
    
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.status === 401) {
        setUser(null);
      } 
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/products_list" className="nav-link">
        Products
      </NavLink>
      <NavLink to="/create_product" className="nav-link">
        Add Product
      </NavLink>
      <NavLink to='/' className="nav-link" onClick={handleLogoutClick}>
          Logout
      </NavLink>
    </nav>
    );
};

export default NavBar;