// src/store/withdrawals/withdrawalsActions.js

import axios from "axios";
import { withdrawalActions } from "./withdrawalsSlice";
import { toast } from "react-toastify";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getWithdrawals = () => async (dispatch) => {
  dispatch(withdrawalActions.fetchRequest());
  try {
    const token = getToken();
    const url = `http://localhost:4000/api/withdrawal/`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(withdrawalActions.fetchSuccess(response.data));
    console.log(response);
  } catch (error) {
    console.log("Error fetching withdrawals:", error);
    if (error.response) {
      dispatch(withdrawalActions.fetchFail(error.response.data));
    } else {
      dispatch(withdrawalActions.fetchFail("Network error or no response"));
    }
  }
};
export const updateWithdrawalStatus =
  (withdrawalId, status) => async (dispatch) => {
    dispatch(withdrawalActions.fetchRequest());
    try {
      const token = getToken();
      const url = `http://localhost:4000/api/withdrawal/${withdrawalId}`;
      const response = await axios.patch(
        url,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(withdrawalActions.updateWithdrawalStatusSuccess(response.data));
      dispatch(getWithdrawals());
      toast.success("Withdrawal status updated successfully!");
    } catch (error) {
      console.log("Error updating withdrawal status:", error);
      if (error.response) {
        dispatch(withdrawalActions.fetchFail(error.response.data));
      } else {
        dispatch(withdrawalActions.fetchFail("Network error or no response"));
      }
      toast.error("Failed to update withdrawal status.");
    }
  };
