import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e:any) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, {
      email: email,
      password: password
    });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="w-4/5 max-w-sm">
          <CardHeader className="justify-center">
            <CardTitle className="text-2xl border-b-2 pb-2 border-blue-500">
              Signup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup}>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error ? <p className="text-sm text-red-500">{error}</p> : ""}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!(email.length > 0 && password.length > 0)}
                >
                  Signup
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Signup;
