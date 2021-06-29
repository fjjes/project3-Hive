import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  formLabel:{
    color: 'black' 
  }
}));

const Matrix = ({texts, question, questionNumber, columns, space1, space2, space3, space4}) => {
  const classes = useStyles();
  const [values, setValues]=useState(texts)

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
        <p className="question-intro">Q{questionNumber}) {question}</p>
        <Grid
          container
          spacing={space1}
          className={classes.grid}
          // style={{ display: "flex" }}
        >
          <Grid item xs={space2}></Grid>
          <div>
            {columns.map((cl, i) => {
              return (
                <label style={{ marginRight: "2rem", fontSize: "0.65rem" }} key={i}>{cl}</label>
              );
            })}
          </div>
        </Grid>
        {values.map((row, i) => {
          return (
            <Grid key={i} container spacing={space1} className={classes.grid}>
              <Grid item xs={space2}>
                <FormLabel className={classes.formLabel}>{row.text}</FormLabel>
              </Grid>
              <Grid item xs={space3}>
                <RadioGroup
                  row
                  value={row.value}
                  onChange={(e) => handleChange(e, i)}
                >
                {columns.map((col, index) => {
                  return (
                    <Grid key={index} item xs={space4}>
                      <FormControlLabel value={col} control={<Radio color='primary'/>} />
                    </Grid>
                  );
                })}
                </RadioGroup>
              </Grid>
            </Grid>
          );
        })}
      </FormControl>
      <div style={{ textAlign: "left" }}>
        <button onClick={handleSubmit} type="submit">Submit</button>
      </div>
    </div>
  );
};

export default Matrix;
