import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import "./home.css";
import Sidebar from "../../components/sidebar/sidebar";
import { getclasses } from "../../store/classes/classesActions";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.classes);

  useEffect(() => {
    dispatch(getclasses());
  }, [dispatch]);

  const MultiActionAreaCard = ({ title, description, instructorName }) => {
    return (
      <Card sx={{ maxWidth: 400, maxHeight: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/class-room-background-illustration_274608-455.avif"
            alt="class image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Instructor: {instructorName}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions></CardActions>
      </Card>
    );
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="wholeContent">
        <Sidebar />
        <div className="content">
          {classes && classes.length > 0 ? (
            classes.map((classItem) => (
              <MultiActionAreaCard
                key={classItem._id}
                title={classItem.title}
                description={classItem.description}
                instructorName={classItem.instructor.name}
              />
            ))
          ) : (
            <p>No classes available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
