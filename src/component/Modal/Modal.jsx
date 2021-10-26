import React, {useState} from "react";
import {connect} from "react-redux"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {applyForJob} from "../../redux/user/actions";

export function Modal(props) {
  const { open, handleClose } = props;
  const [application, setApplication] = useState({
    description: "",
    cv: "",
    applicant: props.userData.fullName,
    jobId: props.jobId,
    email: props.userData.email
  })

  const handleFileChange = (e) => {
    setApplication({
      ...application,
      cv: e.target.files[0].name,
    })
  }

  const handleApplication = () => {
    props.applyForJob(application, props.userData);
    props.handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Say something interesting about yourself!</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            It's best to introduce yourself to leave a good impression for a
            possible interview. Make sure to also upload your CV.
          </DialogContentText>
          <TextField
            autoFocus
            id="outlined-multiline-static"
            label="Description"
            multiline
            value={application.description}
            onChange={(e) => {setApplication({
              ...application,
              description: e.target.value,
            })}}
            rows={4}
            fullWidth
          />
          <div>
            <Button variant="contained" component="label" sx={{ mt: 3 }}>
              Upload CV
              <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e)} hidden />
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApplication} variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = {
  applyForJob,
};

const mapStateToProps = (state) => ({
  userData: state.user.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);