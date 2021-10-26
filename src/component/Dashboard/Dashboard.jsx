import React from "react";
import Navbar from "../Navbar/Navbar";
import Searchbar from "../Searchbar/Searchbar";
import JobListings from "../JobListings/JobListings";
import { Box } from "@mui/material";
import { login } from "../../redux/user/actions";
import { connect } from "react-redux";
import ProfilePoster from "../ProfilePoster/ProfilePoster";

function Dashboard(props) {
  const { userData } = props;
  if (userData) {
    return (
      <Box>
        <Navbar userType={userData.userType} />
        <Searchbar userType={userData.userType} />
        {userData.userType == "seeker" ? <JobListings /> : <ProfilePoster />}
      </Box>
    );
  }
  return null;
}

const mapDispatchToProps = {
  login,
};

const mapStateToProps = (state) => ({
  userData: state.user.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
