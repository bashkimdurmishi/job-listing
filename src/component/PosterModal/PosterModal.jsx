import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import {
  TextField,
  List,
  ListItem,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { editJob, createJob } from "../../redux/jobs/actions";

export function PosterModal(props) {
  const { open, handleClose } = props;
  const [post, setPost] = useState({
    title: !props.add ? props.postInfo.title : "",
    description: !props.add ? props.postInfo.description : "",
    requirements: !props.add ? props.postInfo.requirements : [],
    positionType: !props.add ? props.postInfo.positionType : "",
    tags: !props.add ? props.postInfo.tags : [],
    location: !props.add ? props.postInfo.location : "",
  });
  const [requirementText, setRequrementText] = useState("");
  const [tagText, setTagText] = useState("");
  const handleApply = () => {
    if (!validate()) {
      return;
    }

    if (props.add) {
      props.createJob(post, props.userData);
      props.handleClose();
    } else {
      props.editJob(post, props.postInfo.id);
      props.handleClose();
    }
  };

  const validate = () => {
    let isValid = true;
    isValid = Object.value(post).some((value) => {
      if (value === "" || value === []) {
        return false;
      }
    });
    return isValid;
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{props.add ? "Add" : "Edit"} Job Post</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: 1 }}
            autoFocus
            id="outlined-multiline-static"
            label="Title"
            fullWidth
            required
            onChange={(e) =>
              setPost({
                ...post,
                title: e.target.value,
              })
            }
            value={post.title}
          />
          <TextField
            sx={{ mt: 1 }}
            id="outlined-multiline-static"
            label="Description"
            fullWidth
            multiline
            rows={5}
            onChange={(e) =>
              setPost({
                ...post,
                description: e.target.value,
              })
            }
            value={post.description}
          />
          <List>
            <DialogTitle sx={{ my: -2 }}>Requirements</DialogTitle>
            {post.requirements.map((req, index) => {
              return (
                <ListItem key={index} sx={{ mt: -1 }}>
                  <TextField
                    id="outlined-multiline-static"
                    label=""
                    fullWidth
                    onChange={(e) => {
                      let postRequirement = post.requirements;
                      postRequirement[index] = e.target.value;
                      setPost({
                        ...post,
                        requirements: postRequirement,
                      });
                    }}
                    value={req}
                    size="small"
                  />
                  <Button
                    variant="outlined"
                    sx={{ height: "40px", ml: 2, width: "70px" }}
                    onClick={() => {
                      let postReq = post.requirements;
                      postReq.splice(index, 1);
                      setPost({
                        ...post,
                        requirements: postReq,
                      });
                    }}
                  >
                    CLEAR
                  </Button>
                </ListItem>
              );
            })}
            <ListItem sx={{ mt: -1 }}>
              <TextField
                id="outlined-multiline-static"
                label="Add Requirement"
                fullWidth
                onChange={(e) => setRequrementText(e.target.value)}
                value={requirementText}
                size="small"
              />
              <Button
                variant="outlined"
                sx={{ height: "40px", ml: 2, width: "70px" }}
                onClick={() => {
                  let postRequirements = post.requirements;
                  postRequirements.push(requirementText);
                  setPost({
                    ...post,
                    requirements: postRequirements,
                  });
                  setRequrementText("");
                }}
              >
                ADD
              </Button>
            </ListItem>
          </List>
          <List sx={{ display: "flex" }}>
            <DialogTitle sx={{ my: -2 }}>Tags</DialogTitle>
            {post.tags.map((tag, index) => {
              return (
                <ListItem key={index} sx={{ mt: -1 }}>
                  <TextField
                    id="outlined-multiline-static"
                    label=""
                    onChange={(e) => {
                      let postTags = post.tags;
                      postTags[index] = e.target.value;
                      setPost({
                        ...post,
                        tags: postTags,
                      });
                    }}
                    value={tag}
                    size="small"
                  />
                  <Button
                    variant="outlined"
                    sx={{
                      height: "40px",
                      width: "10px",
                      px: 0,
                      minWidth: "40px",
                    }}
                    onClick={() => {
                      let postTag = post.tags;
                      postTag.splice(index, 1);
                      setPost({
                        ...post,
                        tags: postTag,
                      });
                    }}
                  >
                    X
                  </Button>
                </ListItem>
              );
            })}
            <ListItem sx={{ mt: -1 }}>
              <TextField
                id="outlined-multiline-static"
                label="Add Tag"
                onChange={(e) => setTagText(e.target.value)}
                value={tagText}
                size="small"
              />
              <Button
                variant="outlined"
                sx={{ height: "40px", ml: 2, width: "70px" }}
                onClick={() => {
                  let postTags = post.tags;
                  postTags.push(tagText);
                  setPost({
                    ...post,
                    tags: postTags,
                  });
                  setTagText("");
                }}
              >
                ADD
              </Button>
            </ListItem>
          </List>
          <List
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <DialogTitle sx={{ my: -2 }}>Location</DialogTitle>
            <FormControl sx={{ minWidth: "120px" }}>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Location"
                value={post.location}
                onChange={(e) => {
                  setPost({
                    ...post,
                    location: e.target.value,
                  });
                }}
              >
                <MenuItem value="Draper">Draper</MenuItem>
                <MenuItem value="Beaumont">Beaumont</MenuItem>
                <MenuItem value="Woodbury">Woodbury</MenuItem>
                <MenuItem value="Atlanta">Atlanta</MenuItem>
                <MenuItem value="Ocala">Ocala</MenuItem>
              </Select>
            </FormControl>
            <DialogTitle sx={{ my: -2 }}>Job Type</DialogTitle>
            <FormControl sx={{ minWidth: "120px" }}>
              <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Job TYpe"
                value={post.positionType}
                onChange={(e) => {
                  setPost({
                    ...post,
                    positionType: e.target.value,
                  });
                }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Full-Time">Full-Time</MenuItem>
                <MenuItem value="Part-Time">Part-Time</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
              </Select>
            </FormControl>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApply} variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = {
  createJob,
  editJob,
};

const mapStateToProps = (state) => ({
  userData: state.user.data,
  jobs: state.jobs.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(PosterModal);
