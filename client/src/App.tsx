import { createBrowserRouter, RouterProvider } from "react-router";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Home from "./components/Home";

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
      path: "/home",
      element: <Home/>
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
