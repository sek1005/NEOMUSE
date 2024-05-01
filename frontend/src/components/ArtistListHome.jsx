import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/joy/CardContent";
import CardCover from "@mui/joy/CardCover";

function ArtistlistHome({ artist }) {
  return (
    <section>
      <Card
        sx={{
          minHeight: "300px",
          width: 280,
          margin: "1rem",
          padding: "0.7rem",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "md",
            transition: "transform 0.3s ease-in-out",
            transform: "scale(1.1)",
          },
        }}
      >
        <CardCover>
          <img
            src={artist?.thumbnail}
            srcSet={artist?.thumbnail}
            loading="lazy"
            alt=""
          />
        </CardCover>
        <CardContent sx={{ justifyContent: "flex-end" }}>
          <Typography level="title-lg" textColor="#fff">
            {artist?.firstname}
          </Typography>
        </CardContent>
      </Card>
    </section>
  );
}

export default ArtistlistHome;
