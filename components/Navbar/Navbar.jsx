import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Avatar } from "../Avatar/Avatar";

export const Navbar = () => {
  return (
    <AppBar position="fixed" color="primary">
      <Box>
        <Toolbar>
          <Avatar />
          <Typography variant="h6">John Doe</Typography>
          <Button variant="contained" color="primary">
            Logout
          </Button>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
