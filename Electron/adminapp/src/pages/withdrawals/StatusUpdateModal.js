import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getWithdrawals } from "../../store/withdrawals/withdrawalsActions";
import { updateWithdrawalStatus } from "../../store/withdrawals/withdrawalsActions";

const StatusUpdateModal = ({ open, onClose, withdrawalId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    dispatch(updateWithdrawalStatus(withdrawalId, status));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Update Withdrawal Status
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            onChange={handleStatusChange}
            label="Status"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleUpdateStatus}
        >
          Update Status
        </Button>
      </Box>
    </Modal>
  );
};

export default StatusUpdateModal;
