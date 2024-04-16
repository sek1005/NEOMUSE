import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Favorite from "@mui/icons-material/Favorite";
import Stack from "@mui/joy/Stack";
import useAllDataContext from "../contexts/AllDataContext";
import useUser from "../contexts/UserContext";

function Oeuvre({ artwork, setDeleted = () => {} }) {
  const { showToastError } = useAllDataContext();
  const toastFavoriError = () => {
    showToastError("connexion obligatoire pour ajouter des favoris");
  };
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
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
        if (response.status === 200) {
          const favs = await response.json();
          favs.map((fav) => {
            if (fav.artworks_id === artwork.artworks_id) setIsFavorite(true);
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
              artworks_id: artwork.artworks_id,
            }),
            credentials: "include",
          }
        );
        console.info(response.status);
        if (response.status === 200) {
          setIsFavorite(false);
          setDeleted(artwork.artworks_id);
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
              artworks_id: artwork.artworks_id,
            }),
            credentials: "include",
          }
        );
        console.info(response.status);
        if (response.status === 201) {
          setIsFavorite(true);
        } else {
          showToastError("erreur ajout du favori.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <Card
        sx={{
          margin: "1rem",
          bgcolor: "#d1c8e1",
          border: " 0.1rem solid #605f5d",
          borderRadius: "0px",
          boxShadow: "0px 4px 4px #00000040",
          padding: "0.7rem",
          overflow: "hidden",
          "&:hover": {
            boxShadow: "md",
          },
        }}
      >
        <Link className="LinkOeuvreId" to={`/artworks/${artwork.artworks_id}`}>
          <AspectRatio ratio="3/3">
            <Box
              className="box"
              sx={{
                width: "93%",
                height: "93%",
                margin: "0 auto",
                overflow: "hidden",
                "&:hover": { opacity: "0.8", cursor: "pointer" },
              }}
            >
              <img
                src={artwork.thumbnail}
                srcSet={artwork.thumbnail}
                loading="lazy"
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </AspectRatio>
        </Link>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="white"
          margin="-0.3rem"
          lineHeight="0px"
        >
          <Box padding={0.5} overflow="hidden">
            <Typography
              sx={{
                fontSize: "0.6rem",
                "@media screen and (min-width: 1024px)": {
                  fontSize: "1rem",
                },
              }}
              level="title-sm"
            >
              {artwork?.title}
            </Typography>
            <Typography
              level="body-sm"
              lineHeight="8px"
              sx={{
                fontSize: "0.6rem",
                "@media screen and (min-width: 1024px)": {
                  fontSize: "1rem",
                },
              }}
            >
              {artwork?.dimension_height} x {artwork?.dimension_width} cm
            </Typography>
            <Typography
              fontSize="title-sm"
              fontWeight="lg"
              sx={{
                fontSize: "0.6rem",
                "@media screen and (min-width: 1024px)": {
                  fontSize: "1rem",
                },
              }}
            >
              {artwork?.price} €
            </Typography>
          </Box>
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
            <Favorite
              sx={{
                backgroundColor: "white",
                fontWeight: "md",
                fontSize: "1.9rem",
                color: isFavorite ? "#CB1F27" : "text.secondary",
                "&:hover": { color: "#CB1F27" },
              }}
            />
          </button>
        </Stack>
      </Card>
    </section>
  );
}

export default Oeuvre;
