import "bootstrap/dist/css/bootstrap.min.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom/dist";
import NavbarComponent from "./components/Navbar";
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import Register from "./components/Register";
import Login from "./components/Login";
import ClassDetails from "./components/ClassDetails";
import Footer from "./components/Footer";

const router = createBrowserRouter([
  {
    element: <NavbarComponent />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/class-timetable",
        element: <Calendar />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/class/:id",
        element: <ClassDetails />,
      }
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Footer/>
    </div>
  );
}

export default App;
