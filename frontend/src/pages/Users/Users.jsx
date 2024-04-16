import "./user.css";
import { useNavigate } from "react-router-dom";
import biguserprofil from "../../assets/svg/biguserprofil.svg";
import favorisheart from "../../assets/svg/favorisheart.svg";
import useUser from "../../contexts/UserContext";

function Users() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="wholepageuser" />
      {user?.role === "admin" ? (
        <div>
          <p className="paragraphe-user-1">
            {" "}
            Bonjour{" "}
            <span className="text-user-information">
              {user?.firstname} {user?.lastname}
            </span>
          </p>
          <p className="paragraphe-user-3">
            {" "}
            Bienvenue dans votre espace Admin
          </p>
          <div className="maxi-flex-user">
            <button
              type="button"
              onClick={() => {
                navigate("/adminModifArtist");
              }}
              className="button-user-favoris"
            >
              <p className="text-user-favoris">GESTION DES ARTISTES</p>
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/adminModifOeuvre");
              }}
              className="button-user-favoris"
            >
              <p className="text-user-favoris">GESTION DES OEUVRES</p>
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/adminListUser");
              }}
              className="button-user-favoris"
            >
              <p className="text-user-favoris">LISTE DES UTILISATEURS</p>
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/information");
              }}
              className="button-user-information"
            >
              <img
                className="biguserprofil"
                src={biguserprofil}
                alt="biguserprofil"
              />
              <p className="text-user-information"> VOS INFORMATIONS</p>
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/favoris");
              }}
              className="button-user-favoris"
            >
              <img
                className="favorisheart"
                src={favorisheart}
                alt="favorisheart"
              />
              <p className="text-user-favoris">VOS FAVORIS</p>
            </button>{" "}
            <button type="button" className="deconnexion-user" onClick={logout}>
              Déconnexion
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="background-user" />
          <p className="paragraphe-user-1">
            {" "}
            Bonjour{" "}
            <span className="text-user-information">
              {user?.firstname} {user?.lastname}
            </span>
          </p>
          <div className="maxi-flex-user">
            <h1 className="h1-user">Votre compte</h1>
            <button
              type="button"
              onClick={() => {
                navigate("/information");
              }}
              className="button-user-information"
            >
              <img
                className="biguserprofil"
                src={biguserprofil}
                alt="biguserprofil"
              />
              <p className="text-user-information"> VOS INFORMATIONS</p>
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/favoris");
              }}
              className="button-user-favoris"
            >
              <img
                className="favorisheart"
                src={favorisheart}
                alt="favorisheart"
              />
              <p className="text-user-favoris">VOS FAVORIS</p>
            </button>{" "}
            <button type="button" className="deconnexion-user" onClick={logout}>
              Déconnexion
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Users;
