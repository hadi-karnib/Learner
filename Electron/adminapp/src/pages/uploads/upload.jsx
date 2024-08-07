import React, { useEffect, useState } from "react";
import "./upload.css";
import Navbar from "../../components/components/navbar/navbar";
import Sidebar from "../../components/components/sidebar/sidebar";
import { toast, ToastContainer } from "react-toastify";
import {
  getUploadsByClass,
  createUpload,
} from "../../store/uploads/uploadsActions";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Modal from "react-modal";

const MultiActionAreaCard = ({
  title,
  description,
  instructorName,
  onUploadClick,
}) => {
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
      <CardActions>
        <Button onClick={onUploadClick}>upload material</Button>
      </CardActions>
    </Card>
  );
};

const Upload = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.classes);
  const uploads = useSelector((state) => state.uploads.uploads);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [file, setFile] = useState(null);

  const handleUploadClick = (classId) => {
    setSelectedClass(classId);
    dispatch(getUploadsByClass(classId));
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedClass(null);
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file && selectedClass) {
      dispatch(createUpload(file, selectedClass));
      setFile(null);
    }
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return "📁"; // Default icon if fileType is undefined
    if (fileType.startsWith("image/")) return "🖼️";
    if (fileType === "application/pdf") return "📄";
    if (fileType.startsWith("video/")) return "🎥";
    if (fileType.startsWith("audio/")) return "🎵";
    return "📁";
  };

  return (
    <div className="home-container">
      <ToastContainer />
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
                onUploadClick={() => handleUploadClick(classItem._id)}
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
        contentLabel="Uploaded Files"
        className="Modal__Content"
        overlayClassName="Modal__Overlay"
      >
        <h2>Uploaded Files</h2>
        <Button onClick={closeModal}>Close</Button>
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
        <input type="file" onChange={handleFileChange} />
        <Button onClick={handleFileUpload} disabled={!file}>
          Upload File
        </Button>
      </Modal>
    </div>
  );
};

export default Upload;
