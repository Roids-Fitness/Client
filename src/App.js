import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom/dist";
import NavbarComponent from "./components/Navbar";
import Home from "./pages/Home";
import ClassTimetable from "./pages/ClassTimetable";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ClassDetails from "./pages/ClassDetails";
import Footer from "./components/Footer";

/**
 * @description Create a router for the application
 */
const router = createBrowserRouter([
  {
    element: <NavbarComponent />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/class",
        element: <ClassTimetable />,
      },
      {
        path: "/user/register",
        element: <Register />,
      },
      {
        path: "/user/login",
        element: <Login />,
      },
      {
        path: "/class/:id",
        element: <ClassDetails />,
      }
    ],
  },
]);

/** 
 * @description Render the application
 */
function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Footer/>
    </div>
  );
}

export default App;
