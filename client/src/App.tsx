import { createBrowserRouter, RouterProvider } from "react-router";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Home from "./components/Home";
import Username from "./components/Username";
import Signup from "./components/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/home",
      element: <Home/>
    },
    {
      path: "/username",
      element: <Username/>
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
