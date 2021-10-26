import React from "react";
import Job from "../Job/Job";
import Footer from "../Footer/Footer";
import { connect } from "react-redux";
import { Grid } from "@mui/material";

function JobListings(props) {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        sx={{ overflow: "hidden", my: 6, px: { sm: 0, md: 20 } }}
      >
        <Grid item sm={12} direction="column">
          {(props.jobs || []).map((job, index) => {
            return (
              <Grid item sx={{ mb: 2 }} key={job.id}>
                <Job
                  index={index}
                  id={job.id}
                  title={job.title}
                  poster={job.poster}
                  description={job.description}
                  datePosted={job.datePosted}
                  location={job.location}
                  positionType={job.positionType}
                  favorite={
                    props.userData.favoritesId &&
                    props.userData.favoritesId.find((fav) => fav === job.id)
                  }
                  applied={
                    props.userData.appliedId &&
                    props.userData.appliedId.find((app) => app === job.id)
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Footer />
    </React.Fragment>
  );
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
  jobs: state.jobs.list,
  userData: state.user.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(JobListings);
