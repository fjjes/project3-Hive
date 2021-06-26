import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

const useStyles2 = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

const useStyles3 = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

const useStyles4 = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

const useStyles5 = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const classes2 = useStyles2();
  const [value2, setValue2] = React.useState(0);
  const classes3 = useStyles3();
  const [value3, setValue3] = React.useState(0);
  const classes4 = useStyles4();
  const [value4, setValue4] = React.useState(0);
  const classes5 = useStyles5();
  const [value5, setValue5] = React.useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setTotalCount(value + value2 + value3 + value4 + value5);
  }, [value, value2, value3, value4, value5]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSliderChange2 = (event, newValue) => {
    setValue2(newValue);
  };

  const handleSliderChange3 = (event, newValue) => {
    setValue3(newValue);
  };

  const handleSliderChange4 = (event, newValue) => {
    setValue4(newValue);
  };

  const handleSliderChange5 = (event, newValue) => {
    setValue5(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleInputChange2 = (event) => {
    setValue2(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleInputChange3 = (event) => {
    setValue3(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleInputChange4 = (event) => {
    setValue4(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleInputChange5 = (event) => {
    setValue5(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  const handleBlur2 = () => {
    if (value2 < 0) {
      setValue2(0);
    } else if (value2 > 100) {
      setValue2(100);
    }
  };

  const handleBlur3 = () => {
    if (value3 < 0) {
      setValue3(0);
    } else if (value3 > 100) {
      setValue3(100);
    }
  };

  const handleBlur4 = () => {
    if (value4 < 0) {
      setValue4(0);
    } else if (value4 > 100) {
      setValue4(100);
    }
  };

  const handleBlur5 = () => {
    if (value5 < 0) {
      setValue5(0);
    } else if (value5 > 100) {
      setValue5(100);
    }
  };

  const handleSubmit = () => {
    setValue(0);
    setValue2(0);
    setValue3(0);
    setValue4(0);
    setValue5(0);
    console.log(value, value2, value3, value4, value5);
  };

  return (
    <div className="question-component">
      <div className={classes.root}>
        {/* <Typography id="input-slider" gutterBottom>
          Normally, during a regular workweek, what percentage of your time do you
          work in the following locations? The total of the answers must equal to
          the sum of 100%
        </Typography> */}
        <p className="question-intro">Normally, during a regular workweek, what percentage of your time do you work in the following locations? The total of the answers must equal to the sum of 100%.</p>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <p>1</p>
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof value === "number" ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
              className={classes.input}
              value={value}
              margin="dense"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 10,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <p>2</p>
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof value2 === "number" ? value2 : 0}
              onChange={handleSliderChange2}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
              className={classes2.input}
              value={value2}
              margin="dense"
              onChange={handleInputChange2}
              onBlur={handleBlur2}
              inputProps={{
                step: 10,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <p>3</p>
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof value3 === "number" ? value3 : 0}
              onChange={handleSliderChange3}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
              className={classes3.input}
              value={value3}
              margin="dense"
              onChange={handleInputChange3}
              onBlur={handleBlur3}
              inputProps={{
                step: 10,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <p>4</p>
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof value4 === "number" ? value4 : 0}
              onChange={handleSliderChange4}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
              className={classes4.input}
              value={value4}
              margin="dense"
              onChange={handleInputChange4}
              onBlur={handleBlur4}
              inputProps={{
                step: 10,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <p>5</p>
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof value5 === "number" ? value5 : 0}
              onChange={handleSliderChange5}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
              className={classes5.input}
              value={value5}
              margin="dense"
              onChange={handleInputChange5}
              onBlur={handleBlur5}
              inputProps={{
                step: 10,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
        <button
          onClick={handleSubmit} //help
          disabled={totalCount === 100 ? false : true}
          type="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

// import React, { useState, useState2 } from "react";
// import Slider from "@material-ui/core/Slider";
// import { makeStyles } from "@material-ui/core/styles";
// import Input from "@material-ui/core/Input";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles({
//   root: {
//     width: 550,
//   },
//   input: {
//     width: 42,
//   },
// });

// export default function InputSlider() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleSliderChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleInputChange = (event) => {
//     setValue(event.target.value === "" ? "" : Number(event.target.value));
//   };

//   const handleBlur = () => {
//     if (value < 0) {
//       setValue(0);
//     } else if (value > 100) {
//       setValue(100);
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <Typography id="input-slider" gutterBottom>
//         Normally, during a regular workweek, what percentage of your time do you
//         work in the following locations? The total of the answers must equal to
//         the sum of 100%
//       </Typography>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item>
//           <p>Home</p>
//         </Grid>
//         <Grid item xs>
//           <Slider
//             value={typeof value === "number" ? value : 0}
//             onChange={handleSliderChange}
//             aria-labelledby="input-slider"
//           />
//         </Grid>
//         <Grid item>
//           <Input
//             className={classes.input}
//             value={value}
//             margin="dense"
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             inputProps={{
//               step: 10,
//               min: 0,
//               max: 100,
//               type: "number",
//               "aria-labelledby": "input-slider",
//             }}
//           />
//         </Grid>
//       </Grid>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item>
//           <p>Work</p>
//         </Grid>
//         <Grid item xs>
//           <Slider
//             value={typeof value === "number" ? value : 0}
//             onChange={handleSliderChange}
//             aria-labelledby="input-slider"
//           />
//         </Grid>
//         <Grid item>
//           <Input
//             className={classes.input}
//             value={value}
//             margin="dense"
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             inputProps={{
//               step: 10,
//               min: 0,
//               max: 100,
//               type: "number",
//               "aria-labelledby": "input-slider",
//             }}
//           />
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
// const PrettoSlider = withStyles({
//   root: {
//     color: "#ff7f50",
//     height: 8,
//   },
//   thumb: {
//     height: 24,
//     width: 24,
//     backgroundColor: "#fff",
//     border: "2px solid currentColor",
//     marginTop: -8,
//     marginLeft: -12,
//     "&:focus, &:hover, &$active": {
//       boxShadow: "inherit",
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: "calc(-50% + 4px)",
//   },
//   track: {
//     height: 8,
//     borderRadius: 4,
//   },
//   rail: {
//     height: 8,
//     borderRadius: 4,
//   },
// })(Slider);

// const marks = [
//   {
//     value: 0,
//     label: "0",
//   },
//   {
//     value: 10,
//     label: "10",
//   },
// ];

// function SliderQuestion() {
//   const [slider, setSlider] = useState();

//   const handleSubmit = () => {
//     console.log("slider", slider);
//     setSlider();
//   };

//   return (
//     <div>
//       <p>Rate your experience from 1-10:</p>
//       <PrettoSlider
//         style={{ width: 500, marginTop: 23 }}
//         valueLabelDisplay="auto"
//         aria-label="pretto slider"
//         defaultValue={0}
//         step={1}
//         marks
//         min={0}
//         max={10}
//         marks={marks}
//         value={slider} //undefined
//         onChange={(e) => setSlider(e.target.value)}
//         // type="reset"
//       />
//       <div>
//         <button onClick={handleSubmit} type="submit">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }
