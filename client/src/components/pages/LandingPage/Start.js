import React from "react";
import { Link } from "react-router-dom";
import "../../../App.css";

export default function Start() {
  return (
    <div className="start">
      <h1>Welcome!</h1>
      <Link to="/survey">
        <button className="start-button" type="button">
          Enter
        </button>
        {/* <a href="#">Enter</a> */}
      </Link>
      <Link to="/admin">
        <button className="admin-portal-button">Admin Portal</button>
      </Link>
    </div>
  );
}
