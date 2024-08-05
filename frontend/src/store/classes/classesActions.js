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

// export const submitCreditCardDetails =
//   (details, userId) => async (dispatch) => {
//     dispatch(classesActions.fetchRequest());
//     try {
//       const response = await axios.post(
//         `${API_URL}/api/classes/credit-card/${userId}`,
//         {
//           details,
//         }
//       );
//       dispatch(classesActions.createclassesuccess(response.data));
//     } catch (error) {
//       console.log(error);
//       dispatch(
//         classesActions.fetchFail(
//           error.response ? error.response.data : "Network error or no response"
//         )
//       );
//       toast.error(error.response.data.message, {
//         autoClose: 1000,
//         theme: "colored",
//       });
//     }
//   };
