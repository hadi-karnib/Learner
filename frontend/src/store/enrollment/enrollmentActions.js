import axios from "axios";
import { enrollmentActions } from "./enrollmentSlice";
import { toast } from "react-toastify";
import { getNotInClasses } from "../classes/classesActions";

const getToken = () => {
  return localStorage.getItem("token");
};

export const createEnroll = (studentId, classId) => async (dispatch) => {
  dispatch(enrollmentActions.fetchRequest());
  try {
    const token = getToken();
    const url = `http://localhost:4000/api/enrollment`;
    const response = await axios.post(
      url,
      { student: studentId, class: classId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(enrollmentActions.createEnrollmentSuccess(response.data));
    dispatch(getNotInClasses(studentId));
    toast.success("Enrollment created successfully");
  } catch (error) {
    console.log("Error creating enrollment:", error);
    if (error.response) {
      dispatch(enrollmentActions.fetchFail(error.response.data));
    } else {
      dispatch(enrollmentActions.fetchFail("Network error or no response"));
    }
    toast.error("Error creating enrollment");
  }
};
