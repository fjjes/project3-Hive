import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export default function Start() {
  const [narrative, setNarrative] = useState("");
  const [company, setCompany] = useState("");
  const useStyles = makeStyles("");
  const classes = useStyles();

  useEffect(() => {
    const getSurveyQuestions = async () => {
      let response = await fetch("/api/survey"); //should be get by id
      let data = await response.json();
      console.log("retrieved data:", data);
      console.log("narrative:", data[0].narrative);
      setNarrative(data[0].narrative);
      setCompany(data[0].company);
    };
    getSurveyQuestions();
  }, []);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Hive"
          height="140"
          img="../src/components/images/hiveicon.png"
          title="Hive"
        />
        <CardContent>
          <Typography gutterBottom variant="h2" component="h2">
            Hello {company} Team!
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {narrative}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Link to="/survey">
        <button className="start-button" type="button">
          Start
        </button>
      </Link>
      <Link to="/admin">
        <button className="admin-portal-button">Admin Portal</button>
      </Link>
      {/* </div> */}
    </Card>
  );
}
