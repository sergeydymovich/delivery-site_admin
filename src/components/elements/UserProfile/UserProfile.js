import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";
import { logout } from "reducers/authSlice";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";

function UserProfile() {
  const role = useSelector((state) => state.auth.user.role);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoggedOut = () => {
    dispatch(logout());
  };

  return (
    <Box>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Typography variant="subtitle1" component="p">
          {role}
        </Typography>
        {role === "ADMIN" && (
          <Avatar>
            <PersonIcon />
          </Avatar>
        )}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLoggedOut}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default UserProfile;
