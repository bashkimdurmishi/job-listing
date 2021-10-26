import React from "react";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      sx={{ alignSelf: "end", mt: 10, mb: 2 }}
    >
      {"Copyright © "}
      Bashkim Durmishi {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;
