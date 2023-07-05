import React from "react";
import { Image as NextImg } from "next/image";
export const Image = () => {
  const imgSrc = {
    src: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80",
    width: "500",
    height: "300",
  };

  return <Image {...imgSrc} alt="profile-img" />;
};
