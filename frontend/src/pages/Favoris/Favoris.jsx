import { useState, useEffect } from "react";
import Grid from "@mui/joy/Grid";
import Oeuvre from "../../components/Oeuvre";
import "./favoris.css";

function Favoris() {
  const [favorites, setFavorites] = useState([]);
  const [deleted, setDeleted] = useState(null);
  useEffect(() => {
    const id = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/favoris`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setFavorites(data);
        } else {
          console.error("Pas d'oeuvre trouvée");
        }
      } catch (error) {
        console.error(error);
      }
    };
    id();
  }, [deleted]);
  return (
    <div>
      <div className="favorite_title">
        <h2>Vos favoris</h2>
      </div>
      <div className="gridcontainer">
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          columns={{ xs: 4, sm: 8, md: 15 }}
          sx={{ flexGrow: 1 }}
        >
          {favorites.map((favorite) => (
            <Grid xs={2} sm={4} md={4.6} key={favorite.artworks_id}>
              <Oeuvre setDeleted={setDeleted} artwork={favorite} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Favoris;
