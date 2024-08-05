import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getWithdrawals } from "../../store/withdrawal/withdrawalActions";
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
// Card Component
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
        <Typography variant="body2" color="text.secondary">
          Status: {withdrawal.status || "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Student Name:{" "}
          {withdrawal.student && withdrawal.student.name
            ? withdrawal.student.name
            : "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Student Email:{" "}
          {withdrawal.student && withdrawal.student.email
            ? withdrawal.student.email
            : "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created At:{" "}
          {withdrawal.createdAt
            ? new Date(withdrawal.createdAt).toLocaleString()
            : "N/A"}
        </Typography>
      </CardContent>
    </CardActionArea>{" "}
    {/* <CardActions>
      <Button
        size="small"
        color="primary"
        onClick={() => console.log("pressed")}
      >
        Enroll
      </Button>
    </CardActions> */}
  </Card>
);

const Withdrawal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const withdrawals = useSelector((state) => state.withdrawal.withdrawal);
  const loading = useSelector((state) => state.withdrawal.loading);
  const error = useSelector((state) => state.withdrawal.error);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    let user;
    try {
      user = jwtDecode(token);
    } catch (error) {
      console.error("Invalid token", error);
      navigate("/login");
      return;
    }

    const id = user.id;
    dispatch(getWithdrawals(id));
  }, [dispatch, navigate, token]);

  return (
    <div>
      <Navbar />
      <div className="wholeContent">
        <Sidebar />
        <div className="content">
          <div className="withdrawals">
            <h2>my withdrawals</h2>
            <div className="withdrawalcards">
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              {withdrawals && withdrawals.length > 0 ? (
                withdrawals.map((withdrawal) => (
                  <WithdrawalCard
                    key={withdrawal._id}
                    withdrawal={withdrawal}
                  />
                ))
              ) : (
                <p>No withdrawals available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
