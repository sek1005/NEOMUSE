import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import useUser from "../../contexts/UserContext";
import "./navbar.css";
import logouser from "../../assets/images/userprofil.png";
import logoneomuse from "../../assets/images/logoneomuse.png";

function MyNavbar() {
  const { user } = useUser();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <nav>
      <div className="hamburger-menu">
        <label className="menu__btn" htmlFor="menu__toggle">
          <span />
          <input
            id="menu__toggle"
            type="checkbox"
            checked={isMenuOpen}
            onChange={handleMenuClick}
          />
        </label>
        <div
          className={`menu__box ${isMenuOpen ? "menu-open" : "true"}`}
          onClick={closeMenu}
          onKeyDown={closeMenu}
          tabIndex="0"
          role="button"
        >
          <button type="button" className="close-btn" onClick={closeMenu}>
            ×
          </button>
          <li>
            <Link to="/artists" className="menu__item">
              Artistes
            </Link>
          </li>
          <li>
            <Link to="/artworks" className="menu__item">
              Collections
            </Link>
          </li>
          <li>
            <Link to="/about" className="menu__item">
              A propos
            </Link>
          </li>
          <li>
            <Link to="/contact" className="menu__item">
              Contact
            </Link>
          </li>
          {!user ? (
            <li>
              <Link to="/login" className="menu__item">
                Connexion
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/users" className="menu__item">
                Mon compte
              </Link>
            </li>
          )}
        </div>
      </div>
      <Link to="/" className="navbar-brand">
        <img className="logoneomuse" src={logoneomuse} alt="logo-neomuse" />
      </Link>
      <div className="div-nav-not-burger">
        <Link className="div-nav-artistes" to="/artists">
          ARTISTES
        </Link>
        <Link className="div-nav-collections" to="/artworks">
          COLLECTIONS
        </Link>
        <Link className="div-nav-about" to="/about">
          A PROPOS
        </Link>
        <Link className="div-nav-contact" to="/contact">
          CONTACT
        </Link>
      </div>
      <div className="div-nav-user">
        {!user ? (
          <Link to="/login" className="div-user-compte">
            <img className="logouser" src={logouser} alt="logouser" />
            <p>Connexion</p>
          </Link>
        ) : (
          <Link to="/users" className="icon">
            <Icon
              icon="mdi:account-check-outline"
              color="#87255b"
              width="40"
              height="40"
            />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default MyNavbar;
