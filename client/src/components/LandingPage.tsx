import { Button } from "./ui/button"
import { Link } from "react-router"
function LandingPage() {
  return (
    <>
        <div className="flex justify-center items-center h-screen gap-2">
            <Button>
                <Link to='/signup'>Signup</Link>
            </Button>
            <Button>
                <Link to='/login'>Login</Link>
            </Button>
        </div>
    </>
  )
}

export default LandingPage