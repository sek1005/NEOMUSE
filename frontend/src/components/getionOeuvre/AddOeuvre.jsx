import { useRef, useState } from "react";
import useAllDataContext from "../../contexts/AllDataContext";
import "./addOeuvre.css";

function GestionOeuvre() {
  const { artworkTechnic, artists, showToastError, showToastSuccess } =
    useAllDataContext();

  const title = useRef();
  const description = useRef();
  const artTheme = useRef();
  const price = useRef();
  const priceondemand = useRef();
  const dimensionHeight = useRef();
  const dimensionWidth = useRef();
  const dimensionDepth = useRef();
  const thumbnail = useRef();
  const artistsid = useRef();
  const artworkTechniqueid = useRef();
  const [confirmation, setConfirmation] = useState("");

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append("title", title.current.value);
      form.append("description", description.current.value);
      form.append("price", price.current.value);
      form.append("price_on_demand", priceondemand.current.value);
      form.append("art_theme", artTheme.current.value);
      form.append("dimension_height", dimensionHeight.current.value);
      form.append("dimension_width", dimensionWidth.current.value);
      form.append("dimension_depth", dimensionDepth.current.value);
      form.append("thumbnail", thumbnail.current.files[0]);
      form.append("artists_id", artistsid.current.value);
      form.append("artwork_technique_id", artworkTechniqueid.current.value);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/artworks`,
        {
          method: "POST",
          credentials: "include",
          body: form,
        }
      );
      console.info(response.status);
      if (response.status === 201) {
        setConfirmation("Œuvre ajoutée avec succès !");
        showToastSuccess("Œuvre ajoutée avec succès !");
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
      <h2 className="titreGestion"> Ajouter une oeuvre</h2>

      <form className="containerform">
        <div className="champ">
          <label htmlFor="firstname" className="titre_champ">
            Titre de l'oeuvre
          </label>
          <input
            type="text"
            name="firstname"
            ref={title}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="firstname" className="titre_champ">
            Thème
          </label>
          <input
            type="text"
            name="firstname"
            ref={artTheme}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="firstname" className="titre_champ">
            Prix
          </label>
          <input
            type="text"
            name="firstname"
            ref={price}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="firstname" className="titre_champ">
            Hauteur
          </label>
          <input
            type="text"
            name="firstname"
            ref={dimensionHeight}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="firstname" className="titre_champ">
            Largeur
          </label>
          <input
            type="text"
            name="firstname"
            ref={dimensionWidth}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="firstname" className="titre_champ">
            Profondeur
          </label>
          <input
            type="text"
            name="firstname"
            ref={dimensionDepth}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="firstname" className="titre_champ">
            Description
          </label>
          <textarea
            type="text"
            name="firstname"
            ref={description}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="firstname" className="titre_champ">
            price on demand
          </label>
          <textarea
            type="text"
            name="firstname"
            ref={priceondemand}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="image" className="titreSelecteur">
            Télécharger une image :
          </label>
          <input type="file" accept="image/*" ref={thumbnail} />
        </div>
        <div className="champ">
          <label htmlFor="artists_id" className="titreSelecteur">
            Sélectionner la technique:
          </label>
          <select ref={artworkTechniqueid} required>
            {artworkTechnic.map((technique) => (
              <option
                key={technique.artwork_technique_id}
                value={technique.artwork_technique_id}
              >
                {technique.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="artists_id" className="titreSelecteur">
            Sélectionner l'artiste :
          </label>
          <select ref={artistsid} required>
            {artists.map((artiste) => (
              <option key={artiste.artist_id} value={artiste.artist_id}>
                {artiste.firstname} {artiste.lastname}
              </option>
            ))}
          </select>
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

export default GestionOeuvre;
