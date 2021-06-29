import React from "react";
import { Link } from "react-router-dom";
import  "../../../App.css";

export default function Start() {
  return (
    <div className="start">
      <h1>Welcome!</h1>
      <h2>Enter Your Access Code Here:</h2>
      <input class="c-checkbox" type="checkbox" id="checkbox"></input>
      <div class="c-formContainer">
        <form class="c-form" action="">
          <input
            class="c-form__input"
            placeholder="Code"
            type="email"
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
            required
          ></input>
          <label class="c-form__buttonLabel" for="checkbox">
            <Link to="/survey">
              <button class="c-form__button" type="button">
                Enter
              </button>
            </Link>
          </label>
          <label
            class="c-form__toggle"
            for="checkbox"
            data-title="Enter Code"
          ></label>
        </form>
      </div>
    </div>
  );
}
