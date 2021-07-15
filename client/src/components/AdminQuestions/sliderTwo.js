import Slider from "../questiontypes/Slider";

const sliderTwo = () => {
  return (
    <div className="question-component admin-question-component">
      <Slider
        question={
          "Normally, during a regular workweek, what percentage of your time do you work in the following locations? The total of the answers must equal to the sum of 100%."
        }
      />
    </div>
  );
};

export default sliderTwo;
