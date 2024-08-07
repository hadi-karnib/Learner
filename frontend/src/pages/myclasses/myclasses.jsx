import React, { useEffect, useState } from "react";
import "./myclasses.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getStudentEnrollments } from "../../store/enrollment/enrollmentActions";
import { getUploadsByClass } from "../../store/uploads/uploadsActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Modal from "react-modal";
import { jwtDecode } from "jwt-decode";

const MultiActionAreaCard = ({ title, onCheckFilesClick }) => {
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
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={onCheckFilesClick}>Check Files</Button>
      </CardActions>
    </Card>
  );
};

const Myclasses = () => {
  const dispatch = useDispatch();
  const { enrollment, loading } = useSelector((state) => state.enrollment);
  const { uploads } = useSelector((state) => state.uploads);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; // Ensure this matches the structure of your token
      dispatch(getStudentEnrollments(userId));
      console.log("getting token");
    }
  }, [dispatch]);

  const handleCheckFilesClick = (classId) => {
    setSelectedClassId(classId);
    dispatch(getUploadsByClass(classId));
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedClassId(null);
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return "📁"; // Default icon if fileType is undefined
    if (fileType.startsWith("image/")) return "🖼️";
    if (fileType === "application/pdf") return "📄";
    if (fileType.startsWith("video/")) return "🎥";
    if (fileType.startsWith("audio/")) return "🎵";
    return "📁";
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="home-container">
      <Navbar />
      <div className="wholeContent">
        <Sidebar />
        <div className="classesContent">
          {enrollment && enrollment.length > 0 ? (
            enrollment.map((enrollments) => (
              <MultiActionAreaCard
                key={enrollments.class?._id}
                title={enrollments.class?.title ?? "No title available"}
                onCheckFilesClick={() =>
                  handleCheckFilesClick(enrollments.class?._id)
                }
              />
            ))
          ) : (
            <p>No classes available</p>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Class Files"
        className="Modal__Content"
        overlayClassName="Modal__Overlay"
      >
        <div className="Modal__Header">
          <h2>Class Files</h2>
          <Button onClick={closeModal}>Close</Button>
        </div>
        <div className="uploads-list">
          {uploads && uploads.length > 0 ? (
            uploads.map((upload) => (
              <div key={upload._id} className="upload-item">
                <span>{getFileIcon(upload.mimeType)}</span>
                <a href={`/${upload.path}`} download>
                  {upload.filename}
                </a>
              </div>
            ))
          ) : (
            <p>No files available</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Myclasses;
