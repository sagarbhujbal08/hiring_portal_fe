import * as React from "react";
import { useNavigate } from "react-router";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };
  return (
    <header className="headerContent">
      <div className="d-flex">
        <img
          className="justify-content-center logoImg"
          onClick={goToHome}
          src="./logo-new.svg"
        />
      </div>
      <div className="text-center hiring-text">
        <b>
          We Are
          <span className="hiring"> Hiring</span>
          <p>
            Multiple Positions For
            <span className="hiring"> Pune </span>
            Location
          </p>
        </b>
      </div>
    </header>
  );
};

export default Header;
