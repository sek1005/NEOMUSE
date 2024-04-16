import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Oeuvre from "../Oeuvre";
import useUser from "../../contexts/UserContext";
import useAllDataContext from "../../contexts/AllDataContext";
import "./OeuvreDetail.css";

function Artwork({ setDeleted }) {
  const navigate = useNavigate();
  const [openimg, setOpenimg] = useState(false);
  const [selectedimg, setSelectedimg] = useState(null);
  const createOpenImg = (artwork) => {
    setSelectedimg(artwork.artworkUnique);
    setOpenimg(true);
  };
  const { showToastError } = useAllDataContext();
  const toastFavoriError = () => {
    showToastError("connexion obligatoire pour ajouter des favoris");
  };
  const { user } = useUser();
  const { id } = useParams();
  const [artwork, setArtwork] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/favoris`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        console.info(response.status);
        if (response.status === 200) {
          const favs = await response.json();
          favs.map((fav) => {
            if (fav.artworks_id === artwork?.artworkUnique.artworks_id)
              setIsFavorite(true);
            return true;
          });
        } else {
          console.error("erreur ajout du favori.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/favoris`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              artworks_id: artwork?.artworkUnique.artworks_id,
            }),
            credentials: "include",
          }
        );
        console.info(response.status);
        if (response.status === 200) {
          setIsFavorite(false);
          setDeleted(artwork?.artworkUnique.artworks_id);
        } else {
          console.error("suppression du favori.");
        }
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/favoris`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              artworks_id: artwork?.artworkUnique.artworks_id,
            }),
            credentials: "include",
          }
        );
        console.info(response.status);
        if (response.status === 201) {
          setIsFavorite(true);
        } else {
          console.error("erreur ajout du favori.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const Id = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/artworks/${id}`,
          {
            method: "GET",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          // console.log(data);
          setArtwork(data);
        } else {
          console.error("Pas d'oeuvre par technique trouvée");
        }
      } catch (error) {
        console.error(error);
      }
    };
    Id();
  }, [id]);

  return (
    <section>
      <div className="bouton_collection">
        <Link className="link_collection" to="/artworks">
          Toute la collection
        </Link>
      </div>
      {artwork && (
        <div className="sectionOeuvreD">
          <figure className="boximgOeuvreDetail">
            <div
              onClick={() => createOpenImg(artwork)}
              onKeyDown={() => createOpenImg(artwork)}
              tabIndex={0}
              role="button"
            >
              <img
                src={artwork.artworkUnique?.thumbnail}
                alt=""
                className="imgOeuvreDetail"
                id="imagedetails"
                name="imagedetails"
                aria-label="Save"
              />
            </div>
          </figure>
          <div className="aside">
            <div className="enTeteOeuvreDetais">
              <div className="titreOeuvre">
                <p>{artwork.artworkUnique?.title}</p>
                <Link
                  className="nom_Artist"
                  to={`/artists/${artwork.artworkUnique?.artists_id}`}
                >
                  <p>
                    {" "}
                    by {artwork.artworkUnique?.lastname}{" "}
                    {artwork.artworkUnique?.firstane}
                  </p>
                </Link>
                <p>{artwork.artworkUnique?.category}</p>
                <p>{artwork.artworkUnique?.price} €</p>
                <p>
                  {artwork.artworkUnique?.dimension_height} x{" "}
                  {artwork.artworkUnique?.dimension_width} cm
                </p>
              </div>
              <div className="boxboutton">
                <button
                  type="button"
                  onClick={
                    user
                      ? () => toggleFavorite()
                      : () => {
                          navigate("/login");
                          toastFavoriError();
                        }
                  }
                >
                  <Button
                    startDecorator={<FavoriteBorder />}
                    sx={{
                      fontFamily: "Lobster",
                      fontWeight: "400",
                      fontSize: "  1rem",
                      bgcolor: isFavorite ? "red" : "black",
                      color: "white",
                      margin: "0px",
                      "--Button-gap": "0px",
                    }}
                  >
                    Ajouter en favoris{" "}
                  </Button>
                </button>
              </div>
            </div>
            <h2 className="descripOeuvreTitre">Description de l'œuvre</h2>
            <div className="descripOeuvre">
              <p className="descripOeuvre-1">
                {artwork.artworkUnique?.description}
              </p>
              <div className="descripOeuvre-2">
                <div>
                  <span className="dimensionimage">Dimensions:</span>{" "}
                  <span>
                    {artwork.artworkUnique?.dimension_height} x{" "}
                    {artwork.artworkUnique?.dimension_width} cm
                  </span>{" "}
                </div>
                <div>
                  <span className="dimensionimage">Theme :</span>{" "}
                  <span>{artwork.artworkUnique?.art_theme}</span>
                </div>
                <div>
                  <span className="dimensionimage">Technique :</span>{" "}
                  <span>{artwork.artworkUnique?.technique_name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <h1 className="Titreslid">
        Autres oeuvres de la même technique{" "}
        {artwork.artworkUnique?.technique_name}{" "}
      </h1>
      <div className="gridcontainer">
        <Grid
          container
          spacing={{ xs: 1, md: 6 }}
          columns={{ xs: 4, sm: 8, md: 15 }}
          sx={{ flexGrow: 1 }}
        >
          {artwork.artworkList?.map((oeuvre) => (
            <Grid xs={2} sm={4} md={4.6} key={oeuvre.artworks_id}>
              <Oeuvre artwork={oeuvre} />
            </Grid>
          ))}
        </Grid>
      </div>
      <Modal
        open={openimg}
        onClose={() => setOpenimg(false)}
        center
        className="modalImg"
      >
        <img src={selectedimg?.thumbnail} alt="" className="imgOeuvreModal" />
      </Modal>
    </section>
  );
}

export default Artwork;
