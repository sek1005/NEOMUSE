import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteOeuvre from "../../components/getionOeuvre/DeleteOeuvre";
import AddOeuvre from "../../components/getionOeuvre/AddOeuvre";
import "./pageAdmin.css";

function ManageArtwork() {
  const navigate = useNavigate();
  return (
    <div className="admin-page">
      <div className="box_lien">
        <button
          type="button"
          className="boutonModifArtist"
          onClick={() => navigate("/users")}
        >
          Mon profil
        </button>
        <h1 className="h1Oeuvres">GERER LES OEUVRES</h1>
        <button
          type="button"
          className="boutonModifArtist"
          onClick={() => navigate("/adminModifArtist")}
        >
          GESTION DES ARTISTES
        </button>
      </div>
      <AddOeuvre />
      <DeleteOeuvre />
    </div>
  );
}

export default ManageArtwork;
