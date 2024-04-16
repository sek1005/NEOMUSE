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
          autoplay="true"
          autoplaySpeed={3000}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
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
