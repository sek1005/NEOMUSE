import "./contact.css";
import contact from "../../assets/contact.jpg";

function Contact() {
  return (
    <section className="contact_page">
      <div className="container_contact">
        <img className="image_galerie" src={contact} alt="" />
        <div className="container_text">
          <h1 className="h1_contact"> CONTACTEZ-NOUS</h1>
          <p>3 rue de la Ferronerie</p>
          <p>75003 Paris</p>
          <p>Métro 8 Saint Sébastien</p>
          <p>Froissart</p>
          <p>neo-muse-gallery@gmail.com</p>
          <p>Tel : +33 1 30 39 48 50</p>
          <p>@neo_muse_gallery</p>
          <p>Lundi - vendredi, 10h-17h</p>
          <p>Samedi, 10h-14</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
