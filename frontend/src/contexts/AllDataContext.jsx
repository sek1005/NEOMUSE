import { ToastContainer, toast } from "react-toastify";
import { useMemo, useState, createContext, useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

const AllDataContext = createContext();

export function AllDataProvider({ children }) {
  const [artworks, setArtworks] = useState([]);
  useEffect(() => {
    const oeuvre = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/artworks`,
          {
            method: "GET",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setArtworks(data);
        } else {
          console.error("Pas d'oeuvre trouvé");
        }
      } catch (error) {
        console.error(error);
      }
    };
    oeuvre();
  }, []);

  const [artworkTechnic, setArtworkTechnic] = useState([]);
  useEffect(() => {
    const technique = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/technic`,
          {
            method: "GET",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setArtworkTechnic(data);
        } else {
          console.error("Pas de technique trouvé");
        }
      } catch (error) {
        console.error(error);
      }
    };
    technique();
  }, []);

  const [artworkBytech, setArtworkBytech] = useState([]);
  useEffect(() => {
    const bytech = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/artworkbytech`,
          {
            method: "GET",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setArtworkBytech(data);
        } else {
          console.error("Pas d'oeuvre par technique trouvé");
        }
      } catch (error) {
        console.error(error);
      }
    };
    bytech();
  }, []);

  const [artists, setArtists] = useState([]);
  useEffect(() => {
    const artiste = async () => {
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
          console.error("Pas d'artistes trouvés");
        }
      } catch (error) {
        console.error(error);
      }
    };
    artiste();
  }, []);
  const showToastSuccess = (message, options) => {
    toast.success(message, options);
  };
  const showToastError = (message, options) => {
    toast.error(message, options);
  };

  const value = useMemo(
    () => ({
      showToastSuccess,
      showToastError,
      artists,
      setArtists,
      artworks,
      setArtworks,
      artworkTechnic,
      setArtworkTechnic,
      artworkBytech,
      setArtworkBytech,
    }),
    [artists, artworks, artworkTechnic, artworkBytech]
  );
  return (
    <AllDataContext.Provider value={value}>
      {children} <ToastContainer />
    </AllDataContext.Provider>
  );
}
export default () => useContext(AllDataContext);
