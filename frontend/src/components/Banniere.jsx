import * as React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";

function Banniere() {
  return (
    <Container
      component="section"
      sx={{
        bgcolor: "#d1c8e1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 15,
        py: 5,
      }}
    >
      <Link to="./contact">
        <Button
          sx={{
            border: "4px solid #87255b",
            borderRadius: 0,
            height: "auto",
            py: 2,
            px: 5,
          }}
        >
          <Typography variant="h4" component="span" sx={{ color: "black" }}>
            DES QUESTIONS ? Contactez-nous
          </Typography>
        </Button>
      </Link>
      <Typography level="h2" sx={{ my: 3 }}>
        "Nous sommes là pour répondre à toutes vos questions et rendre votre
        expérience artistique des plus enrichissantes."
      </Typography>
    </Container>
  );
}

export default Banniere;
