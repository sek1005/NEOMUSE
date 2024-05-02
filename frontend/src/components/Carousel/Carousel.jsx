import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.css";

function formatDate(date) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(date).toLocaleDateString("fr-FR", options);
}

function Slider() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const evenement = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/events`,
          {
            method: "GET",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Pas d'evenement trouvé");
        }
      } catch (error) {
        console.error(error);
      }
    };
    evenement();
  }, []);

  return (
    <div className="contentCarrousel">
      <div className="containerCarrousel">
        <Carousel
          autoPlay
          interval={5000}
          infiniteLoop
          radius="10rem"
          showThumbs={false}
          showStatus={false}
          transitionTime={2000}
        >
          {events.map((event) => (
            <div key={event.id}>
              <img
                src={event.thumbnail}
                srcSet={event.thumbnail}
                loading="lazy"
                className="img_event"
                alt=""
              />
              <div className="overlay">
                <h2 className="overlay_title">{event.name}</h2>
                <div className="overlay_text">
                  <Icon
                    icon="simple-icons:googlemaps"
                    color="white"
                    height="15"
                    className="place"
                  />
                  <p>{event.localisation}</p>
                </div>
                <div className="overlay_text">
                  <Icon
                    icon="uiw:date"
                    color="white"
                    height="15"
                    className="date"
                  />
                  <p>
                    Du {formatDate(event.start_date)} au {}
                    {formatDate(event.end_date)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Slider;
