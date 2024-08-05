import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import { jwtDecode } from "jwt-decode";
import { getNotInClasses } from "../../store/classes/classesActions";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { createEnroll } from "../../store/enrollment/enrollmentActions";

const Enroll = () => {
  const user = jwtDecode(localStorage.getItem("token"));
  const id = user.id;
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.classes);
  const loading = useSelector((state) => state.classes.loading);
  const error = useSelector((state) => state.classes.error);

  useEffect(() => {
    dispatch(getNotInClasses(id));
  }, [dispatch, id]);

  const handleEnroll = (classId) => {
    dispatch(createEnroll(id, classId));
  };

  const MultiActionAreaCard = ({ classItem }) => {
    return (
      <Card sx={{ maxWidth: 345, maxHeight: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/class-room-background-illustration_274608-455.avif"
            alt="class image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {classItem.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {classItem.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Instructor: {classItem.instructor.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => handleEnroll(classItem._id)}
          >
            Enroll
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="wholeContent">
        <Sidebar />
        <div className="content">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {classes && classes.length > 0 ? (
            classes.map((classItem) => (
              <MultiActionAreaCard key={classItem._id} classItem={classItem} />
            ))
          ) : (
            <p>No classes available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Enroll;
