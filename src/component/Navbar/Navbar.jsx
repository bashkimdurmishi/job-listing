import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Box,
  AppBar,
  CardMedia,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logo from "../../img/logo.png";
import { logout } from "../../redux/user/actions";
import { useHistory } from "react-router";

export function MenuAppBar(props) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    props.logout(history);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NavLink
            to={`/dashboard`}
            style={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CardMedia
              style={{ height: 50, width: 50 }}
              image={Logo}
              title="lorem ipsum"
            />

            <Typography variant="h4" component="div">
              JobHunter
            </Typography>
          </NavLink>
          <Box style={{ flexGrow: 1 }} />
          {props.userData && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {props.userData.userType === "seeker" && (
                  <MenuItem
                    component={NavLink}
                    to={"/profile"}
                    onClick={handleClose}
                  >
                    Profile
                  </MenuItem>
                )}
                <MenuItem component={NavLink} to={"/"} onClick={handleLogout}>
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const mapDispatchToProps = {
  logout,
};

const mapStateToProps = (state) => ({
  userData: state.user.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuAppBar);
