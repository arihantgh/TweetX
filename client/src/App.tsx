import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import Username from "./components/Username";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "/home",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/username",
      element: <Username />
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
