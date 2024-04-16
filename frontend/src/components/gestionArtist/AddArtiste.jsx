import { useRef, useState } from "react";
import useAllDataContext from "../../contexts/AllDataContext";
import "./addArtiste.css";

function GestionArtiste() {
  const { showToastError, showToastSuccess } = useAllDataContext();
  const artistName = useRef();
  const name = useRef();
  const firstname = useRef();
  const biography = useRef();
  const thumbnail = useRef();
  const [confirmation, setConfirmation] = useState("");

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append("artist_name", artistName.current.value);
      form.append("lastname", name.current.value);
      form.append("firstname", firstname.current.value);
      form.append("biography", biography.current.value);
      form.append("thumbnail", thumbnail.current.files[0]);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/artists`,
        {
          method: "POST",
          credentials: "include",
          body: form,
        }
      );
      console.info(response.status);
      if (response.status === 201) {
        setConfirmation("Artiste ajouté avec succès !");
        showToastSuccess("Artiste ajouté avec succès !");
      } else {
        console.error("veuillez verifier votre saisie.");
        showToastError("Erreur d'ajout veuillez verifier votre saisie");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="delete_oeuvre">
      <h2 className="titreGestion"> Ajouter un artiste</h2>
      <form className="containerform">
        <div className="champ">
          <label htmlFor="firstname" className="titre_champ">
            Pseudo artiste
          </label>
          <input
            type="text"
            name="firstname"
            ref={artistName}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="firstname" className="titre_champ">
            Nom artiste
          </label>
          <input
            type="text"
            name="firstname"
            ref={name}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="firstname" className="titre_champ">
            Prénom artiste
          </label>
          <input
            type="text"
            name="firstname"
            ref={firstname}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="firstname" className="titre_champ">
            Biography
          </label>
          <input
            type="text"
            name="firstname"
            ref={biography}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="image" className="titreSelecteur">
            Télécharger une image :
          </label>
          <input type="file" accept="image/*" ref={thumbnail} />
        </div>
        <div className="box_connexion">
          <button
            type="button"
            className="boutonEnregistrer"
            onClick={handleSubmit}
          >
            Ajouter
          </button>
        </div>
      </form>
      {confirmation && <p>{confirmation}</p>}
    </div>
  );
}

export default GestionArtiste;
