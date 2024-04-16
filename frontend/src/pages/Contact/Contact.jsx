import "./contact.css";
import ImagePageContact from "../../assets/image_page_contact.jpg";
import CarteContact from "../../assets/CarteContact.jpg";

function Contact() {
  return (
    <section className="contact_page">
      <div className="image_contact">
        <img className="image_galerie" src={ImagePageContact} alt="" />
      </div>
      <div className="title">
        <h1>CONTACTEZ-NOUS</h1>
      </div>
      <div className="carte_visite">
        <div className="carte_address">
          <div className="carte_contact">
            <img className="localisation" src={CarteContact} alt="" />
          </div>
          <div className="address_contact">
            <div className="address">
              <p>3 rue de la Ferronerie</p>
              <p>75003 Paris</p>
            </div>
            <div className="metro">
              <p>Métro 8 Saint Sébastien</p>
              <p>Froissart</p>
            </div>
          </div>
        </div>
        <div className="info_contact">
          <div className="tel">
            <p>neo-muse-gallery@gmail.com</p>
            <p>Tel : +33 1 45 67 33 78</p>
          </div>
          <div className="instagram">
            <p>@neo_muse_gallery</p>
          </div>
          <div className="hours">
            <p>mardi - samedi, 10h-18h</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
