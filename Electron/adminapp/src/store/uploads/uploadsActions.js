// src/store/uploads/uploadsActions.js

import axios from "axios";
import { uploadsActions } from "./uploadsSlice";
import { toast } from "react-toastify";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getUploads = () => async (dispatch) => {
  dispatch(uploadsActions.fetchRequest());
  try {
    const token = getToken();
    const url = `http://localhost:4000/api/uploads`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(uploadsActions.fetchSuccess(response.data));
    console.log(response);
  } catch (error) {
    console.log("Error fetching uploads:", error);
    if (error.response) {
      dispatch(uploadsActions.fetchFail(error.response.data));
    } else {
      dispatch(uploadsActions.fetchFail("Network error or no response"));
    }
  }
};

export const createUpload = (file, classId) => async (dispatch) => {
  dispatch(uploadsActions.fetchRequest());
  try {
    const token = getToken();
    const url = `http://localhost:4000/api/uploads`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("classId", classId);

    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(uploadsActions.createUploadSuccess(response.data));
    toast.success("File uploaded successfully!");
  } catch (error) {
    console.log("Error uploading file:", error);
    if (error.response) {
      dispatch(uploadsActions.fetchFail(error.response.data));
    } else {
      dispatch(uploadsActions.fetchFail("Network error or no response"));
    }
    toast.error("Failed to upload file.");
  }
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
