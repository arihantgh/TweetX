import { useEffect } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    const temp: any = localStorage.getItem("dark");
    const mode = JSON.parse(temp);
    if (mode === null) {
      document.getElementById("html")?.classList.add("dark");
    } else {
      if (mode === true) {
        document.getElementById("html")?.classList.add("dark");
      } else {
        document.getElementById("html")?.classList.remove("dark");
      }
    }
  }, []);

  return (
    <>
      <div className="flex flex-row gap-10 font-medium justify-center items-center h-screen">
        <div>
          <p className="text-4xl">TweetX</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={()=>navigate("/signup")}>Signup</Button>
          <Button onClick={()=>navigate("/login")}>Login</Button>
        </div>
      </div>
    </>
  );
}

export default Landing;
