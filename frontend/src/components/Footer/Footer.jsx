import "./footer.css";
import { Link } from "react-router-dom";
import logoinstagram from "../../assets/svg/logoinstagram.svg";
import logopinterest from "../../assets/svg/logopinterest.svg";
import logoyoutube from "../../assets/svg/logoyoutube.svg";

function Footer() {
  return (
    <footer>
      <div className="footer_1">
        <Link to="/about" className="footer_1_1">
          A propos de nous
        </Link>
        <Link to="/contact" className="footer_1_2">
          Nous contacter
        </Link>
        <Link to="/artists" className="footer_1_3">
          Nos artistes
        </Link>
      </div>
      <div className="footer_2">
        <Link to="/data" className="footer_2_1">
          Données personnelles et mention légales
        </Link>
        <Link to="/users" className="footer_2_2">
          Mon compte
        </Link>
        <p className="footer_2_3"> +33130394834</p>
      </div>
      <div className="footer_3">
        <p className="footer_3_1">Suivez-nous !</p>
        <div className="footer_3_2">
          <ul className="social_icon">
            <li>
              <Link to="https://instagram.com">
                <img
                  className="logoinstagram"
                  src={logoinstagram}
                  alt="Instagram"
                />
              </Link>
            </li>
            <li>
              <Link to="https://pinterest.com">
                <img
                  className="logopinterest"
                  src={logopinterest}
                  alt="pinterest"
                />
              </Link>
            </li>
            <li>
              <Link to="https://youtube.com">
                <img
                  className="logoyoutube"
                  src={logoyoutube}
                  alt="pinterest"
                />
              </Link>
            </li>
          </ul>
        </div>
        <p>© 2023 Neo Muse</p>
      </div>
    </footer>
  );
}

export default Footer;
