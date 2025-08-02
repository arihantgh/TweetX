import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

function Username() {
  return (
    <>
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm ">
      <CardHeader>
        <span className="font-medium">Choose Username</span>
      </CardHeader>
      <CardContent>
        <Input placeholder="@username"/>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
    </div>
    </>
  );
}

export default Username;
