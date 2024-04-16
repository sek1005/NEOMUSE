import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import useAllDataContext from "../../contexts/AllDataContext";
import "./connexion.css";

function ModalSignup({ onClose }) {
  const { showToastError, showToastSuccess } = useAllDataContext();
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const firstname = useRef();
  const lastname = useRef();
  // const email = useRef();
  const phone = useRef();
  const adress = useRef();
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const validateEmail = () => {
    const regexPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setIsValid(regexPattern.test(email));
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: firstname.current.value,
            lastname: lastname.current.value,
            email,
            phone: phone.current.value,
            adress: adress.current.value,
            password,
          }),
        }
      );
      console.info(response.status);
      if (response.status === 201) {
        showToastSuccess("inscription réussie !");
        onClose();
      } else {
        showToastError("veuillez vérifier votre saisie.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container_signup">
      <h2 className="titre_login">Créer votre compte</h2>
      <form className="modal_login">
        <div className="grid">
          <div>
            <label htmlFor="firstname" className="titre_champ">
              Prénom
            </label>
            <input
              type="text"
              name="firstname"
              ref={firstname}
              className="input_login"
              required
            />
          </div>
          <div className="">
            <label htmlFor="lastname" className="titre_champ">
              Nom
            </label>
            <input
              type="text"
              name="lastname"
              ref={lastname}
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
              ref={phone}
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
              ref={adress}
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
              placeholder="email@gmail.com"
              className="input_login"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              required
            />
            {!isValid && <p style={{ color: "red" }}>Invalid email address</p>}
          </div>
          <div>
            <label htmlFor="password" className="titre_champ">
              Mot de passe
            </label>
            <div className="imput">
              <input
                type={passwordIsVisible ? "text" : "password"}
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="input_login"
                required
              />
              <div
                onClick={() => setPasswordIsVisible((prev) => !prev)}
                className="text_visible"
                onKeyDown={() => setPasswordIsVisible((prev) => !prev)}
                tabIndex="0"
                role="button"
              >
                {passwordIsVisible ? (
                  <Icon icon="gridicons:not-visible" width="20" />
                ) : (
                  <Icon icon="gridicons:visible" width="20" />
                )}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="titre_champ">
              Confirmer mot de passe
            </label>
            <div className="imput">
              <input
                type={passwordIsVisible ? "text" : "password"}
                name="confirmPassword"
                className="input_login"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <div
                onClick={() => setPasswordIsVisible((prevState) => !prevState)}
                className="text_visible"
                onKeyDown={() =>
                  setPasswordIsVisible((prevState) => !prevState)
                }
                tabIndex="0"
                role="button"
              >
                {passwordIsVisible ? (
                  <Icon icon="gridicons:not-visible" width="20" />
                ) : (
                  <Icon icon="gridicons:visible" width="20" />
                )}
              </div>
            </div>
            {password === confirmPassword ? (
              <Icon icon="charm:square-tick" color="#87255B" width="20" />
            ) : (
              <p style={{ color: "red" }}>Mot de passe non identique</p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <button type="button" className="bout_login" onClick={handleSubmit}>
            Créer votre compte
          </button>
        </div>
      </form>
    </div>
  );
}
export default ModalSignup;
