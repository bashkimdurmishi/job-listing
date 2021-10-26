import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { filterJobs } from "../../redux/jobs/actions";

export function Searchbar(props) {
  const [filters, setFilters] = useState({ sort: "desc" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    props.filterJobs(filters);
  }, [filters, props]);

  return (
    <React.Fragment>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        minWidth="100%"
        sx={{ my: 3 }}
      >
        <TextField
          label="Search Job..."
          variant="outlined"
          value={search}
          sx={{
            width: "100vh",
            [`& fieldset`]: {
              borderRadius: `20px 0 0 20px`,
            },
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.keyCode == 13) {
              setFilters({
                ...filters,
                title: search,
              });
            }
          }}
        />
        <Button
          variant="outlined"
          sx={{ minHeight: "56px", borderRadius: `0 20px 20px 0` }}
          onClick={() => {
            setFilters({
              ...filters,
              title: search,
            });
          }}
        >
          Search
        </Button>
      </Box>
      {props.userType === "seeker" && (
        <Box
          sx={{
            width: "100%",
            px: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ mr: 2, fontSize: 25 }}>Sort By:</Typography>
          <FormControl sx={{ minWidth: "120px", mr: 3 }}>
            <InputLabel id="demo-simple-select-label">Date</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              defaultValue={"desc"}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  sort: e.target.value,
                });
              }}
            >
              <MenuItem value={"desc"}>Newest First</MenuItem>
              <MenuItem value={"asc"}>Oldest First</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: "120px" }}>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Location"
              defaultValue={""}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  location: e.target.value,
                });
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Draper">Draper</MenuItem>
              <MenuItem value="Beaumont">Beaumont</MenuItem>
              <MenuItem value="Woodbury">Woodbury</MenuItem>
              <MenuItem value="Atlanta">Atlanta</MenuItem>
              <MenuItem value="Ocala">Ocala</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    </React.Fragment>
  );
}

const mapDispatchToProps = {
  filterJobs,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
