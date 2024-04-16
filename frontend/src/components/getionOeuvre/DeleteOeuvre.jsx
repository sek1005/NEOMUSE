import { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import useAllDataContext from "../../contexts/AllDataContext";
import "./deleteOeuvre.css";
import ModifOeuvre from "./ModifOeuvre";

function DeleteOeuvre() {
  const [openconfirmdelete, setOpenconfirmdelete] = useState(false);
  const [selectedOeuvre, setSelectedOeuvre] = useState(null);
  const createconfirmdelete = (oeuvre) => {
    setSelectedOeuvre(oeuvre);
    setOpenconfirmdelete(true);
  };
  const [openModify, setOpenModify] = useState(false);
  const createmodify = (oeuvre) => {
    setSelectedOeuvre(oeuvre);
    setOpenModify(true);
  };
  const { artworks, setArtworks, showToastError, showToastSuccess } =
    useAllDataContext();
  const handledelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/artworks/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.info(response.status);
      if (response.status === 204) {
        setArtworks(artworks.filter((artwork) => artwork.artworks_id !== id));
        setOpenconfirmdelete(false);
        showToastSuccess("supression reusie");
      } else {
        console.error("Échec de la suppression de l'œuvre");
        showToastError("Échec de la suppression de l'œuvre");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="delete_oeuvre">
      <p className="titreGestion">Supprimer ou modifier une oeuvre</p>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Thème</th>
            <th>Date de creation</th>
            <th>prix</th>
            <th>Dimension_height</th>
            <th>Dimension_width</th>
            <th>Dimension_depth</th>
            <th>Images</th>
            <th>Artist</th>
            <th>Technique de l'oeuvre</th>
            <th>Prix à la demande</th>
          </tr>
        </thead>
        <tbody>
          {artworks.map((oeuvre) => (
            <tr key={oeuvre.artworks_id}>
              <td>{oeuvre.title}</td>
              <td>{oeuvre.description}</td>
              <td>{oeuvre.art_theme}</td>
              <td>{oeuvre.date_creation}</td>
              <td>{oeuvre.price}</td>
              <td>{oeuvre.dimension_height}</td>
              <td>{oeuvre.dimension_width}</td>
              <td>{oeuvre.dimension_depth}</td>
              <td>{oeuvre.thumbnail}</td>
              <td>{oeuvre.artists_id}</td>
              <td>{oeuvre.artwork_technique_id}</td>
              <td>{oeuvre.price_on_demand}</td>
              <td>
                <button
                  type="button"
                  className="button_delete"
                  onClick={() => createmodify(oeuvre)}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className="button_delete"
                  onClick={() => createconfirmdelete(oeuvre)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={openconfirmdelete}
        onClose={() => setOpenconfirmdelete(false)}
        center
      >
        <p>
          Êtes-vous sûr de vouloir supprimer l'oeuvre :
          <br />
          <p>
            <span className="text-user-information">
              {selectedOeuvre?.title} ?{" "}
            </span>
          </p>
        </p>
        <button
          type="button"
          className="button_confirm"
          onClick={() => handledelete(selectedOeuvre?.artworks_id)}
        >
          supprimer
        </button>
        <button
          type="button"
          className="button_confirm"
          onClick={() => setOpenconfirmdelete(false)}
        >
          annuler
        </button>
      </Modal>
      <Modal open={openModify} onClose={() => setOpenModify(false)} center>
        <ModifOeuvre
          oeuvre={selectedOeuvre}
          onClose={() => setOpenModify(false)}
        />
      </Modal>
    </div>
  );
}

export default DeleteOeuvre;
