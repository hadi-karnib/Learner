import axios from "axios";
import { toast } from "react-toastify";
import { authActions } from "./authSlice";

export const login =
  ({ email, password, navigate }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/admin/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.loginSuccess(response.data));
      toast.success("Login successful", { autoClose: 3000 });
      setTimeout(() => {
        navigate("/adminpanel");
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage, { autoClose: 3000 });
      dispatch(authActions.loginFail(errorMessage));
    }
  };

export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(authActions.logout());
  toast.success("Logout successful", { autoClose: 3000 });
  navigate("/");
};
