import { useState } from "react";
import useAllDataContext from "../../contexts/AllDataContext";
import "./modifArtist.css";
/* eslint-disable camelcase */
function ModifArtist({ artist, onClose }) {
  const [artist_name, setArtist_name] = useState(artist?.artist_name);
  const [firstname, setFirstname] = useState(artist?.firstname);
  const [lastname, setLastname] = useState(artist?.lastname);
  const [biography, setBiography] = useState(artist?.biography);

  const { showToastError, showToastSuccess } = useAllDataContext();
  const handleModify = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/artists/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            artist_name,
            firstname,
            lastname,
            biography,
          }),
        }
      );
      console.info(response.status);
      if (response.status === 204) {
        onClose();
        showToastSuccess("Modification reussie");
      } else {
        console.error("Échec de la modification de l'artiste");
        showToastError("Échec de la modification de l'artiste");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <p>
        {" "}
        Voulez- vous modifier l'artiste{" "}
        <span className="text-user-information"> {artist?.artist_name} ? </span>
      </p>
      <form className="containerform">
        <div className="champ">
          <label htmlFor="artist_name" className="titre_champ">
            Pseudo
          </label>
          <input
            type="text"
            name="artist_name"
            value={artist_name}
            onChange={(e) => {
              setArtist_name(e.target.value);
            }}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="firstname" className="titre_champ">
            Nom
          </label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="lastname" className="titre_champ">
            Prénoms
          </label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="biography" className="titre_champ">
            Biographie
          </label>
          <textarea
            type="text"
            name="biography"
            value={biography}
            onChange={(e) => {
              setBiography(e.target.value);
            }}
            className="input_login"
          />
        </div>
        <button
          type="button"
          className="boutModifaRT"
          onClick={() => handleModify(artist?.artist_id)}
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}
/* eslint-disable camelcase */

export default ModifArtist;
