import { useState } from "react";
import useAllDataContext from "../../contexts/AllDataContext";
import "./modifOeuvre.css";
/* eslint-disable camelcase */
function ModifOeuvre({ oeuvre, onClose }) {
  const [title, setTitle] = useState(oeuvre?.title);
  const [description, setDescription] = useState(oeuvre?.description);
  const [art_theme, setArt_theme] = useState(oeuvre?.art_theme);
  const [price, setPrice] = useState(oeuvre?.price);
  const [dimension_height, setDimension_height] = useState(
    oeuvre?.dimension_height
  );
  const [dimension_width, setDimension_width] = useState(
    oeuvre?.dimension_width
  );
  const [dimension_depth, setDimension_depth] = useState(
    oeuvre?.dimension_depth
  );

  const { showToastError, showToastSuccess } = useAllDataContext();

  const handleModify = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/artworks/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            art_theme,
            price,
            dimension_height,
            dimension_width,
            dimension_depth,
          }),
        }
      );
      console.info(response.status);
      if (response.status === 204) {
        onClose();
        showToastSuccess("Modification reussie");
      } else {
        console.error("Échec de la modification de l'œuvre");
        showToastError("Échec de la modification de l'œuvre");
      }
    } catch (error) {
      console.error(error);
      showToastError(
        "Une erreur inattendue s'est produite lors de la modification de l'œuvre."
      );
    }
  };
  return (
    <div>
      <p>
        {" "}
        Voulez- vous modifier l'oeuvre{" "}
        <span className="text-user-information">{oeuvre?.title} ?</span>
      </p>
      <form className="containerform">
        <div className="champ">
          <label htmlFor="title" className="titre_champ">
            Titre de l'oeuvre
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="art_theme" className="titre_champ">
            Thème
          </label>
          <input
            type="text"
            name="art_theme"
            value={art_theme}
            onChange={(e) => {
              setArt_theme(e.target.value);
            }}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="price" className="titre_champ">
            Prix
          </label>
          <input
            type="text"
            name="price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="dimension_height" className="titre_champ">
            Hauteur
          </label>
          <input
            type="text"
            name="dimension_height"
            value={dimension_height}
            onChange={(e) => {
              setDimension_height(e.target.value);
            }}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="dimension_width" className="titre_champ">
            Largeur
          </label>
          <input
            type="text"
            name="dimension_width"
            value={dimension_width}
            onChange={(e) => {
              setDimension_width(e.target.value);
            }}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="dimension_depth" className="titre_champ">
            Profondeur
          </label>
          <input
            type="text"
            name="dimension_depth"
            value={dimension_depth}
            onChange={(e) => {
              setDimension_depth(e.target.value);
            }}
            className="input_login"
          />
        </div>
        <div className="champ">
          <label htmlFor="description" className="titre_champ">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="input_login"
          />
        </div>
      </form>
      <div className="">
        <button
          type="button"
          className="boutModif"
          onClick={() => handleModify(oeuvre?.artworks_id)}
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}
/* eslint-disable camelcase */
export default ModifOeuvre;
