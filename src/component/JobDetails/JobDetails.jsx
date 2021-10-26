import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Modal from "../Modal/Modal";
import Navbar from "../Navbar/Navbar";
function JobDetails(props) {
  const { jobId } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobs/${jobId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  let alreadyAplied = false;

  if (props.userData && props.userData.userType == "seeker") {
    alreadyAplied = props.userData.appliedId.some(
      (appliedId) => appliedId == jobId
    );
  }

  return (
    <React.Fragment>
      {!props.noNavBar && <Navbar />}
      {open && <Modal open={open} jobId={props.id} handleClose={handleClose} />}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            mt: 10,
          }}
        >
          <CircularProgress color="secondary" />
          <Typography variant="subtitle1" color="text.secondary" component="h1">
            Loading
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            p: 0,
            m: 0,
          }}
        >
          <Card
            variant="outlined"
            sx={{ width: { lg: "60%", xs: "100%" }, px: 2, boxShadow: 2 }}
          >
            <CardContent>
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{ fontSize: 25 }}
                  color="text.primary"
                  component="h1"
                  gutterBottom
                >
                  {product.title}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  {product.tags.map((tag, index) => (
                    <Card
                      variant="outlined"
                      sx={{
                        width: "auto",
                        justifyContent: "center",
                        mr: 1,
                        px: 1,
                        backgroundColor: "#fff8e1",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontSize: 12, textAlign: "center" }}
                      >
                        #{tag}
                      </Typography>
                    </Card>
                  ))}
                </Box>
              </Box>
              <Divider />
              <Box sx={{ my: 4 }}>
                <Typography
                  sx={{ fontSize: 25 }}
                  color="text.primary"
                  component="h1"
                  gutterBottom
                >
                  Job Details
                </Typography>
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.primary"
                  component="h1"
                  gutterBottom
                >
                  {product.description}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ my: 4 }}>
                <Typography
                  sx={{ fontSize: 25 }}
                  color="text.primary"
                  component="h1"
                  gutterBottom
                >
                  Requirements
                </Typography>
                <ul>
                  {product.requirements.map((req) => (
                    <li>{req}</li>
                  ))}
                </ul>
              </Box>
            </CardContent>
            {!props.noApply && !alreadyAplied && (
              <Box
                classname="favorite-icon"
                sx={{
                  display: "flex",
                  mb: 1,
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClickOpen();
                  }}
                >
                  Apply Now
                </Button>
              </Box>
            )}
          </Card>
        </Box>
      )}
    </React.Fragment>
  );
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
  userData: state.user.data,
  jobs: state.jobs.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
