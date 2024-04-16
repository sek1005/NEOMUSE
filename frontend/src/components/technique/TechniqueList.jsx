// import { Link } from "react-router-dom";
import { useState } from "react";
import Grid from "@mui/joy/Grid";
import useAllDataContext from "../../contexts/AllDataContext";
import "./technique.css";
import Oeuvre from "../Oeuvre";

function TechniqueList() {
  const { artworkBytech, artworkTechnic } = useAllDataContext();
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  const filteredArtworks = artworkBytech.filter((artwork) => {
    if (!selectedTechnique) {
      return true;
    }
    return artwork.technique_name
      .toLowerCase()
      .includes(selectedTechnique.toLowerCase());
  });

  const handleTechniqueChange = (artworkTech) => {
    setSelectedTechnique(artworkTech);
  };
  const handleResetFilter = () => {
    setSelectedTechnique(null);
  };
  return (
    <>
      <div className="bouttonWorklist">
        {artworkTechnic.map((artworkTech) => (
          <button
            type="button"
            key={artworkTech.artwork_technique_id}
            onClick={() => handleTechniqueChange(artworkTech.name)}
            className="bouttonOeuvreList"
          >
            {artworkTech.name}
          </button>
        ))}
        <button
          type="button"
          className="boutton_toutafficher"
          onClick={handleResetFilter}
        >
          Voir tous
        </button>
      </div>

      <div className="gridcontainer">
        <Grid
          container
          spacing={{ xs: 1, md: 6 }}
          columns={{ xs: 4, sm: 8, md: 15 }}
          sx={{ flexGrow: 1 }}
        >
          {filteredArtworks.map((oeuvre) => (
            <Grid xs={2} sm={4} md={4.6} key={oeuvre.artworks_id}>
              <Oeuvre artwork={oeuvre} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default TechniqueList;
