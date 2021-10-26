import React from "react";

import { Box, Typography, Card, CardContent } from "@mui/material";
function ApplierItem(props) {
  const { product } = props;
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        p: 0,
        mb: 2,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          width: "100%",
          px: 2,
          boxShadow: 2,
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <CardContent>
          <Box sx={{}}>
            <Typography
              sx={{ fontSize: 25, mb: 2 }}
              color="text.primary"
              component="h1"
              gutterBottom
            >
              Name: {product.applicant}
            </Typography>
            <Typography
              sx={{ fontSize: 25, mb: 2 }}
              color="text.primary"
              component="h1"
              gutterBottom
            >
              Description: {product.description}
            </Typography>
            <Typography
              sx={{ fontSize: 25, mb: 2 }}
              color="text.primary"
              component="h1"
              gutterBottom
            >
              Cv: {product.cv}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ApplierItem;
