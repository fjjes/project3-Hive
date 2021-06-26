import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import styles from "../../App.css";
import { display } from "@material-ui/system";

// material-ui grid is 12 col width!!
const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
}));

const Matrix = () => {
  const classes = useStyles();
  const [values, setValues] = useState([
    { text: "Ability to concentrate", value: "" },
    { text: "Ability to conduct telephone conversations", value: "" },
    {
      text: "Ability to find a meeting room within a reasonable timeframe",
      value: "",
    },
    {
      text: "Ability to access collaborative spaces for informal exchanges with my colleagues",
      value: "",
    },
    { text: "Ability to conduct confidential conversations", value: "" },
    {
      text: "Quality of IT and telephone tools (excluding workstations) made available (connection tools and screens in meeting rooms, etc.)",
      value: "",
    },
    { text: "Ability to work in the office with remote contacts", value: "" },
    {
      text: "Ability to easily switch between face-to-face work and work at home",
      value: "",
    },
    {
      text: "Quality of the environment near my workplace (neighborhood, shops, services, restaurants, etc.)",
      value: "",
    },
  ]);

  let question =
    "Please indicate for each of the factors below their importance to you in the performance of your work, then your level of satisfaction with these factors in your current work environment:";

  let columns = [
    "Very Satisfied",
    "Satisfied",
    "Neither satisfied nor dissatisfied",
    "Dissatisfied",
    "Very dissatisfied",
  ];

  const handleChange = (e, i) => {
    let newValues = [...values];
    newValues[i].value = e.target.value;
    setValues(newValues);
  };

  const handleSubmit = () => {
    console.log(values);
  };

  return (
    <div className="matrix question-component">
      <FormControl component="fieldset">
        <p className="question-intro">{question}</p>
        <Grid
          container
          spacing={2}
          className={classes.grid}
          // style={{ display: "flex" }}
        >
          <Grid item xs={3}></Grid>
          <div>
            {columns.map((cl, i) => {
              return (
                <label style={{ marginRight: "2rem" }} key={i}>
                  {cl}
                </label>
              );
            })}
          </div>
        </Grid>
        {values.map((row, i) => {
          return (
            <Grid key={i} container spacing={2} className={classes.grid}>
              <Grid item xs={3}>
                <FormLabel>{row.text}</FormLabel>
              </Grid>
              <Grid item xs={9}>
                <RadioGroup
                  row
                  value={row.value}
                  onChange={(e) => handleChange(e, i)}
                >
                  {columns.map((col, index) => {
                    return (
                      <Grid key={index} item xs={2}>
                        <FormControlLabel value={col} control={<Radio />} />
                      </Grid>
                    );
                    // return(
                    // <div key={index}>
                    // {i===0 ?
                    //     <Grid item xs={3}><FormControlLabel value={col} control={<Radio/>} label={col} labelPlacement="top"/></Grid>
                    // :
                    //     <Grid item xs={3}><FormControlLabel value={col} control={<Radio/>}/></Grid>

                    // }
                    // </div>)
                  })}
                </RadioGroup>
              </Grid>
            </Grid>
          );
        })}
      </FormControl>
      <div style={{ textAlign: "left" }}>
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Matrix;
