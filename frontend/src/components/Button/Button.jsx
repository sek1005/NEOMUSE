import "./button.css";

function Button({ text }) {
  return (
    <div>
      <button type="button" className="bouton_voir">
        {text}
      </button>
    </div>
  );
}

export default Button;
