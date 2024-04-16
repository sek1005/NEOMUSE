import Slider from "react-slick";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderArtist.css";
import ArtistlistHome from "../ArtistListHome";
/* import useAllDataContext from "../../contexts/AllDataContext"; */

function SliderArtist() {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    const Id = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/artists`,
          {
            method: "GET",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setArtists(data);
        } else {
          console.error("Pas d'oeuvre par technique trouvé");
        }
      } catch (error) {
        console.error(error);
      }
    };
    Id();
  }, []);
  return (
    <div className="container-artists">
      <div className="contain-artists">
        <Slider
          dots="true"
          infinite="true"
          speed="500"
          slidesToShow={3}
          slidesToScroll={3}
          autoplay="true"
          autoplaySpeed={3000}
          responsive={[
            {
              breakpoint: 428,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
              },
            },
          ]}
        >
          {artists.map((artist) => (
            <div key={artist?.artist_id}>
              <ArtistlistHome artist={artist} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SliderArtist;
