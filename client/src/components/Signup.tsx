import { Button } from "./ui/button"
import { Link } from "react-router"
function Signup() {
  return (
    <>
    <div className="flex justify-center items-center h-screen gap-2">
        <Button>
          <Link to="/username">Choose Username</Link>
        </Button>
      </div>
    </>
  )
}

export default Signup