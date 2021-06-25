import React from "react";
import { Link } from "react-router-dom";

export default function Start() {
  return (
    <div>
      <h1>Welcome!</h1>
      <h2>Enter Your Access Code Here:</h2>
      <input type="text" max="3"></input>
      <Link to="/Form">
        <button>Start</button>
      </Link>
    </div>
  );
}
