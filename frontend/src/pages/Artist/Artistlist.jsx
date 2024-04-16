import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import "./artistlist.css";

function Artistlist() {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/artists/`,
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
    fetchArtist();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredArtists = artists.filter((artist) =>
    artist.artist_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {};
  useEffect(() => {
    document.title = "Découvrir nos artistes";
  }, []);

  return (
    <div className="body_artistlist">
      <section className="header_artistlist">
        <div className="title_artislist">
          <h1 className="h1_artistes">Découvrir nos artistes</h1>
        </div>
        <div className="searchbar">
          <div className="container_search">
            <input
              className="input_search"
              type="text"
              placeholder="Trouver un artiste..."
              value={searchTerm}
              onChange={handleInputChange}
            />
            <Icon
              onClick={handleSearch}
              id="icon_search"
              type="button"
              icon="arcticons:searchbar-ex"
              color="#B370B0"
              width="50"
              height="50"
            />
          </div>
        </div>
      </section>
      <div className="portraits">
        <div className="portrait_artist">
          {filteredArtists?.map((artist) => (
            <div key={artist?.id}>
              <Link to={`/artists/${artist.artist_id}`}>
                {artist?.thumbnail && (
                  <img className="image_artist" src={artist.thumbnail} alt="" />
                )}
              </Link>
              <div className="name_artist">
                <p>{artist?.artist_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Artistlist;
