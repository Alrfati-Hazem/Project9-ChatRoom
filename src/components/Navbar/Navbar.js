import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(props) {
  const navigate = useNavigate();

  const location = useLocation();

  const showMenu = () => {
    document.querySelector("#links").classList.toggle("active");
  };

  const LogoutHandler = () => {
    localStorage.removeItem("userLoggedIn");
    props.setUserLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <header className="navbar-header">
        <div>
          <Link to={props.userLoggedIn ? "/dashboard" : "/"}>
            <img src="images/logo.svg" alt="logo" />
          </Link>
        </div>
        <div onClick={showMenu} className="menu_bar">
          <i className="fas fa-bars"></i>
        </div>
        <nav>
          <ul className="links" id="links">
            {location.pathname === "/dashboard" ? (
              <li>
                <Link to="/login" onClick={LogoutHandler}>
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li>
                  {" "}
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
