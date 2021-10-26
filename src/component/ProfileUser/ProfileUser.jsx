import React from "react";
import { login } from "../../redux/user/actions";
import { connect } from "react-redux";
import { Grid, Typography, Avatar, Divider } from "@mui/material";
import Job from "../Job/Job";
import Footer from "../Footer/Footer";

import Navbar from "../Navbar/Navbar";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
export function UserProfile(props) {
  const { userData } = props;

  const renderAppliedJobs = () => {
    if (userData) {
      let jobs = [];
      if (props.jobs.length > 0) {
        userData.appliedId.forEach((id) =>
          jobs.push(props.jobs.find((job) => job.id === id))
        );
        let jobsGrid = [];
        jobs.forEach((job, index) => {
          if (job) {
            jobsGrid.push(
              <Grid item sx={{ mb: 1, ml: 0 }} key={job.id}>
                <Job
                  index={index}
                  id={job.id}
                  title={job.title}
                  poster={job.poster}
                  description={job.description}
                  datePosted={job.datePosted}
                  location={job.location}
                  positionType={job.positionType}
                  applied={true}
                  favorite={true}
                />
              </Grid>
            );
          }
        });
        return jobsGrid;
      }
    }
  };

  const renderFavouriteJobs = () => {
    if (userData) {
      let jobs = [];
      if (props.jobs.length > 0) {
        userData.favoritesId.forEach((id) =>
          jobs.push(props.jobs.find((job) => job.id === id))
        );
        let jobsGrid = [];
        jobs.forEach((job, index) => {
          if (job) {
            jobsGrid.push(
              <Grid item sx={{ mb: 1, ml: 0 }} key={job.id}>
                <Job
                  index={index}
                  id={job.id}
                  title={job.title}
                  poster={job.poster}
                  description={job.description}
                  datePosted={job.datePosted}
                  location={job.location}
                  positionType={job.positionType}
                  favorite={true}
                  applied={false}
                />
              </Grid>
            );
          }
        });
        return jobsGrid;
      }
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <Grid
        container
        sx={{ my: 6, flexDirection: { lg: "row", xs: "column" } }}
      >
        {userData && (
          <Grid
            sx={{
              display: "flex",
              width: { lg: "20%", xs: "100%" },
              height: { lg: "100vh", xs: "200px" },
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: 56, height: 56, mb: 5 }} />
            <Typography sx={{ fontSize: 25 }}>{userData.fullName}</Typography>
            <Typography sx={{ fontSize: 14 }} variant="h6">
              {userData.email}
            </Typography>
          </Grid>
        )}
        <Divider orientation="vertical" flexItem />
        <Grid
          sx={{
            display: "flex",
            width: { lg: "70%", xs: "100%" },
            height: "100vh",
            flexDirection: "column",
            ml: { lg: 2 },
          }}
        >
          <Grid
            sx={{
              border: "2px solid rgba(134,158,164,0.35)",
              borderRadius: "20px",
              mb: 5,
              boxShadow: "1px -1px 6px -1px rgba(0,0,0,0.22)",
            }}
          >
            <Typography
              item
              sx={{
                fontSize: 25,
                ml: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}
              color="text.primary"
              component="h2"
            >
              <DoneAllIcon color="success" />
              Applied
            </Typography>
            {userData && userData.appliedId && renderAppliedJobs()}
          </Grid>

          <Grid
            style={{
              border: "2px solid rgba(134,158,164,0.35)",
              borderRadius: "20px",
              mb: 5,
              boxShadow: "1px -1px 6px -1px rgba(0,0,0,0.22)",
            }}
          >
            <Typography
              item
              sx={{
                fontSize: 25,
                ml: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}
              color="text.primary"
              component="h2"
            >
              <FavoriteBorderIcon style={{ color: "red" }} />
              Favorites
            </Typography>
            {userData && userData.favoritesId && renderFavouriteJobs()}
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </React.Fragment>
  );
}

const mapDispatchToProps = {
  login,
};

const mapStateToProps = (state) => ({
  userData: state.user.data,
  jobs: state.jobs.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
