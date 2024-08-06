// src/pages/Withdrawals/Withdrawals.js

import React, { useEffect, useState } from "react";
import Navbar from "../../components/components/navbar/navbar";
import Sidebar from "../../components/components/sidebar/sidebar";
import { getWithdrawals } from "../../store/withdrawals/withdrawalsActions";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./withdrawals.css";
import StatusUpdateModal from "./StatusUpdateModal";
const Withdrawals = () => {
  const dispatch = useDispatch();
  const { withdrawal, loading, error } = useSelector(
    (state) => state.withdrawal
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWithdrawalId, setSelectedWithdrawalId] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    dispatch(getWithdrawals());
  }, [dispatch]);

  const handleActionClick = (withdrawalId, status) => {
    setSelectedWithdrawalId(withdrawalId);
    setCurrentStatus(status);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedWithdrawalId(null);
    setCurrentStatus("");
  };

  const WithdrawalCard = ({
    studentName,
    className,
    reason,
    status,
    onActionClick,
  }) => {
    return (
      <Card sx={{ maxWidth: 400, maxHeight: 350, marginBottom: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/class-room-background-illustration_274608-455.avif"
            alt="withdrawal image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {className}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {reason}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Student: {studentName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {status}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={onActionClick}>
            Action
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <div className="home-container">
      {console.log(withdrawal)}
      <Navbar />
      <div className="wholeContent">
        <Sidebar />
        <div className="content">
          <h2>Withdrawals</h2>

          <div className="innercontent">
            {loading && <p>Loading...</p>}
            {withdrawal && withdrawal.length > 0 ? (
              withdrawal.map((withdrawal) => (
                <WithdrawalCard
                  key={withdrawal._id}
                  studentName={
                    withdrawal.student ? withdrawal.student.name : "Unknown"
                  }
                  className={
                    withdrawal.class ? withdrawal.class.title : "Unknown"
                  }
                  reason={withdrawal.reason}
                  status={withdrawal.status}
                  onActionClick={() =>
                    handleActionClick(withdrawal._id, withdrawal.status)
                  }
                />
              ))
            ) : (
              <p>No withdrawals available</p>
            )}
          </div>
        </div>
      </div>
      <StatusUpdateModal
        open={modalOpen}
        onClose={handleCloseModal}
        withdrawalId={selectedWithdrawalId}
        currentStatus={currentStatus}
      />
    </div>
  );
};

export default Withdrawals;
