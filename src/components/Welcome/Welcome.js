import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

export const Welcome = () => {
  return (
    <div className="welcome-container">
      <Link to="/login">
        <h1 data-heading="WELCOME">WELCOME</h1>
      </Link>
    </div>
  );
};
