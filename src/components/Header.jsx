import "../assets/css/header.css";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div>
              <Link className="nav-link logo" to="/">
                🌿 EarthLove
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ms-auto mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link navLink" to="/products">
                    Prodotti
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link navLink" to="/brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link navLink" to="/categories">
                    Categorie
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
