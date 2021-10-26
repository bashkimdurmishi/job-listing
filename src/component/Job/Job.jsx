import React from "react";
import { connect } from "react-redux";
import { Button, Box, Card, CardContent, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { favourtiteJob, unFavouriteJob } from "../../redux/user/actions";

import DoubleArrowSharpIcon from "@mui/icons-material/DoubleArrowSharp";
import {
  AccessTime as AccessTimeIcon,
  FavoriteBorderOutlined,
  Favorite,
} from "@mui/icons-material";
import Modal from "../Modal/Modal";

export function Job(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const bgColor = props.index % 2 === 0 ? "white" : "#ebf2fc";

  const handleFavourite = (id) => {
    if (props.favorite) {
      props.unFavouriteJob(props.userData, id);
    } else {
      props.favourtiteJob(props.userData, id);
    }
  };

  const card = (
    <Card
      className="job-container"
      sx={{
        display: "flex",
        flexDirection: { lg: "row", xs: "column", backgroundColor: bgColor },
      }}
    >
      <Box
        className="job-primary-details"
        sx={{
          minWidth: { lg: "60%", xs: "100%" },
        }}
      >
        <CardContent>
          <Typography component="div" variant="h5">
            {props.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.poster}
          </Typography>
        </CardContent>
      </Box>
      <Box
        className="job-secondary-details"
        sx={{
          display: "flex",
          alignItems: { lg: "start" },
          justifyContent: "space-between",
          flexDirection: { lg: "column", xs: "row" },
          width: { lg: "30%", xs: "100%" },
        }}
      >
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <DoubleArrowSharpIcon />
          <p>{props.location}</p>
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <AccessTimeIcon />
          <p>{props.datePosted}</p>
        </Typography>
      </Box>
      <Box
        className="apply-details-favorite"
        sx={{
          display: "flex",
          flexDirection: { lg: "column", xs: "row" },
          justifyContent: { xs: "space-around" },
          width: { lg: "30%", xs: "100%" },
        }}
      >
        <Box
          onClick={() => handleFavourite(props.id)}
          classname="favorite-icon"
          sx={{
            display: "flex",
            width: { lg: "100%", xs: "40%" },
            justifyContent: { lg: "flex-end", xs: "center" },
          }}
        >
          {!props.applied &&
            (!props.favorite ? (
              <FavoriteBorderOutlined sx={{ m: 1, color: "red" }} />
            ) : (
              <Favorite sx={{ m: 1, color: "red" }} />
            ))}
        </Box>

        <Box
          classname="favorite-icon"
          sx={{
            display: "flex",
            mb: 1,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <NavLink to={`/jobs/${props.id}`} style={{ textDecoration: "none" }}>
            <Button variant="outlined">View Details</Button>
          </NavLink>
        </Box>

        <Box
          classname="favorite-icon"
          sx={{
            display: "flex",
            mb: 1,
            width: "100%",
            justifyContent: "center",
          }}
        >
          {!props.applied ? (
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                handleClickOpen();
              }}
            >
              Apply Now
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={(e) => {
                e.preventDefault();
              }}
              disableRipple
            >
              ✔Applied
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      {open && <Modal open={open} jobId={props.id} handleClose={handleClose} />}
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

const mapDispatchToProps = {
  favourtiteJob,
  unFavouriteJob,
};

const mapStateToProps = (state) => ({
  userData: state.user.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Job);
