import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getStudentEnrollments } from "../../store/enrollment/enrollmentActions";
import {
  createWithdrawal,
  getWithdrawals,
} from "../../store/withdrawal/withdrawalActions";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./withdrawals.css";

// Helper function to handle withdrawal

// Withdrawal Card Component
const WithdrawalCard = ({ withdrawal }) => (
  <Card sx={{ maxWidth: 345, maxHeight: 300 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image="/class-room-background-illustration_274608-455.avif"
        alt="class image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Class Title:{" "}
          {withdrawal.class && withdrawal.class.title
            ? withdrawal.class.title
            : "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reason: {withdrawal.reason || "N/A"}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

const EnrollmentCard = ({ enrollment, studentId, onUnenroll }) => (
  <Card sx={{ maxWidth: 345, maxHeight: 300 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image="/class-room-background-illustration_274608-455.avif"
        alt="class image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Class Title:{" "}
          {enrollment.class && enrollment.class.title
            ? enrollment.class.title
            : "N/A"}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button
        size="small"
        color="primary"
        onClick={() => {
          console.log(enrollment.class._id);

          onUnenroll(enrollment.class._id, studentId);
        }}
      >
        Unenroll
      </Button>
    </CardActions>
  </Card>
);

const Withdrawal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState("");
  const withdrawals = useSelector((state) => state.withdrawal.withdrawal);
  const enrollments = useSelector((state) => state.enrollment.enrollment);
  const loading = useSelector(
    (state) => state.withdrawal.loading || state.enrollment.loading
  );
  const error = useSelector(
    (state) => state.withdrawal.error || state.enrollment.error
  );

  const handleUnenroll = (classId, studentId) => {
    dispatch(createWithdrawal(classId, studentId));
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      dispatch(getWithdrawals(decoded.id));
      dispatch(getStudentEnrollments(decoded.id));
    } catch (error) {
      console.error("Invalid token", error);
      navigate("/");
    }
  }, [dispatch, navigate, token]);

  return (
    <div className="mainwithdrawal">
      <Navbar />
      <div className="wholeContent">
        <Sidebar />
        <div className="content">
          <h2>My Withdrawals</h2>
          <div className="withdrawalcards">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {withdrawals && withdrawals.length > 0 ? (
              withdrawals.map((withdrawal) => (
                <WithdrawalCard key={withdrawal._id} withdrawal={withdrawal} />
              ))
            ) : (
              <p>No withdrawals available</p>
            )}
          </div>
          <div className="enrollments">
            <h2>My Enrollments</h2>

            <div className="withdrawalcards">
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              {enrollments && enrollments.length > 0 ? (
                enrollments.map((enrollment) => (
                  <EnrollmentCard
                    key={enrollment._id}
                    enrollment={enrollment}
                    studentId={userId}
                    onUnenroll={handleUnenroll}
                  />
                ))
              ) : (
                <p>No enrollments available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
