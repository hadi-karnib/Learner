// src/store/uploads/uploadsActions.js

import axios from "axios";
import { uploadsActions } from "./uploadsSlice";
import { toast } from "react-toastify";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getUploadsByClass = (classId) => async (dispatch) => {
  dispatch(uploadsActions.fetchRequest());
  try {
    const token = getToken();
    const url = `http://localhost:4000/api/uploads/class/${classId}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(uploadsActions.fetchByClassSuccess(response.data));
    console.log(response);
  } catch (error) {
    console.log("Error fetching uploads by class:", error);
    if (error.response) {
      dispatch(uploadsActions.fetchFail(error.response.data));
    } else {
      dispatch(uploadsActions.fetchFail("Network error or no response"));
    }
  }
};
