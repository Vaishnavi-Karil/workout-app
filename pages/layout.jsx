import React from "react";
import { Navbar } from "../components";

export default function Layout({ children }) {
  return (
    <div style={{ margin: "0 2vw" }}>
      {/* <Navbar /> */}
      {children}
    </div>
  );
}
