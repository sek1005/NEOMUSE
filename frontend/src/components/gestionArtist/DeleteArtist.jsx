import { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import useAllDataContext from "../../contexts/AllDataContext";
import "./deleteArtist.css";
import ModifArtist from "./ModifArtist";

function DeleteArtist() {
  const [openconfirmdelete, setOpenconfirmdelete] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const createconfirmdelete = (Artist) => {
    setSelectedArtist(Artist);
    setOpenconfirmdelete(true);
  };
  const [openModify, setOpenModify] = useState(false);
  const createmodify = (artist) => {
    setSelectedArtist(artist);
    setOpenModify(true);
  };
  const { artists, setArtists, showToastError, showToastSuccess } =
    useAllDataContext();
  const handledelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/artists/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            artist_id: artists.artist_id,
          }),
        }
      );
      console.info(response.status);
      if (response.status === 204) {
        setArtists(artists.filter((artist) => artist.artist_id !== id));
        setOpenconfirmdelete(false);
        showToastSuccess("suppression reussie");
      } else {
        console.error("Échec de la suppression de l'artiste");
        showToastError("Échec de la suppression de l'artiste");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="delete_oeuvre">
      <p className="titreGestion">Supprimer ou modifier un artiste</p>
      <table>
        <thead>
          <tr>
            <th>Pseudo</th>
            <th>Nom</th>
            <th>Prénoms</th>
            <th>Date d'enregistrement</th>
            <th>Image</th>
            <th>Biographie</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist.artworks_id}>
              <td>{artist.artist_name}</td>
              <td>{artist.firstname}</td>
              <td>{artist.lastname}</td>
              <td>{artist.date_registration}</td>
              <td>{artist.thumbnail}</td>
              <td>{artist.biography}</td>
              <td>
                <button
                  type="button"
                  className="button_delete"
                  onClick={() => createmodify(artist)}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className="button_delete"
                  onClick={() => createconfirmdelete(artist)}
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
          Êtes-vous sûr de vouloir supprimer l'artiste :
          <br />
          <p>
            {" "}
            <span className="text-user-information">
              {selectedArtist?.artist_name} ?
            </span>
          </p>
        </p>
        <button
          type="button"
          className="button_confirm"
          onClick={() => handledelete(selectedArtist?.artist_id)}
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
        <ModifArtist
          artist={selectedArtist}
          onClose={() => setOpenModify(false)}
        />
      </Modal>
    </div>
  );
}

export default DeleteArtist;
