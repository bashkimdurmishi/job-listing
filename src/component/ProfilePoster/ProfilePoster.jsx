import React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/user/actions";
import JobPosts from "../JobPosts/JobPosts";
import { Button, Box } from "@mui/material";
import PosterModal from "../PosterModal/PosterModal";
function ProfilePoster(props) {
  const { userData } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderPosts = () => {
    if (userData) {
      let posts = [];
      if (props.jobs.length > 0) {
        userData.postsId.forEach((id) =>
          posts.push(props.jobs.find((job) => job.id === id))
        );
        let postsGrid = [];
        posts.forEach((post, index) => {
          if (post) {
            postsGrid.push(
              <JobPosts
                title={post.title}
                index={index}
                id={post.id}
                key={post.id}
                description={post.description}
                location={post.location}
                requirements={post.requirements}
                tags={post.tags}
                positionType={post.positionType}
              />
            );
          }
        });
        return postsGrid;
      }
    }
  };

  return (
    <React.Fragment>
      {open && (
        <PosterModal
          postInfo={props}
          open={open}
          handleClose={handleClose}
          add
        />
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
        }}
      >
        <Button
          variant="contained"
          color="success"
          sx={{ alignSelf: "center", py: 2, my: 1 }}
          onClick={(e) => {
            e.preventDefault();
            handleClickOpen();
          }}
        >
          Add Job Post
        </Button>
      </Box>
      <Box>{userData && renderPosts()}</Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePoster);
