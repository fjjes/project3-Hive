import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SliderTwo = () => {
  let questionNumber= 3
  let question="Normally, during a regular workweek, what percentage of your time do you work in the following locations? The total of the answers must equal to the sum of 100%."
  let texts=[
    "Home",
    "Traveling",
    "At the office",
    "In the client's office",
    "Elsewhere"
  ]

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 100,
      label: "100",
    },
  ];

  return (
    <div className="question-component admin-question-component">
      <p className="question-intro">Q{questionNumber}.</p>
        <span><p className="question-intro">{question}</p></span>
        {texts.map((row, index)=>{
          return(
            <div className="slider">
              <p>{row}</p>
              <Slider
                //value={typeof getValue === "number" ? getValue : 0}
                ariaLabelledbyForHandle="input-slider"
                marks={marks}
                step={5}
                marks
                min={0}
                max={100}
              />
              <input
                className="input"
                type="number"
                // className={classes.input}
                //value={getValue}
                //onBlur={handleBlur}
                step={5}
                min={0}
                max={100}
                aria-labelledby="input-slider"
              />
            </div>
          )
        })}
    </div>
  );
};

export default SliderTwo;





