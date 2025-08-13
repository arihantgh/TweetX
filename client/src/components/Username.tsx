import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "./ui/label";

function Username() {
  const [username, setUsername] = useState("");

  const handleUsername = (e:any) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="w-4/5 max-w-sm">
          <CardHeader className="justify-center">
            <CardTitle className="text-2xl">username</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUsername}>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Input
                    type="text"
                    placeholder="Choose @username"
                    required
                    value={username.toLowerCase()}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={username.length === 0}
                >
                  Confirm
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Username;
