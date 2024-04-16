import { useParams, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import "./artist.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderOeuvre from "../../components/Slider/SliderOeuvre";

function Artist() {
  const { id } = useParams();
  const artworks = useLoaderData();
  const [artists, setArtists] = useState([]);
  const [showFullBiography, setShowFullBiography] = useState(false);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/artists/${id}`,
          {
            method: "GET",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setArtists(data);
        } else {
          console.error("Pas d'artiste trouvé");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchArtists();
  }, [id]);

  return (
    <>
      <img
        src={artists.thumbnail}
        alt="img-desk-top"
        className="art-imgtop-desk"
      />
      <div className="art-imgtop" alt="tof-random" />
      <h3 className="art-name">Artiste : {artists?.artist_name}</h3>
      <div className="art-bio-container">
        <img
          src={artists?.thumbnail}
          alt="mr-jonesthumb"
          className="art-thumb-desk"
        />
        <p className="art-biography">
          {showFullBiography
            ? artists?.biography || ""
            : `${(artists?.biography || "").slice(0, 250)} ...`}
          <button
            className="art-bio-seemore"
            type="button"
            onClick={() => setShowFullBiography(!showFullBiography)}
          >
            {showFullBiography ? "Voir moins" : "Voir plus"}
          </button>
        </p>
      </div>
      <h3 className="art-title">Oeuvres de l'artiste</h3>
      <SliderOeuvre artworks={artworks} />
    </>
  );
}

export default Artist;
