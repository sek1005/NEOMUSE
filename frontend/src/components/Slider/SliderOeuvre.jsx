import Slider from "react-slick";
import Oeuvre from "../Oeuvre";
/* import useAllDataContext from "../../contexts/AllDataContext"; */
import "./sliderOeuvre.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SliderOeuvre({ artworks }) {
  return (
    <div className="containerSlider">
      <div className="containtSlider">
        <Slider
          infinite="true"
          slidesToShow={3}
          slidesToScroll={3}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
              },
            },
          ]}
        >
          {artworks.map((artwork) => (
            <div key={artwork.artworks_id}>
              <Oeuvre artwork={artwork} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SliderOeuvre;
