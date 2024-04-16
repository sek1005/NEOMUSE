import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useUser from "../../contexts/UserContext";
import "./information.css";

function Information() {
  const { user, setUser } = useUser();

  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [adress, setAdress] = useState(user?.adress);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            phone,
            adress,
          }),
        }
      );
      if (response.status === 204) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("veuillez verifier votre saisie.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button
        type="button"
        className="boutonModifArtist"
        onClick={() => navigate("/users")}
      >
        Mon profil
      </button>
      <div className="container_modif_user">
        <h2 className="titre_user">Mes informations</h2>
        <form className="">
          <div className="grid">
            <div>
              <label htmlFor="firstname" className="titre_champ">
                Prénom
              </label>
              <input
                type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                className="input_login"
              />
            </div>
            <div className="">
              <label htmlFor="lastname" className="titre_champ">
                Nom
              </label>
              <input
                type="text"
                name="lastname"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                className="input_login"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="titre_champ">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="input_login"
                required
              />
            </div>
            <div>
              <label htmlFor="adress" className="titre_champ">
                Adresse
              </label>
              <input
                type="text"
                name="adress"
                value={adress}
                onChange={(e) => {
                  setAdress(e.target.value);
                }}
                className="input_login"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="titre_champ">
                Email
              </label>
              <input
                type="email"
                name="creationMail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input_login"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button type="button" className="bout_user" onClick={handleSubmit}>
              Modifier mes informations
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Information;
