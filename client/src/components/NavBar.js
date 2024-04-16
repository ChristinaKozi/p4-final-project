import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { Button } from "../styles";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.status == 401) {
        setUser(null);
      }
    });
  }

  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className="nav-link"
        >
        Home
        </NavLink>

        <Button variant="outline" onClick={handleLogoutClick}>
            Logout
        </Button>
    </nav>
    );
};

export default NavBar;