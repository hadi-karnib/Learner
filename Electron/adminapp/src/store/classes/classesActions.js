import axios from "axios";
import { classesActions } from "./classesSlice";
import { toast } from "react-toastify";
const getToken = () => {
  return localStorage.getItem("token");
};

export const getclasses = () => async (dispatch) => {
  dispatch(classesActions.fetchRequest());
  try {
    const token = getToken();
    const url = `http://localhost:4000/api/classes/`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(classesActions.fetchSuccess(response.data));
    console.log(response);
  } catch (error) {
    console.log("Error fetching classes:", error);
    if (error.response) {
      dispatch(classesActions.fetchFail(error.response.data));
    } else {
      dispatch(classesActions.fetchFail("Network error or no response"));
    }
  }
};

export const getNotInClasses = (userId) => async (dispatch) => {
  dispatch(classesActions.fetchRequest());
  try {
    const token = getToken();
    const url = `http://localhost:4000/api/classes/notIn/${userId}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(classesActions.fetchSuccess(response.data));
    console.log(response);
  } catch (error) {
    console.log("Error fetching classes:", error);
    if (error.response) {
      dispatch(classesActions.fetchFail(error.response.data));
    } else {
      dispatch(classesActions.fetchFail("Network error or no response"));
    }
  }
};
export const createClass = (newClass) => async (dispatch) => {
  dispatch(classesActions.fetchRequest());
  try {
    console.log(newClass);

    const token = getToken();
    const url = `http://localhost:4000/api/classes/`;
    const response = await axios.post(url, newClass, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(classesActions.createclassessuccess(response.data));
    console.log(response);
    toast.success("class created successfully");
  } catch (error) {
    console.log("Error creating class:", error);
    if (error.response) {
      dispatch(classesActions.fetchFail(error.response.data));
    } else {
      dispatch(classesActions.fetchFail("Network error or no response"));
    }
  }
};
