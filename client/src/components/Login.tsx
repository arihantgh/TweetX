import { Button } from "./ui/button";
import { Link } from "react-router";

function Login() {
  return (
    <>
      <div className="flex justify-center items-center h-screen gap-2">
        <Button>
          <Link to="/home">Home</Link>
        </Button>
      </div>
    </>
  );
}

export default Login;
