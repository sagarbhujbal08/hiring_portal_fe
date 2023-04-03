import React from "react";
import "./Layout.css";
import AddOpening from "./AddOpening";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

const Layout = () => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate("/view");
  };

  return (
    <div className="layout">
      <Box>
        <Card variant="outlined" className="cardContant">
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
        </Card>
      </Box>
    </div>
  );
};

export default Layout;
