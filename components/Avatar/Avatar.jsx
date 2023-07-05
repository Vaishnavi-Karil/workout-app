import React from "react";
import { Avatar as AvatarImg } from "@mui/material";
export const Avatar = () => {
  const avatarObject = {
    src: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80",
    alt: "User Avatar",
    sizes: "100px",
  };

  return <AvatarImg {...avatarObject} />;
};
