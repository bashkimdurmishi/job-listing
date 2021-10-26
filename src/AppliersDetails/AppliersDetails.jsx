import { Typography, Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { loadJobApplicants } from "../../redux/applicants/actions";
import JobDetails from "../JobDetails/JobDetails";
import Navbar from "../Navbar/Navbar";
import ApplierItem from "./ApplierItem";
function AppliersDetails(props) {
  const { jobId } = useParams();

  useEffect(() => {
    if (props.jobs) {
      props.loadJobApplicants(parseInt(jobId));
    }
  }, [jobId]);

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: { lg: "row", md: "row", xs: "column" },
          alignItems: "flex-start",
          justifyContent: { xs: "center" },
        }}
      >
        <JobDetails noApply noNavBar />
        <Box
          sx={{
            width: { lg: "40%", md: "60%", xs: "100%" },
            border: {
              lg: "1px solid black",
              md: "1px solid black",
              xs: "none",
            },
            display: "flex",
            flexDirection: "column",
            margin: { lg: "10px", md: "10px", xs: "10px 0" },
            padding: { lg: "3px", md: "3px", xs: "3px 0" },
          }}
        >
          <Typography
            sx={{
              fontSize: 25,
              alignSelf: "center",
              width: "100%",
              textAlign: "center",
              fontWeight: "bold",
              border: "1px solid black",
            }}
            color="text.primary"
            component="h1"
            gutterBottom
          >
            Appliers
          </Typography>
          {props.applicants &&
            props.applicants.map((app) => {
              return <ApplierItem key={app.id} product={app} />;
            })}
        </Box>
      </Box>
    </div>
  );
}
const mapDispatchToProps = {
  loadJobApplicants,
};

const mapStateToProps = (state) => ({
  userData: state.user.data,
  jobs: state.jobs.list,
  applicants: state.applicants.list.applications,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppliersDetails);
