import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login";
import AdminPanel from "./pages/adminPanel/adminPanel";
import AddClass from "./pages/addClass/addClass";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/addclass" element={<AddClass />} />
      </>
    )
  );

  return (
    <div className="App">
      <ToastContainer position="top-right"></ToastContainer>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
