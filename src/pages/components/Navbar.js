import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav className="navbar fixed-top navbar-expand navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">
          &nbsp;Internship Management Portal
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/Login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/Signup"} className="nav-link">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/AdminLogin"} className="nav-link">
              AdminLogin
            </Link>
          </li>
        </div>
      </nav>
    )
}

export default Navbar;