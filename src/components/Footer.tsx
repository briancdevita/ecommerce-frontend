import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 1,
        mt: "auto",
        textAlign: "center",
        height: "60px", // Ajusta la altura fija
      }}
    >
      <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
        © {new Date().getFullYear()} E-Commerce App. Todos los derechos
        reservados.
      </Typography>
      <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
        Desarrollado por <strong>Brian De Vita</strong>.
      </Typography>
    </Box>
  );
}
