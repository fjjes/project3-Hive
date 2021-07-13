import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import "../../../App.css";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="card">
      <div className="flip-card">
        <div class="thefront">
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_186dxgq7.json"
            className="logo"
          ></Player>
          <button>Click to Flip</button>
        </div>
        <div className="theback">
          <p>hello</p>
          <Link to="/survey">
            <button className="logo-button" type="button">
              ENTER
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
