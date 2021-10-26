import React from "react";
import { connect } from "react-redux";
import { Button, Box, Card, CardContent, Typography } from "@mui/material";
import { favourtiteJob, unFavouriteJob } from "../../redux/user/actions";
import { removeJob } from "../../redux/jobs/actions";
import { loadJobApplicants } from "../../redux/applicants/actions";
import PosterModal from "../PosterModal/PosterModal";
import { NavLink } from "react-router-dom";
export function JobPosts(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const bgColor = props.index % 2 === 0 ? "white" : "#ebf2fc";

  const card = (
    <Card
      className="job-container"
      sx={{
        display: "flex",
        py: { xs: 1, lg: 0 },
        flexDirection: { lg: "row", xs: "column", backgroundColor: bgColor },
      }}
    >
      <Box
        className="job-primary-details"
        sx={{
          minWidth: { lg: "70%", xs: "100%" },
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
        className="apply-details-favorite"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: { xs: "space-around" },
          alignItems: "center",
          width: { lg: "30%", xs: "100%" },
          mt: 1,
          height: "40px",
        }}
      >
        <Box
          classname="favorite-icon"
          sx={{
            display: "flex",
            mr: 1,
            width: "100%",
            justifyContent: "center",
          }}
          onClick={(e) => {
            e.preventDefault();
            handleClickOpen();
          }}
        >
          <Button variant="outlined">Edit</Button>
        </Box>

        <Box
          classname="favorite-icon"
          sx={{
            display: "flex",
            mr: 1,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            component={NavLink}
            to={`/jobPosts/${props.id}`}
            onClick={() => {
              props.loadJobApplicants(props.id);
            }}
          >
            Appliers
          </Button>
        </Box>
        <Box
          classname="favorite-icon"
          sx={{
            display: "flex",
            mr: 1,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => props.removeJob(props.id, props.userData)}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Card>
  );

  return (
    <Box sx={{ minWidth: 275, mb: 2, mx: 3 }}>
      {open && (
        <PosterModal postInfo={props} open={open} handleClose={handleClose} />
      )}
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

const mapDispatchToProps = {
  favourtiteJob,
  unFavouriteJob,
  removeJob,
  loadJobApplicants,
};

const mapStateToProps = (state) => ({
  userData: state.user.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(JobPosts);
