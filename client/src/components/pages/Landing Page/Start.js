import React from "react";
import { Link } from "react-router-dom";
import  "../../../App.css";

export default function Start() {
  return (
    <div className="start">
      <h1>Welcome!</h1>
      <h2>Enter Your Access Code Here:</h2>
      <input className="c-checkbox" type="checkbox" id="checkbox"></input>
      <div className="c-formContainer">
        <form className="c-form" action="">
          <input
            className="c-form__input"
            placeholder="Code"
            type="email"
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
            required
          ></input>
          <label className="c-form__buttonLabel" htmlFor="checkbox">
            <Link to="/survey">
              <button className="c-form__button" type="button">
                Enter
              </button>
            </Link>
          </label>
          <label
            className="c-form__toggle"
            htmlFor="checkbox"
            data-title="Enter Code"
          ></label>
        </form>
      </div>
    </div>
  );
}
