import React from "react";
import "./Layout.css";
import AddOpening from "./AddOpening";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";

const Layout = () => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate("/view");
  };

  return (
    <div className="main-container">
      <AddOpening />
      <div className="viewBtn">
        <Button
          type="submit"
          size="small"
          variant="outlined"
          onClick={handleView}
        >
          View Openings
        </Button>
      </div>
    </div>
  );
};

export default Layout;
