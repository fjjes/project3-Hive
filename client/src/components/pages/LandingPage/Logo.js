import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import "../../../App.css";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="logo-page">
      <Player
        autoplay
        src="https://assets7.lottiefiles.com/packages/lf20_uzb1p5nd.json"
        className="logo"
      ></Player>
      <Link to="/start">
        <button className="logo-button" type="button">
          Enter
        </button>
      </Link>
    </div>
  );
}
