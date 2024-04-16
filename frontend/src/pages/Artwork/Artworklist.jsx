import "./artwork.css";
import TechniqueList from "../../components/technique/TechniqueList";

function Artworklist() {
  return (
    <section className="artWorkList">
      <div className="list">
        <div className="h1listartwork">
          <h1 className="h1Oeuvres">Découvrir nos oeuvres</h1>
        </div>
        <TechniqueList />
      </div>
    </section>
  );
}

export default Artworklist;
